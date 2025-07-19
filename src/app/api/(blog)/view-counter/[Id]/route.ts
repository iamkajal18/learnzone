// app/api/view-counter/[id]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const updated = await Idea.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      views: updated.views 
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to update views" 
    }, { status: 500 });
  }
}