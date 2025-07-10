import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";
import { auth } from "../../../../../../auth";

export async function DELETE(
  req: NextRequest,
  context: any // 👈 this bypasses the TypeScript type error
) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json(
      { message: "Blog ID not provided", success: false },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    if (idea.createdBy.toString() !== session.user.id) {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 403 }
      );
    }

    await Idea.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Blog deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
