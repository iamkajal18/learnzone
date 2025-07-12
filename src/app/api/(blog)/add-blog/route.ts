import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import { auth } from "../../../../../auth";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in to create a blog post", success: false },
        { status: 401 }
      );
    }

    const { title, content, imageUrl, category, tags, contentType } = await request.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { message: "Title, content, and category are required", success: false },
        { status: 400 }
      );
    }
//  idea wale tble me store ho rha hai ...thik hai
//  to jab find karenge to idea wale me se hi find karenge na haalog wale me se find kar hi ho 
    const idea = new Idea({
      title,
      content,
      imageUrl,
      category,
      tags: tags || [],
      contentType: contentType || "html",
      createdBy: session.user.id,
      author: session.user.name,
      authorEmail: session.user.email,
      profilePhoto: session.user.image,
    });

    await idea.save();

    return NextResponse.json(
      {
        message: "Blog created successfully",
        success: true,
        data: idea,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        message: "Failed to create blog post",
        success: false,
      },
      { status: 500 }
    );
  }
}