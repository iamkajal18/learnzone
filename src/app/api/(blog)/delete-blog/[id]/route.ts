import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/lib/util";
import Idea from "@/model/Idea";


// yaha likhenge put method 
export async function DELETE(request:NextRequest, {params}:any){
    // jahir hai db se connect hona padega 
    await connectDB();
    
    
    const {id}=await params;
    
    try {
        
       const idea =await Idea.findByIdAndDelete(id);
        

    
    return NextResponse.json(
        {
            message:"successfully deleted",
            success:true,
            idea
            
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