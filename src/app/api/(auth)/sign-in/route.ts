import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import User from "@/model/User";
import bcrypt from "bcryptjs"

export async function POST(request:NextRequest){
 await connectDB();
 const {email,password}=await request.json();
 console.log(email);
 try{
    // dekhte hai email se find karenge 
    const user = await User.findOne({email})
    
    if(!user){
        
        return NextResponse.json( 
            {
                message:"User not found",
                success:false
            }
        )
    }
    //sochi sahi ho aage badh ke dekh leti hum jaise hi bcrypt. likhe hai compare aa gya hai
    const isPasswordMatched= await bcrypt.compare(password,user.password)
    if(!isPasswordMatched){
        return NextResponse.json({
            message:"Enter correct password",
            success:false
        })
    }
    
    return NextResponse.json({
        message:"Successfully Signedin",
        success:true
    })
 }
 catch(error){
    return NextResponse.json({
        message:"Error occuredr",
        success:false
    })
 }
}
// thik? post methodkya karta hai? database ma data ko send karte hai hua hai isme? nhi to karo thoda sa help
// soogi kya ?nhi bcrupt lagalo uss din bol rhi thi no matter filhal chat gpt se bhi dekh lo ho gyatry yourself 