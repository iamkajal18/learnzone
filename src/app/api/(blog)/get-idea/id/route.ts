import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import { auth } from "../../../../../../auth";

export async function GET(request: NextRequest, context: any) {
  const id = context?.params?.id;

  await connectDB();

  try {
    const idea = await Idea.findById(id);
    if (!idea) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in to view this blog post", success: false },
        { status: 401 }
      );
    }

    if (idea.createdBy !== session.user.id) {
      return NextResponse.json(
        { message: "You are not authorized to view this blog", success: false },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Blog retrieved successfully",
      success: true,
      data: {
        _id: idea._id,
        title: idea.title,
        content: idea.content,
        imageUrl: idea.imageUrl,
        category: idea.category,
        tags: idea.tags,
        contentType: idea.contentType,
        createdBy: idea.createdBy,
        author: idea.author,
        authorEmail: idea.authorEmail,
        profilePhoto: idea.profilePhoto,
        createdAt: idea.createdAt,
        updatedAt: idea.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch blog post",
        success: false,
      },
      { status: 500 }
    );
  }
}
