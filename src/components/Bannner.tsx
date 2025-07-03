'use client';
import React from 'react';
import Link from 'next/link';

function Banner() {
  return (
    <div className="relative bg-gradient-to-r from-[#0286a3] to-[#027792] dark:from-[#015a70] dark:to-[#01485a] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-5 dark:opacity-10"></div>
      
      {/* Container with max-width and centered content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 mb-11">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div className="flex flex-col justify-center text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-2xl sm:text-2xl md:text-5xl font-semibold text-white leading-tight tracking-tight py-4">
              Elevate Your <span className="text-[#7fd1e8]">Competitive Edge</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#b3e5f5] dark:text-[#7fd1e8] leading-relaxed">
              Master your skills with our advanced preparation platform. Stay focused, refine expertise, and unlock your full potential with personalized learning paths.
            </p>
            
            {/* Buttons grid for better mobile layout */}
            <div className="mt-8 grid grid-cols-2 sm:flex gap-3 justify-center lg:justify-start">
              <Link href="/get-started">
                <button
                  type="button"
                  className="w-full sm:w-auto py-3 px-6 text-sm sm:text-base font-semibold bg-white text-[#0286a3] dark:bg-gray-800 dark:text-[#7fd1e8] rounded-lg hover:bg-[#e6f7fd] dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get Started
                </button>
              </Link>
              <Link href="/interview">
                <button
                  type="button"
                  className="w-full sm:w-auto py-3 px-6 text-sm sm:text-base font-semibold bg-[#0286a3]/90 dark:bg-[#015a70]/90 text-white rounded-lg hover:bg-[#027792] dark:hover:bg-[#01485a] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  AI Interview
                </button>
              </Link>
              <Link href="/ai-interview-mock">
                <button
                  type="button"
                  className="col-span-2 sm:w-auto py-3 px-6 text-sm sm:text-base font-semibold bg-[#0286a3]/90 dark:bg-[#015a70]/90 text-white rounded-lg hover:bg-[#027792] dark:hover:bg-[#01485a] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Mock Interview
                </button>
              </Link>
            </div>
          </div>
          
          {/* Image with better responsive sizing */}
          <div className="relative mt-8 lg:mt-0 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
              <img
                src="https://media.istockphoto.com/id/2157176253/photo/quality-assurance-and-document-control-with-checklist-icons-businessman-mark-off-items-on.jpg?s=612x612&w=0&k=20&c=n9oG8gKFEPEUv74GWOgtZnLiAbrMrWD0zTudrvJC8No="
                alt="Professional working with checklist"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0286a3]/30 dark:from-[#015a70]/30 to-transparent rounded-xl"></div>
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
      {/* Add other page sections here */}
    </div>
  );
}