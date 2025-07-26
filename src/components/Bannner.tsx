'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes";

export default function BlogHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const { theme } = useTheme();

  const words = [
    'Share Your Voice.',
    'Inspire the World.',
    'Write with Purpose.',
    'Build Influence Through Words.',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
      setDisplayedText(currentWord.slice(0, charIndex));

      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="relative bg-white dark:bg-gray-900 mb-4 mx-auto max-w-7xl rounded-xl overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-black opacity-80 dark:opacity-30"></div>

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          filter: theme === 'dark' ? 'invert(1)' : 'none',
          animation: 'float 20s ease-in-out infinite'
        }}>
      </div>

      {/* Enhanced blurred gradient lights */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600 to-blue-800 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 opacity-20 dark:opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 opacity-15 dark:opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">

          {/* Enhanced Badge - Made smaller for mobile */}
          <div className={`transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-blue-50 dark:bg-blue-900/40 border-2 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-xs md:text-sm font-semibold mb-8 md:mb-10 shadow-lg backdrop-blur-sm">
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 50,000+ professionals
            </div>
          </div>

          {/* Enhanced Hero Heading - Adjusted font sizes for mobile */}
          <h1 className={`text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 md:mb-6 transition-all duration-800 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent">
              Your Professional
            </span>
            <br />
            <span className="text-black dark:text-white drop-shadow-lg">
              Blogging Journey
            </span>
          </h1>

          {/* Enhanced Typing Animation - Adjusted font sizes */}
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 transition-all duration-800 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-blue-600 dark:text-blue-400 border-r-4 border-blue-500 pr-2 animate-pulse">
              {displayedText}
            </span>
          </h2>

          {/* Enhanced Description - Adjusted font sizes and padding */}
          <p className={`text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12 font-medium transition-all duration-800 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Create, publish, and grow your blog with <span className="text-blue-600 dark:text-blue-400 font-semibold">AI-powered tools</span>, a beautiful editor, and enterprise-grade features.
          </p>

          {/* Enhanced Buttons - Stacked on mobile, adjusted padding */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transition-all duration-800 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/create">
              <button className="group px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl text-lg sm:text-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform w-full sm:w-auto">
                <span className="flex items-center justify-center">
                  Start Writing
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </Link>
            <Link href="/chat">
              <button className="group px-6 py-2 sm:px-8 sm:py-3 bg-transparent hover:bg-black dark:hover:bg-white text-black dark:text-white border-2 sm:border-3 border-black dark:border-white hover:text-white dark:hover:text-black font-bold rounded-xl text-lg sm:text-xl transition-all duration-300 shadow-2xl hover:shadow-black/25 dark:hover:shadow-white/25 hover:scale-105 transform w-full sm:w-auto">
                <span className="flex items-center justify-center">
                  AI ChatBox
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}