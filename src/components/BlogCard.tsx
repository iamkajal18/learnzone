"use client";

import { useSession } from "next-auth/react";

// Extend the session user type to include accessToken
declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
}
import Link from "next/link";
import { useState } from "react";
import { Eye, Calendar, Edit, Trash2 } from "lucide-react";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>?/gm, "");
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorEmail?: string;
  createdAt?: string;
  updatedAt?: string;
  profilePhoto?: string;
  tags?: string[];
  views?: number;
  category?: string;
}

interface BlogCardProps {
  idea: Blog;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  showActions: boolean;
}

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
}

async function generateSummary(content: string, title: string, accessToken?: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    const truncatedContent = content.slice(0, 5000); // Limit content size
    const response = await fetch("/api/generate-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({ content: truncatedContent, title }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error("Error generating summary:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : undefined;
    return `Failed to generate summary: ${errorMessage || "Network error or timeout"}`;
  }
}

function SummaryModal({ isOpen, onClose, content, title }: SummaryModalProps) {
  const { data: session } = useSession();
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSummary = async () => {
    console.log("Generating summary for:", title);
    setIsLoading(true);
    setError("");
    const generatedSummary = await generateSummary(content, title, session?.user?.accessToken);
    if (generatedSummary.startsWith("Failed")) {
      setError(generatedSummary);
    } else {
      setSummary(generatedSummary);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Blog Summary
        </h2>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        ) : summary ? (
          <p className="text-gray-600 dark:text-gray-300 mb-4">{summary}</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Click the button below to generate a summary.
          </p>
        )}
        <div className="flex justify-end gap-2">
          {!summary && !error && (
            <button
              onClick={handleGenerateSummary}
              onTouchStart={handleGenerateSummary}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Summary"}
            </button>
          )}
          <button
            onClick={onClose}
            onTouchStart={onClose}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogCard({
  idea,
  onDelete,
  deletingId,
  showActions,
}: BlogCardProps) {
  const { data: session } = useSession();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const userEmail = session?.user?.email || "";
  const isAuthor = userEmail === idea.authorEmail;
  const shouldShowActions = showActions && isAuthor;
  const authorName = idea.authorEmail
    ? stripHtmlTags(idea.authorEmail.split("@")[0])
    : "Anonymous";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={idea.imageUrl || DEFAULT_IMAGE_URL}
          alt={idea.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_IMAGE_URL;
          }}
        />
        {idea.category && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {idea.category}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
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
            className="w-6 h-6 rounded-full"
            alt={`${authorName}'s profile`}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {authorName}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 mt-auto">
          {idea.views !== undefined && (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{idea.views.toLocaleString()} views</span>
            </div>
          )}
          {idea.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(idea.createdAt)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-2 flex-1">
            <Link href={`/viewmore/${idea._id}`} className="flex-1">
              <button className="w-full text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-3 rounded transition-colors">
                View
              </button>
            </Link>
            <button
              onClick={() => {
                console.log("Opening summary modal");
                setIsSummaryOpen(true);
              }}
              onTouchStart={() => {
                console.log("Opening summary modal (touch)");
                setIsSummaryOpen(true);
              }}
              className="flex-1 text-sm bg-black hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-3 rounded transition-colors"
            >
              Read Summary
            </button>
          </div>
          {shouldShowActions && (
            <div className="flex gap-2">
              <Link href={`/edit/${idea._id}`}>
                <button className="text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(idea._id)}
                  disabled={deletingId === idea._id}
                  className="text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white p-2 rounded flex items-center gap-1 transition-colors"
                >
                  {deletingId === idea._id ? (
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

      <SummaryModal
        isOpen={isSummaryOpen}
        onClose={() => {
          console.log("Closing summary modal");
          setIsSummaryOpen(false);
        }}
        content={idea.content}
        title={idea.title}
      />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-2xl p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 h-full flex flex-col animate-pulse">
        <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          <div className="flex items-center gap-4 mt-auto mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}