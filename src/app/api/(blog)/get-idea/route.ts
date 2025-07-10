import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed", success: false },
      { status: 405 }
    );
  }

  await connectDB();

  try {
    const ideas = await Idea.find().lean(); // Use lean() for better performance
    return NextResponse.json({
      message: "Ideas retrieved successfully",
      success: true,
      data: ideas,
    });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json({
      message: "Failed to fetch ideas",
      success: false,
    }, { status: 500 });
  }
}