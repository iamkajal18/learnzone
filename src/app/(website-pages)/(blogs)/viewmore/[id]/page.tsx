"use client";
import React, { useEffect, useState, useCallback } from "react";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { Eye, Calendar, User, Mail, Tag } from "lucide-react";
import { Skeleton } from "@/components/skeleton";

interface Blog {
  id: string;
  _id?: string;
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
  views: number;
  profilePhoto?: string;
}

const BlogDisplay = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState(0);
  const [viewTracked, setViewTracked] = useState(false);

  const trackView = useCallback(async (blogId: string) => {
    if (viewTracked) return;
    
    try {
      const response = await axios.patch(`/api/view-counter/${blogId}`);
      if (response.data.success) {
        setViewCount(prev => prev + 1);
        setViewTracked(true);
        
        // Store in session storage to prevent duplicate counts
        sessionStorage.setItem(`viewed_${blogId}`, "true");
      }
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  }, [viewTracked]);

  const fetchBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/view-more/${id}`);
      
      if (response.data.success && response.data.idea) {
        const blogData = response.data.idea;
        // Normalize ID
        blogData.id = blogData.id || blogData._id;
        
        setBlog(blogData);
        setViewCount(blogData.views || 0);
        
        // Track view after loading
        if (!sessionStorage.getItem(`viewed_${blogData.id}`)) {
          await trackView(blogData.id);
        }
      } else {
        setError(response.data.message || "Blog post not found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  }, [id, trackView]);

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id, fetchBlogDetails]);

  const processHtmlContent = (html: string) => {
    if (!html) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Process images - Remove shadows and improve styling
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add("my-6", "rounded-lg", "mx-auto", "max-h-96", "w-full", "object-cover");
      img.setAttribute("loading", "lazy");
      if (!img.alt) img.alt = "Blog content image";
    });

    // Process iframes
    const iframes = doc.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      if (iframe.getAttribute("src")?.startsWith("https://www.youtube.com/embed/")) {
        const wrapper = doc.createElement("div");
        wrapper.classList.add(
          "relative",
          "w-full",
          "h-0",
          "pb-[56.25%]",
          "my-6",
          "rounded-lg",
          "overflow-hidden"
        );
        iframe.classList.add("absolute", "top-0", "left-0", "w-full", "h-full");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.parentNode?.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
      }
    });

    return DOMPurify.sanitize(doc.body.innerHTML, {
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
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-8 w-3/4 mb-4 rounded-lg" />
          <Skeleton className="h-4 w-1/3 mb-6 rounded-lg" />
          <Skeleton className="h-64 w-full mb-6 rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-5/6 rounded-md" />
            <Skeleton className="h-3 w-4/6 rounded-md" />
            <Skeleton className="h-3 w-2/3 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400 text-xl font-medium mb-4">{error}</div>
          <button
            onClick={fetchBlogDetails}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-gray-700 dark:text-gray-300 text-xl font-medium">Blog post not found</div>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* Header section - Compact and Clean */}
        <header className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
          
          {/* Title and Category */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {blog.title}
            </h1>
            <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shrink-0">
              <Tag className="w-3 h-3 mr-1" />
              {blog.category}
            </span>
          </div>

          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={blog.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author?.name || "Anonymous")}&background=4f46e5&color=fff`}
                  alt={`${blog.author?.name}'s avatar`}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
                />
              </div>
              <div className="ml-3">
                <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                  <User className="w-3 h-3 mr-1" />
                  {blog.author?.name || "Anonymous"}
                </div>
                {blog.authorEmail && (
                  <a
                    href={`mailto:${blog.authorEmail}`}
                    className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    {blog.authorEmail}
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span>{viewCount.toLocaleString()} views</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured image - No shadow, clean design */}
        {blog.imageUrl && (
          <div className="px-6 pt-6">
            <div className="overflow-hidden rounded-xl">
              <img
                src={blog.imageUrl}
                alt={`Featured image for ${blog.title}`}
                className="w-full h-64 object-cover rounded-xl transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
                }}
              />
            </div>
          </div>
        )}

        {/* Blog content */}
        <div className="p-6">
          <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h4:text-sm prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed">
            {blog.contentType === "markdown" ? (
              <div className="markdown-content">
                {blog.content}
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: processHtmlContent(blog.content || ""),
                }}
                className="blog-content"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <img
                src={blog.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author?.name || "Anonymous")}&background=4f46e5&color=fff`}
                alt={`${blog.author?.name}'s avatar`}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600"
              />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {blog.author?.name || "Anonymous"}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Content Creator
                </p>
              </div>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p>Published: {format(new Date(blog.createdAt), "MMM dd, yyyy")}</p>
              {blog.createdAt !== blog.updatedAt && (
                <p>Updated: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}</p>
              )}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogDisplay;