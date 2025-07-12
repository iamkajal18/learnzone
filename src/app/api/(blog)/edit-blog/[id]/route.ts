import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import { auth } from "../../../../../../auth";
import mongoose from "mongoose";

// 👇 Helper to strip HTML
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function PUT(request: NextRequest, context: any) {
  const id = context?.params?.id;

  await connectDB();

  try {
    const { title, content, imageUrl, category, tags, contentType } = await request.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { message: "Title, content, and category are required", success: false },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in to edit a blog post", success: false },
        { status: 401 }
      );
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    if (idea.createdBy !== session.user.id) {
      return NextResponse.json(
        { message: "You are not authorized to edit this blog", success: false },
        { status: 403 }
      );
    }

    // ✅ Update fields
    idea.title = title;
    idea.content = content; // HTML or plain text (as you send it)
    idea.plainTextContent = stripHtml(content); // 🔥 Plain text version
    idea.imageUrl = imageUrl || idea.imageUrl;
    idea.category = category;
    idea.tags = tags || idea.tags;
    idea.contentType = contentType || idea.contentType;

    await idea.save();

    return NextResponse.json(
      { message: "Blog updated successfully", success: true, data: idea },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { message: "Validation failed", errors, success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Failed to update blog post",
        success: false,
      },
      { status: 500 }
    );
  }
}
