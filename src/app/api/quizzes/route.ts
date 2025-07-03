import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/model/Quiz";
import connectDB from "@/lib/util";
import {auth} from "@/../auth"

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const { quizName, totalQuestions, totalMarks } = await request.json();

        if (!quizName || !totalQuestions || !totalMarks) {
            return NextResponse.json(
                {
                    message: "Quiz name, total questions, and total marks are required",
                    success: false,
                },
                { status: 400 }
            );
        }

        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    message: "Unauthorized: Please log in",
                    success: false,
                },
                { status: 401 }
            );
        }

        const newQuiz = new Quiz({
            quizName,
            totalQuestions,
            totalMarks,
            createdBy: session.user.email
        });

        await newQuiz.save();

        return NextResponse.json(
            {
                message: "Quiz created successfully!",
                success: true,
                data: newQuiz,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Quiz creation failed",
                success: false,
            },
            { status: 500 }
        );
    }
}