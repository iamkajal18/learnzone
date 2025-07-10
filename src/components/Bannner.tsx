'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const dynamicWords = ['Competitive Edge', 'Professional Skills', 'Career Growth', 'Success Story'];
  
  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    // Animate dynamic words
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#0286a3] to-[#027792] dark:from-[#015a70] dark:to-[#01485a] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-white/5 rounded-full animate-pulse delay-3000"></div>
        
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      {/* Background pattern with animation */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-5 dark:opacity-10 animate-pulse"></div>
      
      {/* Container with max-width and centered content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content with slide-in animation */}
          <div className={`flex flex-col justify-center text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-10'
          }`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Elevate Your{' '}
              <span className="relative inline-block">
                <span className="text-[#7fd1e8] dark:text-[#a8e6f5] transition-all duration-500 ease-in-out">
                  {dynamicWords[currentWordIndex]}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7fd1e8] dark:bg-[#a8e6f5] transform scale-x-0 animate-pulse"></span>
              </span>
            </h1>
            
            <p className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#b3e5f5] dark:text-[#c2ecfa] leading-relaxed transition-all duration-1000 ease-out delay-300 ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}>
              Master your skills with our advanced preparation platform. Stay focused, refine expertise, and unlock your full potential with personalized learning paths.
            </p>
            
            {/* Animated buttons */}
            <div className={`mt-8 grid grid-cols-2 sm:flex gap-3 justify-center lg:justify-start transition-all duration-1000 ease-out delay-500 ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <Link href="/signin">
                <button
                  type="button"
                  className="group w-full sm:w-auto py-3 px-6 text-sm sm:text-base font-semibold bg-white text-[#0286a3] hover:bg-gray-50 dark:bg-gray-800 dark:text-[#a8e6f5] dark:hover:bg-gray-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7fd1e8] to-[#a8e6f5] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </Link>
              <Link href="/">
                <button
                  type="button"
                  className="group w-full sm:w-auto py-3 px-6 text-sm sm:text-base font-semibold bg-[#0286a3]/90 dark:bg-[#015a70]/90 text-white hover:bg-[#027792] dark:hover:bg-[#01485a] rounded-lg transition-all duration-300 shadow-md hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#7fd1e8] focus:ring-opacity-50 relative overflow-hidden"
                >
                  <span className="relative z-10">AI Interview</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Image with slide-in animation from right */}
          <div className={`relative mt-8 lg:mt-0 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto transition-all duration-1000 ease-out delay-200 ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 group">
              <img
                src="https://media.istockphoto.com/id/2157176253/photo/quality-assurance-and-document-control-with-checklist-icons-businessman-mark-off-items-on.jpg?s=612x612&w=0&k=20&c=n9oG8gKFEPEUv74GWOgtZnLiAbrMrWD0zTudrvJC8No="
                alt="Professional working with checklist"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0286a3]/30 dark:from-[#015a70]/40 to-transparent rounded-xl transition-all duration-300 group-hover:from-[#0286a3]/20"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-[#7fd1e8]/50 rounded-full animate-bounce delay-1000"></div>
              
              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 rounded-xl"></div>
            </div>
            
            {/* Decorative elements around image */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#7fd1e8]/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-2000"></div>
          </div>
        </div>
      </div>
      
      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7fd1e8] via-white to-[#7fd1e8] opacity-30 animate-pulse"></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Banner />
      {/* Add other page sections here */}
    </div>
  );
}