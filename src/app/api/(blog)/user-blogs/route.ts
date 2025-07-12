import { NextResponse } from "next/server";
import { auth } from "../../../../../auth"; // centralized NextAuth config
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";

export async function GET() {
  await connectDB();

  const session = await auth();

  console.log("Session in GET /api/user-blogs:", session);

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await Idea.find({ authorEmail: session.user.email }).sort({ createdAt: -1 });
    //  dekhomongo db me blog
    console.log("Fetched blogs:", blogs); // Debug log to check data
//  ye to variable hai kisi naam se rah sakta hai 
    if (!blogs || blogs.length === 0) {
      console.log("No blogs found for email:", session.user.email);
    }

    return NextResponse.json({
      success: true,
      totalBlogs: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}