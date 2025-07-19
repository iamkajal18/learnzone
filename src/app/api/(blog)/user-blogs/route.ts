// app/api/user-blogs/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth"
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function GET() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await Idea.find({ authorEmail: session.user.email })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      totalBlogs: blogs.length,
      blogs: blogs.map(blog => ({
        ...blog,
        _id: (blog._id as { toString: () => string }).toString(),
        views: blog.views || 0
      })),
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}