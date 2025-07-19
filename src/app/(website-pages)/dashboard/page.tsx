"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { BookOpen, Eye, BarChart3, RefreshCw, Plus, Menu, X, Edit, Trash2 } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  views: number;
  content: string;
  imageUrl?: string;
  authorEmail?: string;
  createdAt: string;
  profilePhoto?: string;
  tags?: string[];
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState({ 
    totalBlogs: 0, 
    totalViews: 0,
    avgViews: 0
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

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user-blogs");
      const blogsData = response.data.blogs || [];
      
      const totalViews = blogsData.reduce((sum: number, blog: Blog) => sum + (blog.views || 0), 0);
      const avgViews = blogsData.length > 0 ? Math.round(totalViews / blogsData.length) : 0;

      setBlogs(blogsData);
      setAnalytics({
        totalBlogs: blogsData.length,
        totalViews,
        avgViews
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
    toast.info("Dashboard refreshed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      setDeletingId(id);
      const response = await axios.delete(`/api/delete-blog/${id}`);
      
      if (response.data.success) {
        const deletedBlog = blogs.find(blog => blog._id === id);
        const newBlogs = blogs.filter(blog => blog._id !== id);
        
        setBlogs(newBlogs);
        setAnalytics(prev => ({
          totalBlogs: newBlogs.length,
          totalViews: prev.totalViews - (deletedBlog?.views || 0),
          avgViews: newBlogs.length > 0 
            ? Math.round((prev.totalViews - (deletedBlog?.views || 0)) / newBlogs.length)
            : 0
        }));
        
        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  const AnalyticsCard = ({ 
    title, 
    value, 
    icon: Icon,
    color = "blue"
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color?: "blue" | "indigo" | "gradient";
  }) => {
    const bgColor = {
      blue: "bg-blue-600",
      indigo: "bg-indigo-600",
      gradient: "bg-gradient-to-r from-blue-600 to-indigo-600"
    }[color];

    return (
      <div className={`${bgColor} p-4 rounded-lg text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-90">{title}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
          <Icon className="h-8 w-8 opacity-80" />
        </div>
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Here's your blog overview.
        </p>
        <button
          onClick={handleRefresh}
          className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </button>
      </div>

      <div className="space-y-3">
        <AnalyticsCard 
          title="Total Blogs" 
          value={analytics.totalBlogs} 
          icon={BookOpen}
          color="blue"
        />
        <AnalyticsCard 
          title="Total Views" 
          value={analytics.totalViews.toLocaleString()} 
          icon={Eye}
          color="indigo"
        />
        <AnalyticsCard 
          title="Avg Views/Blog" 
          value={analytics.avgViews.toLocaleString()} 
          icon={BarChart3}
          color="gradient"
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
          Quick Actions
        </h3>
        <Link
          href="/create"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <Plus className="h-4 w-4" />
          <span>Create New Blog</span>
        </Link>
      </div>
    </div>
  );

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
        <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-lg">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-72 bg-white dark:bg-gray-800 h-full shadow-lg">
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Your Blog Posts
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage and view all your published content
                </p>
              </div>
              <Link
                href="/create"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create New</span>
              </Link>
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                No blogs found. Start creating your first blog!
              </p>
              <Link
                href="/create"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Create Blog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
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
  );
};

const BlogCard = ({
  blog,
  onDelete,
  deletingId,
  showActions,
}: {
  blog: Blog;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  showActions: boolean;
}) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const isAuthor = userEmail === blog.authorEmail;
  const shouldShowActions = showActions && isAuthor;
  const authorName = blog.authorEmail
    ? blog.authorEmail.split("@")[0]
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
      <div className="relative h-40 overflow-hidden">
        <img
          src={blog.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {blog.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={
              blog.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=4f46e5&color=fff`
            }
            className="w-6 h-6 rounded-full"
            alt={`${authorName}'s profile`}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {authorName}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{blog.views.toLocaleString()} views</span>
            </div>
            {blog.createdAt && (
              <div className="flex items-center gap-1">
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <Link href={`/viewmore/${blog._id}`} className="flex-1">
            <button className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded transition-colors">
              View
            </button>
          </Link>
          {shouldShowActions && (
            <div className="flex gap-2">
              <Link href={`/edit/${blog._id}`}>
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white p-2 rounded flex items-center gap-1 transition-colors"
                >
                  {deletingId === blog._id ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Trash2 className="h-4 w-4" />
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

export default Dashboard;