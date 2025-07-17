"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  User,
  BookOpen,
  Eye,
  Calendar,
  Trash2,
  Edit,
  Plus,
  BarChart3,
  RefreshCw,
  Menu,
  X,
} from "lucide-react";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>?/gm, "");
}

interface Blog {
  _id: string;
  title: string;
  views?: number;
  content: string;
  imageUrl?: string;
  authorEmail?: string;
  createdAt?: string;
  profilePhoto?: string;
  tags?: string[];
}

interface BlogCardProps {
  idea: Blog;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  showActions: boolean;
}

const BlogCard = ({
  idea,
  onDelete,
  deletingId,
  showActions,
}: BlogCardProps) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const isAuthor = userEmail === idea.authorEmail;
  const shouldShowActions = showActions && isAuthor;
  const authorName = idea.authorEmail
    ? stripHtmlTags(idea.authorEmail.split("@")[0])
    : "Anonymous";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <img
          src={idea.imageUrl || DEFAULT_IMAGE_URL}
          alt={idea.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE_URL;
          }}
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {idea.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={
              idea.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=00CFD1&color=fff`
            }
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
            alt={`${authorName}'s profile`}
          />
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
            {authorName}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{(idea.views || 0).toLocaleString()}</span>
            </div>
            {idea.createdAt && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{formatDate(idea.createdAt)}</span>
                <span className="sm:hidden">{new Date(idea.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <Link href={`/viewmore/${idea._id}`} className="flex-1 sm:flex-none">
            <button className="w-full sm:w-auto text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-1.5 px-3 rounded transition-colors">
              View
            </button>
          </Link>
          {shouldShowActions && (
            <div className="flex gap-1 sm:gap-2">
              <Link href={`/edit/${idea._id}`}>
                <button className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-1.5 px-2 sm:px-3 rounded transition-colors">
                  <Edit className="h-3 w-3 sm:hidden" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(idea._id)}
                  disabled={deletingId === idea._id}
                  className="text-xs sm:text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-1.5 px-2 sm:px-3 rounded flex items-center gap-1 transition-colors"
                >
                  {deletingId === idea._id ? (
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Trash2 className="h-3 w-3 sm:hidden" />
                      <span className="hidden sm:inline">Delete</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

      const processedBlogs = blogsData.map((blog: Blog) => ({
        ...blog,
        views: typeof blog.views === "number" ? blog.views : 0,
      }));

      setBlogs(processedBlogs);
      setAnalytics({
        totalBlogs: processedBlogs.length,
        totalViews: processedBlogs.reduce(
          (sum: number, blog: Blog) => sum + (blog.views || 0),
          0
        ),
      });
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchUserData();
    toast.info("Dashboard data refreshed!");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      setDeletingId(id);
      const response = await axios.delete(`/api/delete-blog/${id}`);
      if (response.data.success) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        setAnalytics((prev) => ({
          ...prev,
          totalBlogs: prev.totalBlogs - 1,
          totalViews:
            prev.totalViews -
            (blogs.find((blog) => blog._id === id)?.views || 0),
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0286a3]"></div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
          Welcome back! Here's your blog overview.
        </p>
        <button
          onClick={handleRefresh}
          className="mt-2 flex items-center gap-2 text-sm text-[#0286a3] hover:text-[#0286a3]/80 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
        <div className="bg-gradient-to-r from-[#0286a3] to-[#0286a3]/80 p-3 lg:p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm opacity-90">Total Blogs</p>
              <p className="text-xl lg:text-2xl font-bold">{analytics.totalBlogs}</p>
            </div>
            <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 lg:p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm opacity-90">Total Views</p>
              <p className="text-xl lg:text-2xl font-bold">
                {analytics.totalViews.toLocaleString()}
              </p>
            </div>
            <Eye className="h-6 w-6 lg:h-8 lg:w-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 lg:p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm opacity-90">Avg Views/Blog</p>
              <p className="text-xl lg:text-2xl font-bold">
                {analytics.totalBlogs > 0
                  ? Math.round(
                      analytics.totalViews / analytics.totalBlogs
                    ).toLocaleString()
                  : 0}
              </p>
            </div>
            <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6 lg:mb-8">
        <h3 className="text-base lg:text-lg font-semibold text-gray-800 dark:text-white mb-3 lg:mb-4">
          Recent Activity
        </h3>
        <div className="space-y-2 lg:space-y-3">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog._id}
              className="flex items-center space-x-3 p-2 lg:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="w-2 h-2 bg-[#0286a3] rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {blog.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(blog.views || 0).toLocaleString()} views
                </p>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No recent activity
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base lg:text-lg font-semibold text-gray-800 dark:text-white mb-3 lg:mb-4">
          Quick Actions
        </h3>
        <Link
          href="/create"
          className="w-full bg-[#0286a3] hover:bg-[#0286a3]/90 text-white font-medium py-2.5 lg:py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <Plus className="h-4 w-4" />
          <span>Create New Blog</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 xl:w-96 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
          <div className="p-6">
            <SidebarContent />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-80 max-w-[90vw] bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Dashboard
                  </h1>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Your Blog Posts
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Manage and view all your published content
              </p>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-4">
                  No blogs found. Start creating your first blog!
                </p>
                <Link
                  href="/create"
                  className="inline-block bg-[#0286a3] hover:bg-[#0286a3]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Create Blog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    idea={blog}
                    onDelete={handleDelete}
                    deletingId={deletingId}
                    showActions={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}