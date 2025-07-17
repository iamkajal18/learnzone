'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-50 mb-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-100 dark:to-gray-50 opacity-60"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Badge */}
          <div className={`text-center transition-all duration-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 50,000+ professionals
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6 transition-all duration-800 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              Professional
              <span className="ml-2 text-blue-600">Blogging</span>
              <span className="text-3xl lg:text-4xl ml-2 font-bold text-gray-600">
                Made Simple
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 transition-all duration-800 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Create, publish, and grow your professional blog with our enterprise-grade platform. 
              Built for serious writers and businesses who value quality and performance.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-1 transition-all duration-800 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Link href="/create">
                <button className="px-8 py-4 hover:bg-blue-600 bg-transparent text-blue-500 border-2 border-blue-500 hover:text-white font-semibold rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Start Writing Today
                </button>
              </Link>
              <Link href="/allblog">
                <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:bg-gray-50">
                  Visit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}