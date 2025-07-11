'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    direction: number;
    opacity: number;
    color: string;
  };

  const [particles, setParticles] = useState<Particle[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  // Updated color palette to match #0286a3 theme
  const dynamicWords = [
    { text: 'Competitive Edge', color: '#000000', icon: '🚀' }, // Main theme color
    { text: 'Professional Skills', color: '#000000', icon: '💎' }, // Slightly more cyan
    { text: 'Career Growth', color: '#000000', icon: '📈' }, // Slightly more blue
    { text: 'Success Story', color: '#000000', icon: '⭐' } // Teal-green variant
  ];

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      direction: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.2,
      color: dynamicWords[Math.floor(Math.random() * dynamicWords.length)].color
    }));
    setParticles(initialParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + Math.cos(particle.direction) * particle.speed * 0.1) % 100,
          y: (particle.y + Math.sin(particle.direction) * particle.speed * 0.1) % 100,
          direction: particle.direction + Math.random() * 4 - 2
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e:any) => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    if (bannerRef.current) {
      bannerRef.current.addEventListener('mousemove', handleMouseMove);
      return () => bannerRef.current?.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const currentWord = dynamicWords[currentWordIndex];

  return (
    <div 
  ref={bannerRef}
  className="relative min-h-screen bg-gradient-to-br from-[#0286a3]  to-[#467878] lg:bg-teal-600 dark:from-[#0f2e3a] dark:via-[#0d2a3a] dark:to-[#0a3a3a] overflow-hidden"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `scale(${isHovered ? 1.5 : 1})`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
      </div>

      {/* Interactive mouse follower */}
      <div 
        className="absolute pointer-events-none z-5 w-96 h-75 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${currentWord.color}40 0%, transparent 70%)`,
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-tr from-[#0286a3]/20 to-[#02a386]/20 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 left-40 w-56 h-56 bg-gradient-to-bl from-[#026ba3]/15 to-transparent rounded-full animate-bounce"></div>
        
        {/* Hexagonal pattern */}
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-[#02a3a3]/20 to-[#0286a3]/20 transform rotate-12 animate-pulse" 
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
        </div>
      </div>

      {/* Animated wave background */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z" fill="url(#wave-gradient)" className="animate-pulse">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,0; 0,0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0286a3" />
              <stop offset="50%" stopColor="#026ba3" />
              <stop offset="100%" stopColor="#02a3a3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Enhanced text content */}
          <div className={`flex flex-col justify-center text-center lg:text-left max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-10'
          }`}>
            
            {/* Animated icon */}
            <div className="text-3xl mb-4 animate-bounce">
              {currentWord.icon}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white leading-tight tracking-tight mb-2">
              Elevate Your
            </h1>
            
            <div className="relative inline-block mb-6">
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight transition-all duration-500 ease-in-out transform hover:scale-105"
                style={{ 
                  color: currentWord.color,
                  textShadow: `0 0 30px ${currentWord.color}50, 0 0 60px ${currentWord.color}30`,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              >
                {currentWord.text}
              </h2>
              
              {/* Animated underline */}
              <div 
                className="absolute bottom-0 left-0 h-1 rounded-full animate-pulse"
                style={{
                  background: `linear-gradient(90deg, ${currentWord.color}, transparent)`,
                  width: '100%',
                  animation: 'expandWidth 3s ease-in-out infinite'
                }}
              />
            </div>
            
            <p className={`text-lg sm:text-xl lg:text-2xl text-gray-200 dark:text-gray-300 leading-relaxed mb-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-5'
            }`}>
              🎯 Master your skills with our advanced preparation platform.
              <br />
              ⚡ Stay focused, refine expertise, and unlock your <span className="font-bold text-[#02a3a3]">full potential</span> with personalized learning paths.
            </p>
            
            {/* Enhanced buttons */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 ease-out delay-500 ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <Link href="/signin">
                <button className="group relative w-full py-4 px-8 text-lg font-bold text-white bg-gradient-to-r from-[#0286a3] via-[#026ba3] to-[#02a3a3] hover:from-[#02a386] hover:via-[#0286a3] hover:to-[#026ba3] rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-[#0286a3]/50 transform hover:-translate-y-2 active:translate-y-0 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    🚀 Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                </button>
              </Link>
              
              <Link href="/create">
                <button className="group relative w-full py-4 px-8 text-lg font-bold text-white bg-gradient-to-r from-[#02a386] via-[#0286a3] to-[#02a3a3] hover:from-[#02a3a3] hover:via-[#02a386] hover:to-[#0286a3] rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-[#02a3a3]/50 transform hover:-translate-y-2 active:translate-y-0 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    ✨ Create Masterpiece
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Enhanced image section */}
          <div className={`relative mt-8 lg:mt-0 w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto transition-all duration-1000 ease-out delay-200 ${
            isLoaded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-10'
          }`}>
            
            {/* Main image container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0286a3] via-[#02a386] to-[#02a3a3] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-300 animate-pulse"></div>
              
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300 transform group-hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/2157176253/photo/quality-assurance-and-document-control-with-checklist-icons-businessman-mark-off-items-on.jpg?s=612x612&w=0&k=20&c=n9oG8gKFEPEUv74GWOgtZnLiAbrMrWD0zTudrvJC8No="
                  alt="Professional working with checklist"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-[#0286a3]/20 rounded-3xl transition-all duration-300"></div>
                
                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#02a386]/20 via-transparent to-[#02a3a3]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>
            </div>
            
            {/* Floating elements around image */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#02a386] to-[#0286a3] rounded-full animate-bounce opacity-80 shadow-lg"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-[#02a3a3] to-[#026ba3] rounded-full animate-pulse opacity-80 shadow-lg"></div>
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-br from-[#0286a3] to-[#02a386] rounded-full animate-ping opacity-60"></div>
            
            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#02a3a3] rounded-full transform -translate-x-1/2 -translate-y-8 opacity-70"></div>
              <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-[#0286a3] rounded-full transform -translate-x-1/2 translate-y-8 opacity-70"></div>
              <div className="absolute top-1/2 left-0 w-4 h-4 bg-[#02a386] rounded-full transform -translate-x-8 -translate-y-1/2 opacity-70"></div>
              <div className="absolute top-1/2 right-0 w-4 h-4 bg-[#026ba3] rounded-full transform translate-x-8 -translate-y-1/2 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#0286a3] via-[#02a386] to-[#02a3a3] opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
      </div>
      
      {/* CSS Custom Animations */}
      <style jsx>{`
        @keyframes expandWidth {
          0%, 100% { width: 0%; }
          50% { width: 100%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
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