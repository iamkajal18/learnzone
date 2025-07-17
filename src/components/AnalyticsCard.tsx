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
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
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

interface Analytics {
  totalBlogs: number;
  totalViews: number;
  avgViewsPerBlog: number;
  thisMonthViews: number;
  topBlog: Blog | null;
  recentBlogs: Blog[];
}

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  subtitle?: string;
}

const AnalyticsCard = ({
  title,
  value,
  icon,
  gradient,
  subtitle,
}: AnalyticsCardProps) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} p-4 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-80 mt-1">{subtitle}</p>}
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
};

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

  const getContentPreview = (content: string) => {
    const stripped = stripHtmlTags(content);
    return stripped.length > 120
      ? stripped.substring(0, 120) + "..."
      : stripped;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:transform hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <img
          src={idea.imageUrl || DEFAULT_IMAGE_URL}
          alt={idea.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE_URL;
          }}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {(idea.views || 0).toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {idea.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {getContentPreview(idea.content)}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={
              idea.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=00CFD1&color=fff`
            }
            className="w-6 h-6 rounded-full"
            alt={`${authorName}'s profile`}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {authorName}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          {idea.createdAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(idea.createdAt)}</span>
            </div>
          )}
          {idea.tags && idea.tags.length > 0 && (
            <div className="flex gap-1">
              {idea.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/viewmore/${idea._id}`}>
            <button className="text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
              <BookOpen className="h-4 w-4" />
              Read More
            </button>
          </Link>
          {shouldShowActions && (
            <div className="flex gap-2">
              <Link href={`/edit/${idea._id}`}>
                <button className="text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center gap-1 transition-colors">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(idea._id)}
                  disabled={deletingId === idea._id}
                  className="text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-3 rounded-lg flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  {deletingId === idea._id ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
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

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalBlogs: 0,
    totalViews: 0,
    avgViewsPerBlog: 0,
    thisMonthViews: 0,
    topBlog: null,
    recentBlogs: [],
  });
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

  const calculateAnalytics = (blogsData: Blog[]): Analytics => {
    const totalBlogs = blogsData.length;
    const totalViews = blogsData.reduce(
      (sum, blog) => sum + (blog.views || 0),
      0
    );
    const avgViewsPerBlog =
      totalBlogs > 0 ? Math.round(totalViews / totalBlogs) : 0;

    // Calculate this month's views (blogs created this month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthViews = blogsData
      .filter((blog) => {
        if (!blog.createdAt) return false;
        const blogDate = new Date(blog.createdAt);
        return (
          blogDate.getMonth() === currentMonth &&
          blogDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, blog) => sum + (blog.views || 0), 0);

    // Find top blog by views
    const topBlog = blogsData.reduce(
      (top, blog) => ((blog.views || 0) > (top?.views || 0) ? blog : top),
      null as Blog | null
    );

    // Get recent blogs (last 3)
    const recentBlogs = blogsData
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      )
      .slice(0, 3);

    return {
      totalBlogs,
      totalViews,
      avgViewsPerBlog,
      thisMonthViews,
      topBlog,
      recentBlogs,
    };
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user-blogs");
      const { blogs: blogsData = [] } = response.data;

      setBlogs(blogsData);
      setAnalytics(calculateAnalytics(blogsData));
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
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(updatedBlogs);
        setAnalytics(calculateAnalytics(updatedBlogs));
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
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0286a3]"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Sidebar - Analytics */}
      <div className="w-80 bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's your blog overview.
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="space-y-4 mb-8">
          <AnalyticsCard
            title="Total Blogs"
            value={analytics.totalBlogs}
            icon={<BookOpen className="h-8 w-8" />}
            gradient="from-[#0286a3] to-[#0286a3]/80"
          />

          <AnalyticsCard
            title="Total Views"
            value={analytics.totalViews.toLocaleString()}
            icon={<Eye className="h-8 w-8" />}
            gradient="from-emerald-500 to-emerald-600"
          />

          <AnalyticsCard
            title="Avg Views/Blog"
            value={analytics.avgViewsPerBlog}
            icon={<BarChart3 className="h-8 w-8" />}
            gradient="from-purple-500 to-purple-600"
          />

          <AnalyticsCard
            title="This Month"
            value={analytics.thisMonthViews.toLocaleString()}
            icon={<TrendingUp className="h-8 w-8" />}
            gradient="from-orange-500 to-orange-600"
            subtitle="Views this month"
          />
        </div>

        {/* Top Performing Blog */}
        {analytics.topBlog && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Top Performing
            </h3>
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm truncate">
                    {analytics.topBlog.title}
                  </p>
                  <p className="text-xs opacity-90">
                    {(analytics.topBlog.views || 0).toLocaleString()} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {analytics.recentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-2 h-2 bg-[#0286a3] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {blog.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {(blog.views || 0).toLocaleString()}
                    </span>
                    {blog.createdAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {analytics.recentBlogs.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No recent activity
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/create"
              className="w-full bg-[#0286a3] hover:bg-[#0286a3]/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Blog</span>
            </Link>
            <Link
              href="/analytics"
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Content Area - Blog Posts */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Your Blog Posts
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and view all your published content
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {analytics.totalBlogs}{" "}
                {analytics.totalBlogs === 1 ? "Blog" : "Blogs"}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {analytics.totalViews.toLocaleString()} Total Views
              </span>
            </div>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No blogs yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                Start creating your first blog post to see it here!
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 bg-[#0286a3] hover:bg-[#0286a3]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Your First Blog
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
