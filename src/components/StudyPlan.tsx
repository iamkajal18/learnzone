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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-teal-400 dark:text-teal-300">Competition Domination </span>
            <span className="text-black dark:text-gray-100">Framework</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 max-w-3xl mx-auto">
            Evidence-based strategies used by top 1% competitors to systematically outperform.
          </p>

          {/* Success Metrics */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {successMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <p className="text-lg font-bold text-[#0286a3] dark:text-[#7fd1e8]">{metric.value}</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${strategy.gradient} p-3 rounded-lg shadow-md border-t-2 border-[#0286a3] dark:border-[#7fd1e8]`}
            >
              <div className="flex flex-col items-center text-center mb-2">
                <div className="bg-white dark:bg-gray-800/30 rounded-full w-8 h-8 flex items-center justify-center mb-1">
                  <span className="text-lg">{strategy.icon}</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {strategy.title}
                </h2>
              </div>
              <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                {strategy.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-[#0286a3] dark:text-[#7fd1e8] mr-1 mt-0.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-6 bg-gradient-to-r from-[#0286a3] to-[#015a70] dark:from-[#015a70] dark:to-[#01485a] p-4 rounded-lg text-center">
          <h3 className="text-base font-bold text-white mb-1">Ready for Competitive Excellence?</h3>
          <p className="text-xs text-[#b3e5f5] dark:text-[#7fd1e8] mb-2 max-w-md mx-auto">
            Join thousands of high-performers who transformed their results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <Link
              href="ai-interview"
              className="inline-flex items-center justify-center bg-white text-[#0286a3] dark:bg-gray-900 dark:text-[#7fd1e8] px-3 py-1 rounded-md font-medium text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              AI Mock Interview
            </Link>
            <Link
              href="https://trackode.in/programming-quizzes"
              className="inline-flex items-center justify-center bg-white text-[#0286a3] dark:bg-gray-900 dark:text-[#7fd1e8] px-3 py-1 rounded-md font-medium text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Start Dominating
            </Link>
          </div>
        </div>

        {/* Competitive Edge Stack */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
            The <span className="text-[#0286a3] dark:text-[#7fd1e8]">Competitive Edge</span> Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-1">Cognitive Acceleration</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Neuroscience-backed techniques to enhance learning speed and retention.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-1">Pattern Recognition</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Proprietary algorithms to identify recurring question patterns.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-[#0286a3] dark:text-[#7fd1e8] mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 mb-1">Performance Analytics</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Real-time dashboards tracking key performance indicators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;