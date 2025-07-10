import connectDB from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";
import Idea from "@/model/Idea";
import mongoose from "mongoose";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  idea?: T;
  error?: string;
}

interface IdeaResponse {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  authorEmail?: string;
}

// Your full valid tags array here
const VALID_TAGS: string[] = [
  "concept", "notion", "thought", "opinion", "idea", "theory", "plan", "draft", "vision", "insight",
  "creativity", "innovation", "learning", "education", "strategy", "technique", "update", "revision"
];

export async function GET(request: NextRequest, context: any) {
  const id = context?.params?.id;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Invalid blog post ID",
        error: "The provided ID is not a valid MongoDB ObjectId",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const idea: any = await Idea.findById(id).lean();

    if (!idea) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          message: "Blog post not found",
          error: "No blog post found with the provided ID",
        },
        { status: 404 }
      );
    }

    const filteredTags = Array.isArray(idea.tags)
      ? idea.tags.filter((tag: string) => VALID_TAGS.includes(tag.toLowerCase()))
      : [];

    const ideaResponse: IdeaResponse = {
      id: idea._id.toString(),
      title: idea.title || "Untitled",
      content: idea.content || "",
      imageUrl: idea.imageUrl || undefined,
      contentType: idea.contentType || "html",
      createdAt: new Date(idea.createdAt || Date.now()).toISOString(),
      updatedAt: new Date(idea.updatedAt || Date.now()).toISOString(),
      author: {
        name: idea.author?.name || idea.author || "Anonymous",
        avatar: idea.author?.avatar || undefined,
      },
      category: idea.category || "Other",
      tags: filteredTags,
      authorEmail: idea.authorEmail || undefined,
    };

    return NextResponse.json<ApiResponse<IdeaResponse>>(
      {
        success: true,
        message: "Blog post retrieved successfully",
        idea: ideaResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        message: "Failed to retrieve blog post",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
