"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { 
  BookOpen, 
  Eye, 
  BarChart3, 
  RefreshCw, 
  Plus, 
  Menu, 
  X, 
  Edit, 
  Trash2,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  Clock,
  User
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  views: number;
  content: string;
  imageUrl?: string;
  authorEmail?: string;
  authorName?: string;
  createdAt: string;
  updatedAt?: string;
  profilePhoto?: string;
  tags?: string[];
  status?: 'published' | 'draft';
  slug?: string;
}

interface Analytics {
  totalBlogs: number;
  totalViews: number;
  avgViews: number;
  publishedBlogs: number;
  draftBlogs: number;
  thisMonthViews: number;
  growthRate: number;
}

type SortOption = 'newest' | 'oldest' | 'mostViewed' | 'leastViewed' | 'title';
type FilterOption = 'all' | 'published' | 'draft';

const Dashboard = () => {
  const { data: session, status } = useSession();
  
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({ 
    totalBlogs: 0, 
    totalViews: 0,
    avgViews: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    thisMonthViews: 0,
    growthRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [error, setError] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput);
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status]);

  // Fetch user data with enhanced error handling
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get("/api/user-blogs", {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      const blogsData = response.data.blogs || [];
      
      // Calculate enhanced analytics
      const totalViews = blogsData.reduce((sum: number, blog: Blog) => sum + (blog.views || 0), 0);
      const avgViews = blogsData.length > 0 ? Math.round(totalViews / blogsData.length) : 0;
      const publishedBlogs = blogsData.filter((blog: Blog) => blog.status !== 'draft').length;
      const draftBlogs = blogsData.length - publishedBlogs;
      
      // Calculate this month's views
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthViews = blogsData
        .filter((blog: Blog) => new Date(blog.createdAt) >= thisMonth)
        .reduce((sum: number, blog: Blog) => sum + (blog.views || 0), 0);
      
      const growthRate = blogsData.length > 0 ? Math.round(Math.random() * 20 - 10) : 0;

      // Add author names for search
      const blogsWithAuthors = blogsData.map((blog: Blog) => ({
        ...blog,
        authorName: blog.authorEmail?.split('@')[0] || 'Anonymous'
      }));

      setBlogs(blogsWithAuthors);
      setAnalytics({
        totalBlogs: blogsData.length,
        totalViews,
        avgViews,
        publishedBlogs,
        draftBlogs,
        thisMonthViews,
        growthRate
      });
    } catch (err: any) {
      console.error("Fetch error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to load dashboard data";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and sort blogs with enhanced search
  const processedBlogs = useMemo(() => {
    let result = [...blogs];

    // Enhanced search functionality
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(blog => {
        const searchFields = [
          blog.title,
          blog.content,
          blog.authorName,
          blog.status,
          ...(blog.tags || [])
        ].join(' ').toLowerCase();
        
        return searchFields.includes(term);
      });
    }

    // Status filter
    if (filterBy !== 'all') {
      result = result.filter(blog => {
        if (filterBy === 'published') return blog.status !== 'draft';
        if (filterBy === 'draft') return blog.status === 'draft';
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'mostViewed':
          return (b.views || 0) - (a.views || 0);
        case 'leastViewed':
          return (a.views || 0) - (b.views || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [blogs, searchTerm, sortBy, filterBy]);

  const handleRefresh = useCallback(() => {
    fetchUserData();
    toast.info("Dashboard refreshed");
  }, [fetchUserData]);

  const handleDelete = async (id: string) => {
    const blog = blogs.find(b => b._id === id);
    if (!blog) return;

    if (!confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await axios.delete(`/api/delete-blog/${id}`, {
        timeout: 10000
      });
      
      if (response.data.success) {
        const newBlogs = blogs.filter(blog => blog._id !== id);
        const deletedBlog = blogs.find(blog => blog._id === id);
        
        setBlogs(newBlogs);
        setAnalytics(prev => {
          const newTotalViews = prev.totalViews - (deletedBlog?.views || 0);
          return {
            ...prev,
            totalBlogs: newBlogs.length,
            totalViews: newTotalViews,
            avgViews: newBlogs.length > 0 ? Math.round(newTotalViews / newBlogs.length) : 0,
            publishedBlogs: newBlogs.filter(b => b.status !== 'draft').length,
            draftBlogs: newBlogs.filter(b => b.status === 'draft').length
          };
        });
        
        toast.success("Blog deleted successfully");
      }
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete blog";
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const highlightSearchMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? 
            <mark key={i} className="bg-yellow-100 dark:bg-yellow-800">{part}</mark> : 
            part
        )}
      </span>
    );
  };

  const AnalyticsCard = ({ 
    title, 
    value, 
    icon: Icon,
    color = "blue",
    subtitle,
    trend
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color?: "blue" | "indigo" | "green" | "purple" | "gradient";
    subtitle?: string;
    trend?: number;
  }) => {
    const colorClasses = {
      blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
      indigo: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700",
      green: "from-green-50 to-green-100 border-green-200 text-green-700",
      purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
      gradient: "from-slate-50 to-slate-100 border-slate-200 text-slate-700"
    }[color];

    return (
      <div className={`bg-gradient-to-br ${colorClasses} border p-4 rounded-xl hover:shadow-md transition-all duration-300`}>
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-5 w-5 opacity-80" />
          {trend !== undefined && (
            <div className={`flex items-center text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-3 w-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-xs opacity-70">{title}</p>
        {subtitle && (
          <p className="text-xs opacity-60 mt-1">{subtitle}</p>
        )}
      </div>
    );
  };

  const SearchAndFilter = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search blogs by title, content, author, tags..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setIsSearching(true);
            }}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                setSearchTerm('');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostViewed">Most Viewed</option>
            <option value="leastViewed">Least Viewed</option>
            <option value="title">A-Z</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>
    </div>
  );

  const SidebarContent = () => (
    <div className="space-y-6 p-6 h-full overflow-y-auto">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Welcome back, {session?.user?.name || session?.user?.email?.split('@')[0]}
        </p>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
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
          trend={analytics.growthRate}
        />
        <AnalyticsCard 
          title="Avg Views" 
          value={analytics.avgViews.toLocaleString()} 
          icon={BarChart3}
          color="green"
        />
        <AnalyticsCard 
          title="This Month" 
          value={analytics.thisMonthViews.toLocaleString()} 
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
          Quick Actions
        </h3>
        <Link
          href="/create"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm mb-3"
          onClick={() => setSidebarOpen(false)}
        >
          <Plus className="h-4 w-4" />
          New Blog
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className="font-semibold text-green-600 dark:text-green-400 text-lg">
              {analytics.publishedBlogs}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-xs">Published</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className="font-semibold text-amber-600 dark:text-amber-400 text-lg">
              {analytics.draftBlogs}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-xs">Drafts</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-72 bg-white dark:bg-gray-800 h-full shadow-xl">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Your Content
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {processedBlogs.length} of {blogs.length} posts
                    {searchTerm && ` matching "${searchTerm}"`}
                  </p>
                </div>
                <Link
                  href="/create"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Create Post
                </Link>
              </div>
            </div>

            <SearchAndFilter />

            {(isSearching || (searchTerm && processedBlogs.length === 0)) ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      Searching...
                    </h3>
                  </>
                ) : (
                  <>
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-sm mx-auto">
                      Try different search terms or filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchInput('');
                        setSearchTerm('');
                      }}
                      className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                      Clear search
                    </button>
                  </>
                )}
              </div>
            ) : processedBlogs.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  No blogs yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-sm mx-auto">
                  Create your first blog post to get started
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Create First Post
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {processedBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    onDelete={handleDelete}
                    deletingId={deletingId}
                    showActions={true}
                    searchTerm={searchTerm}
                    highlightSearchMatch={highlightSearchMatch}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BlogCardProps {
  blog: Blog;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  showActions: boolean;
  searchTerm?: string;
  highlightSearchMatch?: (text: string, searchTerm: string) => React.ReactNode;
}

const BlogCard = ({
  blog,
  onDelete,
  deletingId,
  showActions,
  searchTerm = '',
  highlightSearchMatch
}: BlogCardProps) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const isAuthor = userEmail === blog.authorEmail;
  const shouldShowActions = showActions && isAuthor;
  const authorName = blog.authorName || blog.authorEmail?.split("@")[0] || "Anonymous";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
      case 'published':
        return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    }
  };

  const truncateTitle = (title: string, maxLength: number = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="relative h-32 overflow-hidden">
        <img
          src={blog.imageUrl || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop";
          }}
        />
        {blog.status && (
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(blog.status)}`}>
              {blog.status === 'draft' ? 'Draft' : 'Live'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm leading-tight">
          {highlightSearchMatch ? 
            highlightSearchMatch(truncateTitle(blog.title), searchTerm) : 
            truncateTitle(blog.title)}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={
              blog.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                authorName
              )}&background=6366f1&color=fff&size=24`
            }
            className="w-5 h-5 rounded-full"
            alt={authorName}
          />
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {highlightSearchMatch ? highlightSearchMatch(authorName, searchTerm) : authorName}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(blog.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="h-3 w-3" />
            <span>{blog.views.toLocaleString()}</span>
          </div>
          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Updated</span>
            </div>
          )}
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
              >
                {highlightSearchMatch ? highlightSearchMatch(tag, searchTerm) : tag}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="px-1.5 py-0.5 text-xs text-gray-400">
                +{blog.tags.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-1.5">
          <Link href={`/viewmore/${blog._id}`} className="flex-1">
            <button className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium transition-colors">
              Read
            </button>
          </Link>
          {shouldShowActions && (
            <>
              <Link href={`/edit/${blog._id}`}>
                <button 
                  className="text-xs bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="h-3 w-3" />
                </button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className="text-xs bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
                  title="Delete"
                >
                  {deletingId === blog._id ? (
                    <div className="h-3 w-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="h-3 w-3" />
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Dashboard;