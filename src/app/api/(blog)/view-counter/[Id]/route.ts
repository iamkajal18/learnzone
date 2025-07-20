import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import rateLimit from "@/lib/rateLimit"; 

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function PATCH(request: NextRequest, context: any) {
  const id = context.params?.id;

  // Rate limiting
  try {
    await limiter.check(NextResponse, 10, "VIEW_INCREMENT");
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Too many requests" },
      { status: 429 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid blog ID" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const updated = await Idea.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true, upsert: false }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        views: updated.views,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "CDN-Cache-Control": "max-age=60",
          "Vercel-CDN-Cache-Control": "max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error("View increment error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// CORS Preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
