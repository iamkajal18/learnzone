import connectDB from "@/lib/util";
import { NextRequest,NextResponse } from "next/server";
import Idea from "@/model/Idea";

export async function GET(request:NextRequest, {params}:any){
    const {id}= await params;
    console.log(id);
   await connectDB();
   try{
    const idea=await Idea.findById(id);
    console.log(idea)
    return NextResponse.json({
         message: " Get idea Successfully ",
         success:true,
         idea //yahi to hai main goal hnn
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
