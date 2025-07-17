"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogCard from "@/components/BlogCard";
import { useTheme } from "@/components/ThemeContext";

function AllBlogs() {
  const { data: session } = useSession();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest"); // 'latest', 'oldest', 'trending'
  const { theme } = useTheme();

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/get-idea");
      if (response.data.success) {
        setIdeas(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const sortIdeas = (ideas) => {
    switch (sortOption) {
      case "latest":
        return [...ideas].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...ideas].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "trending":
        return [...ideas].sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default:
        return ideas;
    }
  };

  const filteredIdeas = ideas.filter((idea) =>
    [idea.title, idea.content, ...(idea.tags || [])].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedAndFilteredIdeas = sortIdeas(filteredIdeas);

  const LoadingSkeleton = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="h-48 bg-gray-100 dark:bg-gray-800"></div>
          <div className="p-5">
            <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6 mb-2"></div>
            <div className="flex items-center justify-between mt-6">
              <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600  to-blue-700 bg-clip-text text-transparent">
              Creative Blogs
            </span>{" "}
            <span className="relative inline-block">
              Hub
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full ${
                  theme === "dark" ? "opacity-90" : "opacity-100"
                }`}
              ></span>
            </span>
          </h3>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover and share innovative blog posts from our community
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search blogs by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="trending">Trending</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <Link href="/create">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create New Blog
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : sortedAndFilteredIdeas.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredIdeas.map((idea) => (
              <BlogCard key={idea._id} idea={idea} showActions={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-5">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm
                ? "No matching blogs found"
                : "No blogs published yet"}
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search or filter"
                : "Be the first to share your ideas with the community"}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link href="/create">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Create First Blog
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default AllBlogs;
