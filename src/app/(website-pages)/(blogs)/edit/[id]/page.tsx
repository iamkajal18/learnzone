"use client";
import React from "react";
import {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation"
function page({params}:any) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");

  const submitHandler= async(e:any)=>{
    const id = await params;
    // params se id to aa rhi hai lekin wo humko string chahiye
    //jab params se id 
    const ideaId=id.id
    
    e.preventDefault();
    // jo chahiye tha wo mil gya ? string chahiye tha
    
    const response = await axios.put(
    
        `/api/edit-blog/${ideaId}`,
        {
           title,
           description 
        }
    )
    console.log(response)
    if(response.data.success){
        alert("Idea Updated");
        router.push("/");
        // i mean jaise hi update ho hum home page pe chale jaye ok? ok
    }
  }
  
  return (
    <div className="flex justify-center mt-16">
      <div className="w-full max-w-lg bg-white p-8 border mt-5 border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center"><span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">Edit </span> Blog</h2>
        <form method="post" onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="blogTitle"
            placeholder="Blog Title"
            className="bg-slate-200 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="blogDes"
            rows={4}
            placeholder="Blog Description"
            className="py-2 px-4 bg-slate-200 text-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDes(e.target.value)}
          />
          <button
            className="bg-black text-white mt-4 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-800"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default page;
// ye ku kar diya phle dursa tha 
// blog m change nhi ho rha hai
// gajab aadmi ho wahi to dhire dhire pahuch rhe hai 