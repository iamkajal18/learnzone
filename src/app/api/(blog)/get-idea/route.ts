import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const ideas = await Idea.find();
    return NextResponse.json({
      message: "Ideas retrieved successfully",
      success: true,
      data: ideas, // Changed from `ideas` to `data`
    });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json({
      message: "Failed to fetch ideas",
      success: false,
    });
  }
}