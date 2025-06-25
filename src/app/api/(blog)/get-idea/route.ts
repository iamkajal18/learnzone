import connectDB from "@/lib/util";
import { NextRequest,NextResponse } from "next/server";
import Idea from "@/model/Idea";

export async function GET(request:NextRequest){
   await connectDB();
   try{
    const ideas=await Idea.find()
    console.log(ideas)
    return NextResponse.json({
         message: " Get idea Successfully ",
         success:true,
         ideas //yahi to hai main goal hnn
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
