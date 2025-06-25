"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";

import StudyPlan from "@/components/StudyPlan";
import Banner from "@/components/Bannner";
import RoadMap from "@/components/roadmaps/Main";
import PlacementPre from "@/components/PlacementPre";
// ab hum ye pata laga rhe hain ki iss page par kon hai? ... i mean kon login hain
// agar wahi user login hai jisne blog likhi hai to usi ka blog pe edit ka button dikhe 
// to hum nikalnege kon login hai abhi?
import { useSession } from "next-auth/react";
import AllBlogs from "@/components/AllBlogs";
//isse session nikalneg

// Define the Idea interface


export default function Page() {
  const router = useRouter();
  
  //ab humko uss user ka email mil gya hai jo abhi login hai
  

  return (
    <>
    <Banner/>
    
    <StudyPlan/>
    <RoadMap/>
     <PlacementPre/>
     <AllBlogs/>
<Testimonial />
  <Faq />
   
     
    </>
  );
}
