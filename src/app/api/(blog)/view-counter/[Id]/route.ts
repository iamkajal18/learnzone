import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = params.id;

  // Validate MongoDB ObjectId
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
      { new: true, lean: true } // Return updated document as plain JS object
    ) as { views: number } | null;

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      views: updated.views,
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