"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

interface Idea {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorEmail: string;
  createdAt?: string;
  profilePhoto?: string;
  tags?: string[];
}

function AllBlogs() {
  const { data: session } = useSession();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const userEmail = session?.user?.email || '';

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/get-idea");
      setIdeas(response.data.success ? response.data.ideas : []);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIdeas(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    
    try {
      setDeletingId(id);
      await axios.delete(`/api/delete-blog/${id}`);
      setIdeas(prev => prev.filter(idea => idea._id !== id));
    } catch (error) {
      console.error("Error deleting idea:", error);
      alert("Failed to delete idea. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const searchLower = searchTerm.toLowerCase();
    return (
      idea.title?.toLowerCase().includes(searchLower) ||
      idea.description?.toLowerCase().includes(searchLower) ||
      idea.tags?.some(tag => tag?.toLowerCase().includes(searchLower))
    );
  });

  const stripHtml = (html: string) => {
    return new DOMParser().parseFromString(html, 'text/html').body.textContent || "";
  };

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
          <h1 className="text-3xl font-bold">
            <span className="text-teal-500 dark:text-teal-400">Creative Ideas</span>{' '}
            <span className="text-gray-800 dark:text-gray-200">Hub</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto">
            Discover and share innovative ideas
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search ideas..."
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
          {/* <Link href="/create">
            <button className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Idea
            </button>
          </Link> */}
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filteredIdeas.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={idea.imageUrl}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {idea.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={idea.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(idea.authorEmail.split('@')[0])}&background=00CFD1&color=fff`}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {stripHtml(idea.authorEmail.split('@')[0])}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href={`/viewmore/${idea._id}`}>
                      <button className="text-sm bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white py-1.5 px-3 rounded">
                        View
                      </button>
                    </Link>

                    {/* {userEmail === idea.authorEmail && (
                      <button
                        onClick={() => handleDelete(idea._id)}
                        disabled={deletingId === idea._id}
                        className="text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-1.5 px-3 rounded flex items-center gap-1"
                      >
                        {deletingId === idea._id ? (
                          <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
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
              {searchTerm ? 'No results found' : 'No ideas yet'}
            </h3>
            {!searchTerm && (
              <Link href="/create">
                <button className="mt-3 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg">
                  Create First Idea
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBlogs;