import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/lib/util";
import Feedback from "@/model/Feedback";

export async function POST(request: NextRequest) {
    await connectDB();
    const { name,email,testimonial}= await request.json();
    console.log(name)
 


    try {
        //frontedn se data aaya 
        //tumne bola databse me object create karta hai

        const feedback = new Feedback(
            {
                name,
                email,
                testimonial
            }
        )
        // object create kar diya ab save kar dega 
       feedback.save();
        return NextResponse.json(
            {
              message :"successfully created",
              success:true
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message:"error aa gya",
                success:false
            }
        )
    }
    
} 