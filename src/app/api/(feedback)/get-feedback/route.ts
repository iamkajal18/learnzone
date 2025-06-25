import connectDB from "@/lib/util";
import { NextRequest,NextResponse } from "next/server";
import Feedback from "@/model/Feedback";

export async function GET(request:NextRequest){
   await connectDB();
   try{
    const feedbacks=await Feedback.find()
    console.log(feedbacks)
    return NextResponse.json({
         message: " Get Feedback Successfully ",
         success:true,
         feedbacks //yahi to hai main goal hnn
    })
   }
   catch(error){
    //catch me bhi respon ok
    return NextResponse.json({
       message:"Something went wrong",
       success:false
    })
   
   }

}
