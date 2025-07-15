"use client";
import React, { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { Skeleton } from "@/components/skeleton";

interface BlogDisplayProps {
  blog: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    contentType?: string;
    createdAt: string;
    updatedAt: string;
    author?: {
      name: string;
      avatar?: string;
    };
    category: string;
    tags: string[];
    authorEmail?: string;
  };
}

const BlogDisplay = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogDisplayProps["blog"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/view-more/${id}`);
      setBlog(response.data.idea);
    } catch (err) {
      setError("Failed to load blog post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const processHtmlContent = (html: string) => {
    if (!html) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add("my-4", "rounded-lg", "shadow-md", "mx-auto", "transition-transform", "hover:scale-105");
      img.setAttribute("loading", "lazy");
      if (!img.alt) {
        img.alt = "Blog content image";
      }
    });

    const iframes = doc.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute("src") || "";
      if (src.startsWith("https://www.youtube.com/embed/")) {
        const wrapper = doc.createElement("div");
        wrapper.classList.add("relative", "w-full", "h-0", "pb-[56.25%]", "my-4", "rounded-lg", "overflow-hidden", "shadow-md");
        iframe.classList.add("absolute", "top-0", "left-0", "w-full", "h-full");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("title", "YouTube video");
        iframe.parentNode?.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
      }
    });

    const sanitized = DOMPurify.sanitize(doc.body.innerHTML, {
      ALLOWED_TAGS: [
        "p", "br", "strong", "em", "u", "s", "a", "img", "h1", "h2", "h3", "h4", "h5", "h6",
        "ul", "ol", "li", "blockquote", "code", "pre", "table", "thead", "tbody", "tr", "th", "td",
        "div", "span", "iframe",
      ],
      ALLOWED_ATTR: [
        "href", "target", "rel", "src", "alt", "title", "class", "id", "style",
        "loading", "allowfullscreen", "allow", "width", "height",
      ],
    });

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sanitized;
    tempDiv.querySelectorAll("iframe").forEach((iframe) => {
      const src = iframe.getAttribute("src") || "";
      try {
        const url = new URL(src);
        if (!(url.hostname === "www.youtube.com" && url.pathname.startsWith("/embed/"))) {
          iframe.remove();
        }
      } catch {
        iframe.remove();
      }
    });

    return tempDiv.innerHTML;
  };

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <Skeleton className="h-12 w-3/4 mb-6 rounded-lg" />
        <Skeleton className="h-6 w-1/3 mb-8 rounded-lg" />
        <Skeleton className="h-80 w-full mb-8 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-4/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8 text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg">
        <div className="text-red-600 dark:text-red-400 text-2xl font-semibold mb-4">{error}</div>
        <button
          onClick={fetchDetails}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8 text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-gray-700 dark:text-gray-300 text-2xl font-semibold">Blog post not found</div>
      </div>
    );
  }

  return (
    <article className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 rounded-xl p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {blog.title}
          </h1>
          <span className="inline-block mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-md">
            {blog.category}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            {blog.author?.avatar && (
              <img
                src={blog.author.avatar}
                alt={`${blog.author.name}'s avatar`}
                width={48}
                height={48}
                className="rounded-full mr-3 border-2 border-gray-200 dark:border-gray-700"
              />
            )}
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {blog.author?.name || "Anonymous"}
              </div>
              {blog.authorEmail && (
                <a
                  href={`mailto:${blog.authorEmail}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {blog.authorEmail}
                </a>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Published: {format(new Date(blog.createdAt), "MMMM dd, yyyy")}</p>
            {blog.createdAt !== blog.updatedAt && (
              <p>Updated: {format(new Date(blog.updatedAt), "MMMM dd, yyyy")}</p>
            )}
          </div>
        </div>

        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ✅ Featured Image - updated */}
   {blog.imageUrl && (
  <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
    <img
      src={blog.imageUrl}
      alt={`Featured image for ${blog.title}`}
      className="w-full max-h-64 object-contain rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
    />
  </div>
)}



      <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        {blog.contentType === "markdown" ? (
          <MarkdownRenderer content={blog.content} />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: processHtmlContent(blog.content || ""),
            }}
            className="blog-content"
          />
        )}
      </div>

      <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {blog.author && (
            <div className="flex items-center mb-4 sm:mb-0">
              {blog.author.avatar && (
                <img
                  src={blog.author.avatar}
                  alt={`${blog.author.name}'s avatar`}
                  width={48}
                  height={48}
                  className="rounded-full mr-3 border-2 border-gray-200 dark:border-gray-700"
                />
              )}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Written by {blog.author.name || "Anonymous"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Professional content creator
                </p>
                {blog.authorEmail && (
                  <a
                    href={`mailto:${blog.authorEmail}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Contact Author
                  </a>
                )}
              </div>
            </div>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Published: {format(new Date(blog.createdAt), "MMMM dd, yyyy")}</p>
            {blog.createdAt !== blog.updatedAt && (
              <p>Updated: {format(new Date(blog.updatedAt), "MMMM dd, yyyy")}</p>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogDisplay;
