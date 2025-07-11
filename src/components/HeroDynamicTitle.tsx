'use client';

import React, { useState, useEffect } from 'react';

const HeroDynamicTitle: React.FC = () => {
  const dynamicWords: string[] = [
    'Competitive Edge',
    'Professional Skills',
    'Career Growth',
    'Success Story',
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 2500); // word changes every 2.5 seconds

    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
      Elevate Your{' '}
      <span className="relative inline-block">
        <span className="text-[#7fd1e8] dark:text-[#a8e6f5] transition-all duration-500 ease-in-out">
          {dynamicWords[currentWordIndex]}
        </span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7fd1e8] dark:bg-[#a8e6f5] transform scale-x-0 animate-pulse"></span>
      </span>
    </h1>
  );
};

export default HeroDynamicTitle;
