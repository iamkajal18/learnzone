import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import mongoose from "mongoose";

// The context type is inferred correctly from App Router
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid blog ID format" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const updated = await Idea.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true, lean: true }
    );

    if (!updated || Array.isArray(updated)) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      views: (updated && typeof updated === "object" && "views" in updated) ? (updated as any).views : 0,
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update views",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
