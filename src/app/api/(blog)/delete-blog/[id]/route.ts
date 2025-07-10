import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import { auth } from "../../../../../../auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed", success: false },
      { status: 405 }
    );
  }

  await connectDB();

  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in to delete a blog post", success: false },
        { status: 401 }
      );
    }

    const idea = await Idea.findById(params.id);
    if (!idea) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    if (idea.createdBy.toString() !== session.user.id) {
      return NextResponse.json(
        { message: "You are not authorized to delete this blog", success: false },
        { status: 403 }
      );
    }

    await Idea.deleteOne({ _id: params.id });

    return NextResponse.json(
      { message: "Blog deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog post", success: false },
      { status: 500 }
    );
  }
}