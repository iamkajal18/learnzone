import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea"


// yaha likhenge put method 
export async function PUT(request:NextRequest, {params}:any){
    // jahir hai db se connect hona padega 
    await connectDB();
    const {title,description}=await request.json();
    
    const {id}=await params;
    console.log("just came in db")
    try {
        
       const ideas =await Idea.findByIdAndUpdate(id,{
        title,
         description
    }
    );// yaha pa check kar le rah hai kya id se aur turent update bhi?
    
    // ye bhi ek tarika hota hai ok? dono ek sath findByIdAndUpdate yes kaju 
    if(!ideas){
        return NextResponse.json(
            {
                message:"jab db me blog hai hi nhi to update kisko karoge ?",
                success:false
            }
        )
    }
    return NextResponse.json(
        {
            message:"successfully updated",
            success:true,
            ideas
        }
    )
    } catch (error) {
        return NextResponse.json(
            {
                message:`${error}`,
                success:false
            }
        )
    }
    
     
    
    
}