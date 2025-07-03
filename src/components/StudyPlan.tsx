'use client';
import React from 'react';
import Link from 'next/link';

const StudyPlan = () => {
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
    },
  ];

  const successMetrics = [
    { value: "87%", label: "Success Rate" },
    { value: "5.2x", label: "Efficiency Gain" },
    { value: "94%", label: "Satisfaction" },
    { value: "3.1x", label: "Faster Learning" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header with Updated Color Theme */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#0286a3] dark:bg-[#015a70] text-white px-4 py-1 rounded-full text-xs font-semibold mb-3 shadow-sm">
            ELITE PERFORMANCE SYSTEM
          </div>
          <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight mt-7">
            <span className="text-[#0286a3] dark:text-[#7fd1e8]">
              Competition Domination Framework
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-3xl mx-auto">
            Evidence-based strategies used by top 1% competitors to systematically outperform.
          </p>

          {/* Animated Success Metrics */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {successMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
              >
                <p className="text-xl font-bold text-[#0286a3] dark:text-[#7fd1e8]">{metric.value}</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Grid with Dark Mode Gradients */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${strategy.gradient} p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-2 border-[#0286a3] dark:border-[#7fd1e8] transform hover:-translate-y-1 dark:shadow-gray-800/20`}
            >
              <div className="flex flex-col items-center text-center mb-3 relative z-10">
                <div className="bg-white dark:bg-gray-800/30 rounded-full w-10 h-10 flex items-center justify-center mb-2 shadow-inner">
                  <span className="text-xl transform transition-transform duration-300 hover:scale-110" aria-hidden="true">
                    {strategy.icon}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">{strategy.title}</h2>
              </div>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {strategy.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-[#0286a3] dark:text-[#7fd1e8] mr-2 mt-0.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Premium CTA with Updated Color */}
        <div className="mt-8 bg-gradient-to-r from-[#0286a3] to-[#015a70] dark:from-[#015a70] dark:to-[#01485a] p-5 rounded-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10 dark:opacity-[0.03]"></div>
          <div className="absolute -right-10 -top-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -left-5 -bottom-5 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Ready for Competitive Excellence?</h3>
            <p className="text-sm text-[#b3e5f5] dark:text-[#7fd1e8] mb-3 max-w-md mx-auto">
              Join thousands of high-performers who transformed their results with our battle-tested system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="https://trackode.in/programming-quizzes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-[#0286a3] dark:bg-gray-900 dark:text-[#7fd1e8] px-4 py-2 rounded-lg font-medium hover:bg-[#e6f7fd] dark:hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Start Dominating Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <button
                className="inline-flex items-center justify-center bg-transparent border-2 border-[#7fd1e8] dark:border-[#0286a3] text-[#b3e5f5] dark:text-[#7fd1e8] px-4 py-2 rounded-lg font-medium hover:bg-[#0286a3]/10 dark:hover:bg-[#015a70]/20 transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                See Case Studies
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-[#b3e5f5] dark:text-[#7fd1e8]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 15,000+ competitors worldwide</span>
            </div>
          </div>
        </div>

        {/* Value Stack Section with Updated Colors */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
            The <span className="text-[#0286a3] dark:text-[#7fd1e8]">Competitive Edge</span> Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
              <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-2">Cognitive Acceleration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Neuroscience-backed techniques to enhance learning speed and retention by 3-5x compared to conventional methods.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
              <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-2">Pattern Recognition</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Proprietary algorithms to identify and exploit recurring question patterns across top competitions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
              <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-2">Performance Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Real-time dashboards tracking 17 key performance indicators to optimize your preparation strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;