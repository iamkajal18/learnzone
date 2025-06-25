import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import {auth} from "../../../../../auth"
export async function POST(request: NextRequest) {
  await connectDB();
  
  try {
    const { title, content, imageUrl, contentType } = await request.json();
    
    // Basic validation
    if (!title || !content) {
      return NextResponse.json(
        {
          message: "Title and content are required",
          success: false,
        },
        { status: 400 }
      );
    }
    const session = await auth();
    console.log(session)
    // two important things
    // ab jab bhi koi blog create karega to uska email bhi store hoga blog ke sath
    // ki hum isi ka use karke ye pata laga payenge ki ye blog likha kon hai
    const newIdea = new Idea({
      author:session?.user?.name,
      profilePhoto:session?.user?.image,
      authorEmail:session?.user?.email,  // storing this so that we can check who has written this 
      title,
      content,
      contentType: contentType || 'html', // Default to html if not specified
      imageUrl, // Use imageUrl directly now
    });
    
    await newIdea.save();
    
    return NextResponse.json(
      {
        message: "Blog created successfully!",
        success: true,
        data: newIdea,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Blog creation failed",
        success: false,
      },
      { status: 500 }
    );
  }
}