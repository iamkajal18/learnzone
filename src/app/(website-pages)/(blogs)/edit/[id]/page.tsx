"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Skeleton } from "@/components/skeleton";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Toolbar from "@/components/Toolbar";

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  contentType: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
    tags: "",
    contentType: "html",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, content: editor.getHTML() });
    },
  });

  const categories = [
    "Technology",
    "Lifestyle",
    "Education",
    "Health",
    "Data Science",
    "Java",
    "Python",
    "Other",
  ];

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/view-more/${id}`);
      const blogData = response.data.idea;

      setBlog(blogData);
      setFormData({
        title: blogData.title,
        content: blogData.content,
        imageUrl: blogData.imageUrl || "",
        category: blogData.category,
        tags: blogData.tags.join(", "),
        contentType: blogData.contentType,
      });

      if (editor) {
        editor.commands.setContent(blogData.content);
      }
    } catch (err) {
      setError("Failed to load blog post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (editor && formData.content) {
      editor.commands.setContent(formData.content);
    }
  }, [editor, formData.content]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await axios.put(`/api/edit-blog/${id}`, {
        ...formData,
        tags: tagsArray,
      });

      if (response.data.success) {
        router.push(`/blog/${id}`);
      } else {
        setError("Failed to update blog post");
      }
    } catch (err) {
      setError("Failed to update blog post");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-64 w-full mb-6 rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 text-center py-20">
        <div className="text-red-500 text-xl">{error}</div>
        <button
          onClick={fetchBlog}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 text-center py-20">
        Blog not found
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 p-2"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1 rounded-md border border-gray-300 shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600">
            <Toolbar editor={editor} />
            <EditorContent
              editor={editor}
              className="min-h-[300px] border-t rounded-b-md p-4 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Featured Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 p-2"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 p-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 p-2"
            placeholder="technology, web development, nextjs"
          />
        </div>

        <div>
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">
            Content Type
          </label>
          <select
            name="contentType"
            id="contentType"
            value={formData.contentType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 p-2"
          >
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.push(`/blog/${id}`)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
