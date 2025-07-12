'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const dynamicWords = [
    { text: 'Competitive Edge', icon: '🚀' },
    { text: 'Professional Skills', icon: '💎' },
    { text: 'Career Growth', icon: '📈' },
    { text: 'Success Story', icon: '⭐' }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(wordInterval);
    };
  }, []);

  const currentWord = dynamicWords[currentWordIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0286a3] to-[#467878] overflow-hidden">
      
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-40 w-56 h-56 bg-white rounded-full"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Text content */}
          <div className={`flex flex-col justify-center text-center lg:text-left max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-10'
          }`}>
            
            {/* Icon */}
            <div className="text-3xl mb-4">
              {currentWord.icon}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
              Elevate Your
            </h1>
            
            <div className="relative inline-block mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-500 ease-in-out">
                {currentWord.text}
              </h2>
              
              {/* Simple underline */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-full w-full mt-2"></div>
            </div>
            
            <p className={`text-lg sm:text-xl text-gray-100 leading-relaxed mb-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}>
              Master your skills with our advanced preparation platform.
              <br />
              Stay focused, refine expertise, and unlock your <span className="font-semibold">full potential</span> with personalized learning paths.
            </p>
            
            {/* Buttons */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 ease-out delay-500 ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <Link href="/signin">
                <button className="w-full py-4 px-8 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50">
                  Get Started
                </button>
              </Link>
              
              <Link href="/create">
                <button className="w-full py-4 px-8 text-lg font-semibold text-[#0286a3] bg-white hover:bg-gray-100 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Create Masterpiece
                </button>
              </Link>
            </div>
          </div>
          
          {/* Image section */}
          <div className={`relative mt-8 lg:mt-0 w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto transition-all duration-1000 ease-out delay-200 ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-10'
          }`}>
            
            {/* Main image container */}
            <div className="relative group">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://media.istockphoto.com/id/2157176253/photo/quality-assurance-and-document-control-with-checklist-icons-businessman-mark-off-items-on.jpg?s=612x612&w=0&k=20&c=n9oG8gKFEPEUv74GWOgtZnLiAbrMrWD0zTudrvJC8No="
                  alt="Professional working with checklist"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Simple overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Banner />
    </div>
  );
}