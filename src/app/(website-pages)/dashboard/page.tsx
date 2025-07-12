"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Idea from "@/model/Idea";

export default function Dashboard() {
  const { data: session, status } = useSession();
  type Blog = {
    _id: string;
    title: string;
    views?: number;
    // add other properties as needed
  };

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState({ totalBlogs: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user-blogs");
      const { blogs: blogsData = [] } = response.data;
      
      setBlogs(blogsData);
      setAnalytics({
        totalBlogs: blogsData.length,
        totalViews: blogsData.reduce((sum: number, blog: Blog) => sum + (blog.views || 0), 0)
      });
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      setDeletingId(id);
      const response = await axios.delete(`/api/delete-blog/${id}`);
      if (response.data.success) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        setAnalytics(prev => ({
          ...prev,
          totalBlogs: prev.totalBlogs - 1
        }));
        toast.success("Blog post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
          Your Blog Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Blogs</h2>
            <p className="text-3xl font-bold text-teal-500 dark:text-teal-400 mt-2">{analytics.totalBlogs}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Views</h2>
            <p className="text-3xl font-bold text-teal-500 dark:text-teal-400 mt-2">{analytics.totalViews}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Recent Blog</h2>
            <p className="text-xl font-semibold text-gray-800 dark:text-white mt-2 truncate">
              {blogs[0]?.title || "No blogs yet"}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Blog Posts</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No blogs found. Start creating your first blog!
              </p>
              <Link href="/create" className="mt-4 inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg">
                Create Blog
              </Link>
            </div>
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                idea={blog}
                onDelete={handleDelete}
                deletingId={deletingId}
                showActions={true} // Always show actions on dashboard
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}