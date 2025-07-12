"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

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
  profilePhoto?: string;
  tags?: string[];
}

interface BlogCardProps {
  idea: Blog;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  showActions: boolean;
}

export default function BlogCard({ idea, onDelete, deletingId, showActions }: BlogCardProps) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const isAuthor = userEmail === idea.authorEmail;
  const shouldShowActions = showActions && isAuthor;
  const authorName = idea.authorEmail ? stripHtmlTags(idea.authorEmail.split("@")[0]) : "Anonymous";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img
          src={idea.imageUrl || DEFAULT_IMAGE_URL}
          alt={idea.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
          {idea.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <img
            src={
              idea.profilePhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=00CFD1&color=fff`
            }
            className="w-6 h-6 rounded-full"
            alt={`${authorName}'s profile`}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {authorName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/viewmore/${idea._id}`}>
            <button className="text-sm bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white py-1.5 px-3 rounded">
              View
            </button>
          </Link>
          {shouldShowActions && (
            <div className="flex gap-2">
              <Link href={`/edit/${idea._id}`}>
                <button className="text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-1.5 px-3 rounded">
                  Edit
                </button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(idea._id)}
                  disabled={deletingId === idea._id}
                  className="text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-1.5 px-3 rounded flex items-center gap-1"
                >
                  {deletingId === idea._id ? (
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}