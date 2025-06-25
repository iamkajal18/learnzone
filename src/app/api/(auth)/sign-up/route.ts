import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import User from "@/model/User";
import bcrypt from "bcryptjs"

export async function POST(request:NextRequest){
 await connectDB();
 const {username,email,password}=await request.json();
 console.log(username);
 try{
    // dekhte hai email se find karenge 
    const users = await User.findOne({email})
    // ye find one agar iss email se hoga to find karke layega na? ha to kuchh na kuchh users me aa jayega? ha to agar true hai top if me hi fas ke return ho jayega 
    if(users){
        return NextResponse.json( 
            {
                message:"already in db",
                success:false
            }
        )
    }
    const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    // normal create ho gya same to sam e
    //create karne se pehle check 
    // bas ek kaam ye kar lo ki chech karo ki kahi pehle se hai to nhi agar hai to return kar do turant aur thoda sa password ko decrypt kar lo bas
    const user=new User(
        {
            username,
            email,
            password:hashedPassword
        }
    )
   user.save();
    
    return NextResponse.json({
        message:"Successfully SignUp",
        success:true
    })
 }
 catch(error){
    return NextResponse.json({
        message:"Error occur",
        success:true
    })
 }
}
// thik? post methodkya karta hai? database ma data ko send karte hai hua hai isme? nhi to karo thoda sa help
// soogi kya ?nhi bcrupt lagalo uss din bol rhi thi no matter filhal chat gpt se bhi dekh lo ho gyatry yourself 