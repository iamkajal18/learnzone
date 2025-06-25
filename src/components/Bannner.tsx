"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Banner Component
function Banner() {
  
  return (
    <div className="grid md:grid-cols-3 gap-6 min-h-[164px] py-8 px-16 bg-gradient-to-r from-blue-700 to-blue-400 overflow-hidden">
      <div className="md:col-span-2">
        <div className="flex justify-between">
           
        <h1 className="text-3xl   font-bold text-white">
          
          Welcome to Competition Preparation</h1>
          </div>
       
        <p className="text-base text-gray-200 mt-4">
          A journey of hard work, focus, and determination begins here. Let’s sharpen our skills, stay committed, and aim
          for success. Every step counts — let’s give it our best!
        </p>
        <button
          type="button"
          className="py-3 px-6 text-sm font-semibold bg-white text-blue-600 hover:bg-slate-100 rounded-md mt-8"
        >
          Get Started
        </button>
      

<Link href="/ai-interview">
  <button
    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 rounded-md w-28 h-12 text-white mx-2 my-2 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
  >
    Ai Interview
  </button>
</Link>
      </div>
      <div className="relative max-md:hidden">
        <img
          src="https://media.istockphoto.com/id/2157176253/photo/quality-assurance-and-document-control-with-checklist-icons-businessman-mark-off-items-on.jpg?s=612x612&w=0&k=20&c=n9oG8gKFEPEUv74GWOgtZnLiAbrMrWD0zTudrvJC8No="
          alt="Banner Image"
          className="w-full right-4 top-[-13px] md:absolute skew-x-[-16deg] rotate-2 object-cover"
        />
      </div>
     
    </div>
  );
}

// Testimonial Component


// Combined Page Component
export default function HomePage() {
  return (
    <>
      <Banner />
      
    </>
  );
}