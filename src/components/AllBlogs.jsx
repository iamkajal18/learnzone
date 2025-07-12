"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogCard from "@/components/BlogCard";
import { useTheme } from "@/components/ThemeContext"; // Added this import

function AllBlogs() {
  const { data: session } = useSession();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme(); // Added theme context

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

  const filteredIdeas = ideas.filter((idea) =>
    [idea.title, idea.content, ...(idea.tags || [])].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const LoadingSkeleton = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700">
          <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="flex justify-between mt-4">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-600 bg-clip-text text-transparent">
              Creative Blogs
            </span>{" "}
            <span className="relative inline-block">
              Hub
              <span className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full ${
                theme === 'dark' ? 'opacity-90' : 'opacity-100'
              }`}></span>
            </span>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto">
            Discover and share innovative blog posts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Link href="/create">
            <button className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg">
              Create New Blog
            </button>
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filteredIdeas.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea) => (
              <BlogCard 
                key={idea._id}
                idea={idea}
                showActions={false} // Never show actions on home page
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-teal-500 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              {searchTerm ? "No results found" : "No blogs yet"}
            </h3>
            {!searchTerm && (
              <Link href="/create">
                <button className="mt-3 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg">
                  Create First Blog
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default AllBlogs;