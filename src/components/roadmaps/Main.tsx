"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeContext';

const RoadmapList = () => {
  const roadmapItems = [
    { name: 'TCS NQT', slug: 'tcs-nqt', icon: '/Tcs.jpeg' },
    { name: 'GATE', slug: 'gate', icon: 'https://img.icons8.com/fluency/96/graduation-cap.png' },
    { name: 'SSC CGL', slug: 'ssc-cgl', icon: '/ssc_cgl.jpeg' },
    { name: 'SSC CHSL', slug: 'ssc-chsl', icon: '/SSC_chsl.png'},
    { name: 'Banking', slug: 'banking', icon: '/banking.jpeg' },
    { name: 'C', slug: 'c', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', slug: 'cpp', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Go', slug: 'go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    { name: 'Java', slug: 'java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', slug: 'javascript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Kotlin', slug: 'kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    { name: 'PHP', slug: 'php', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Python', slug: 'python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'R', slug: 'r', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
    { name: 'Ruby', slug: 'ruby', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
    { name: 'Rust', slug: 'rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
    { name: 'SQL', slug: 'sql', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-8 mb-12"> {/* Increased mt-5 to mt-8 and added mb-12 */}
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {roadmapItems.map((item, index) => (
          <div
            key={item.slug}
            className="group relative"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <Link
              href={`/roadmap/${item.slug}`}
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-inner group-hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600">
                  <Image
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className="object-contain h-7 w-7 group-hover:scale-105 transition-transform duration-200"
                    width={28}
                    height={28}
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.name}
                </h3>
                <div className="w-5 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"></div>
              </div>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_-3px_rgba(96,165,250,0.3)]"></div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

function RoadMap() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="relative inline-block">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-teal-400 dark:text-teal-300">Comprehensive Learning </span>
            <span className="text-black dark:text-gray-100">Roadmaps</span>
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-4 mb-6 max-w-2xl mx-auto">
          Structured paths to master various technologies and ace competitive exams
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center px-2 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            <span className="text-gray-700 dark:text-gray-300">17+ Roadmaps</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            <span className="text-gray-700 dark:text-gray-300">Regular Updates</span>
          </div>
          <div className="flex items-center px-2 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
            <span className="text-gray-700 dark:text-gray-300">Free Access</span>
          </div>
        </div>
      </div>
      <RoadmapList />
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default RoadMap;