'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const StudyPlan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [countingMetrics, setCountingMetrics] = useState<{ [key: number]: string }>({});

  const strategies = [
    {
      title: "Competition Blueprint",
      items: [
        "Decode syllabus & scoring matrix",
        "Reverse-engineer past papers",
        "Master time allocation strategies",
      ],
      icon: "🔍",
      gradient: "from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30",
      borderColor: "border-purple-400 dark:border-purple-300",
    },
    {
      title: "Strategic Roadmap",
      items: [
        "Micro-target knowledge gaps",
        "Dynamic difficulty prioritization",
        "Adaptive revision algorithm",
      ],
      icon: "🗺️",
      gradient: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30",
      borderColor: "border-green-400 dark:border-green-300",
    },
    {
      title: "Time Alchemy",
      items: [
        "Pomodoro 2.0 with active recall",
        "ROI-based topic selection",
        "Simulated exam conditions",
      ],
      icon: "⏳",
      gradient: "from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30",
      borderColor: "border-yellow-400 dark:border-yellow-300",
    },
    {
      title: "Concept Mastery",
      items: [
        "First-principles learning",
        "Feynman technique integration",
        "Pattern recognition drills",
      ],
      icon: "🧠",
      gradient: "from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30",
      borderColor: "border-blue-400 dark:border-blue-300",
    },
    {
      title: "Pressure Testing",
      items: [
        "Cognitive load simulations",
        "Mistake forensics analysis",
        "Question pattern hacking",
      ],
      icon: "🔥",
      gradient: "from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30",
      borderColor: "border-red-400 dark:border-red-300",
    },
    {
      title: "Peak Performance",
      items: [
        "Circadian rhythm optimization",
        "Neuroplasticity exercises",
        "Flow state protocols",
      ],
      icon: "⚡",
      gradient: "from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30",
      borderColor: "border-indigo-400 dark:border-indigo-300",
    },
    {
      title: "Elite Benchmarking",
      items: [
        "Topper workflow deconstruction",
        "Mastermind groups",
        "Personal advisory board",
      ],
      icon: "🏆",
      gradient: "from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30",
      borderColor: "border-teal-400 dark:border-teal-300",
    },
    {
      title: "Motivation Engineering",
      items: [
        "Gamified progress tracking",
        "Future-self visualization",
        "Dopamine reward scheduling",
      ],
      icon: "🚀",
      gradient: "from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30",
      borderColor: "border-orange-400 dark:border-orange-300",
    },
  ];

  const successMetrics = [
    { value: "87%", label: "Success Rate", target: 87 },
    { value: "5.2x", label: "Efficiency Gain", target: 5.2 },
    { value: "94%", label: "Satisfaction", target: 94 },
    { value: "3.1x", label: "Faster Learning", target: 3.1 },
  ];

  // Initialize animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate cards in sequence
      strategies.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedCards(prev => [...prev, index]);
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Animate metrics counting
  useEffect(() => {
    if (isVisible) {
      successMetrics.forEach((metric, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = metric.target / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= metric.target) {
            current = metric.target;
            clearInterval(counter);
          }
          
          setCountingMetrics(prev => ({
            ...prev,
            [index]: metric.value.includes('x') ? `${current.toFixed(1)}x` : `${Math.floor(current)}%`
          }));
        }, duration / steps);
      });
    }
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#0286a3]/10 to-[#7fd1e8]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* FIXED: Reduced padding from py-1 to py-2 and reduced mb-8 to mb-4 */}
      <div className="max-w-6xl mx-auto py-2 relative z-10">
        {/* Header Section with slide-in animation - FIXED: Reduced margin bottom */}
        <div className={`text-center mb-4 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-teal-600 dark:text-teal-300 inline-block animate-pulse">Competition Domination </span>
            <span className="text-black dark:text-gray-100">Framework</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 max-w-3xl mx-auto">
            Evidence-based strategies used by top 1% competitors to systematically outperform.
          </p>

          {/* Animated Success Metrics - FIXED: Reduced margin top */}
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {successMetrics.map((metric, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="text-lg font-bold text-[#0286a3] dark:text-[#7fd1e8] transition-all duration-300">
                  {countingMetrics[index] || '0%'}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Strategy Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${strategy.gradient} p-3 rounded-lg shadow-md border-t-2 ${strategy.borderColor} transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden ${
                animatedCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
              
              <div className="flex flex-col items-center text-center mb-2 relative z-10">
                <div className={`bg-white dark:bg-gray-800/30 rounded-full w-8 h-8 flex items-center justify-center mb-1 transform transition-all duration-300 ${
                  hoveredCard === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                }`}>
                  <span className="text-lg">{strategy.icon}</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                  {strategy.title}
                </h2>
              </div>
              
              <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300 relative z-10">
                {strategy.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className={`flex items-start transition-all duration-300 ${
                      hoveredCard === index ? 'transform translate-x-1' : ''
                    }`}
                    style={{ transitionDelay: `${itemIndex * 100}ms` }}
                  >
                    <span className="text-[#0286a3] dark:text-[#7fd1e8] mr-1 mt-0.5 transition-colors duration-300">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Floating elements */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* Animated CTA Section - FIXED: Reduced margin top */}
        <div className={`mt-4 bg-gradient-to-r from-[#0286a3] to-[#015a70] dark:from-[#015a70] dark:to-[#01485a] p-4 rounded-lg text-center relative overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7fd1e8]/20 via-transparent to-[#7fd1e8]/20 animate-pulse"></div>
          
          <div className="relative z-10">
            <h3 className="text-base font-bold text-white mb-1">Ready for Competitive Excellence?</h3>
            <p className="text-xs text-[#b3e5f5] dark:text-[#7fd1e8] mb-2 max-w-md mx-auto">
              Join thousands of high-performers who transformed their results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <Link
                href="ai-interview"
                className="group inline-flex items-center justify-center bg-white text-[#0286a3] dark:bg-gray-900 dark:text-[#7fd1e8] px-3 py-1 rounded-md font-medium text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>AI Mock Interview</span>
                <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🎯</div>
              </Link>
              <Link
                href="https://trackode.in/programming-quizzes"
                className="group inline-flex items-center justify-center bg-white text-[#0286a3] dark:bg-gray-900 dark:text-[#7fd1e8] px-3 py-1 rounded-md font-medium text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Start Dominating</span>
                <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🚀</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Competitive Edge Stack - FIXED: Reduced margin top */}
        <div className={`mt-4 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-3">
            The <span className="text-[#0286a3] dark:text-[#7fd1e8] animate-pulse">Competitive Edge</span> Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Cognitive Acceleration",
                description: "Neuroscience-backed techniques to enhance learning speed and retention.",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Pattern Recognition",
                description: "Proprietary algorithms to identify recurring question patterns.",
              },
              {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "Performance Analytics",
                description: "Real-time dashboards tracking key performance indicators.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-[#0286a3] dark:hover:border-[#7fd1e8] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-1 group-hover:text-[#0286a3] dark:group-hover:text-[#7fd1e8] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#0286a3]/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#7fd1e8]/30 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-500/30 rounded-full animate-ping delay-3000"></div>
      </div>
    </div>
  );
};

export default StudyPlan;