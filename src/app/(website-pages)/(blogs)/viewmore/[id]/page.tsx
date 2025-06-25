"use client";
import React, { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkDown";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogDisplayProps {
  blog: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    contentType?: string; // 'html' or 'markdown'
    createdAt: string;
    updatedAt: string;
    author?: {
      name: string;
      avatar?: string;
    };
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

  // Function to process HTML content and enhance images and iframes
  const processHtmlContent = (html: string) => {
    if (!html) return "";

    // Create a DOM parser to manipulate the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Enhance all images in the content
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add("my-4", "rounded-lg", "shadow-md", "mx-auto");
      img.setAttribute("loading", "lazy");
      if (!img.alt) {
        img.alt = "Blog content image";
      }
    });

    // Enhance all iframes (for YouTube videos)
    const iframes = doc.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute("src") || "";
      // Only process YouTube iframes
      if (src.startsWith("https://www.youtube.com/embed/")) {
        // Wrap iframe in a div for responsive aspect ratio
        const wrapper = doc.createElement("div");
        wrapper.classList.add("relative", "w-full", "h-0", "pb-[56.25%]", "my-4", "rounded-lg", "overflow-hidden", "shadow-md");
        iframe.classList.add("absolute", "top-0", "left-0", "w-full", "h-full");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("title", "YouTube video");
        // Move iframe into wrapper
        iframe.parentNode?.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
      }
    });

    // Configure DOMPurify to allow safe iframes
    const sanitized = DOMPurify.sanitize(doc.body.innerHTML, {
      ALLOWED_TAGS: [
        "p", "br", "strong", "em", "u", "s", "a", "img", "h1", "h2", "h3", "h4", "h5", "h6",
        "ul", "ol", "li", "blockquote", "code", "pre", "table", "thead", "tbody", "tr", "th", "td",
        "div", "span", "iframe", // Allow iframes
      ],
      ALLOWED_ATTR: [
        "href", "target", "rel", "src", "alt", "title", "class", "id", "style",
        "loading", "allowfullscreen", "allow", "width", "height", // Allow iframe attributes
      ],
      // Custom validation for iframe src
      ADD_URI_SAFE_FILTER: (uri: string) => {
        try {
          const url = new URL(uri);
          // Only allow YouTube embed URLs
          return url.hostname === "www.youtube.com" && url.pathname.startsWith("/embed/");
        } catch {
          return false;
        }
      },
    });

    return sanitized;
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-64 w-full mb-6 rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 text-center py-20">
        <div className="text-red-500 text-xl">{error}</div>
        <button
          onClick={fetchDetails}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 text-center py-20">
        Blog not found
      </div>
    );
  }

  return (
    <article className="w-full max-w-4xl mx-auto my-8 px-4">
      {/* Blog header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Author info */}
        {blog.author && (
          <div className="flex items-center mb-4">
            {blog.author && (
              <div className="mr-3">
                <img
                  src={blog.profilePhoto}
                  alt={blog.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900">
                {blog.author || "Anonymous"}
              </div>
              
            </div>
          </div>
        )}

        {/* Featured image */}
        {blog.imageUrl && (
          <div className="mb-6 relative aspect-video overflow-hidden rounded-lg shadow-md">
            <img
              src={blog.imageUrl}
              alt={`Featured image for ${blog.title}`}
              width={400}
              height={200}
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </header>

      {/* Blog content */}
      <div className="prose max-w-none prose-lg dark:prose-invert">
        {blog.contentType === "markdown" ? (
          <MarkdownRenderer content={blog.content}></MarkdownRenderer>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: processHtmlContent(blog.content || ""),
            }}
            className="blog-content"
          />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        {blog.author && (
          <div className="flex items-center">
            {blog.author&& (
              <div className="mr-3">
                <img
                  src={blog.profilePhoto}
                  alt={blog.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg">
                Written by {blog.author || "Anonymous"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Professional content creator
              </p>
            </div>
          </div>
        )}
      </footer>
    </article>
  );
};

export default BlogDisplay;