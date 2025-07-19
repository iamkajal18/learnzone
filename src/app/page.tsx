"use client";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";


import Banner from "@/components/Bannner";
import RoadMap from "@/components/roadmaps/Main";
import PlacementPre from "@/components/PlacementPre";

import AllBlogs from "@/components/AllBlogs";


export default function Page() {
  const router = useRouter();


  return (
    <>
    <Banner/>
    <RoadMap/>
    <AllBlogs/>
     <PlacementPre/>
     <Testimonial />
     <Faq />
   
     
    </>
  );
}
