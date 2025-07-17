"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeContext";

const RoadmapList = ({ isParentLoaded }: { isParentLoaded: boolean }) => {
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const roadmapItems = [
    { name: "TCS NQT", slug: "tcs-nqt", icon: "/Tcs.jpeg", category: "exam" },
    {
      name: "GATE",
      slug: "gate",
      icon: "https://img.icons8.com/fluency/96/graduation-cap.png",
      category: "exam",
    },
    {
      name: "SSC CGL",
      slug: "ssc-cgl",
      icon: "/ssc_cgl.jpeg",
      category: "exam",
    },
    {
      name: "SSC CHSL",
      slug: "ssc-chsl",
      icon: "/SSC_chsl.png",
      category: "exam",
    },
    {
      name: "Banking",
      slug: "banking",
      icon: "/banking.jpeg",
      category: "exam",
    },
    {
      name: "C",
      slug: "c",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      category: "programming",
    },
    {
      name: "C++",
      slug: "cpp",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      category: "programming",
    },
    {
      name: "Go",
      slug: "go",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
      category: "programming",
    },
    {
      name: "Java",
      slug: "java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      category: "programming",
    },
    {
      name: "JavaScript",
      slug: "javascript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      category: "programming",
    },
    {
      name: "Kotlin",
      slug: "kotlin",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      category: "programming",
    },
    {
      name: "PHP",
      slug: "php",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      category: "programming",
    },
    {
      name: "Python",
      slug: "python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      category: "programming",
    },
    {
      name: "R",
      slug: "r",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
      category: "programming",
    },
    {
      name: "Ruby",
      slug: "ruby",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
      category: "programming",
    },
    {
      name: "Rust",
      slug: "rust",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
      category: "programming",
    },
    {
      name: "SQL",
      slug: "sql",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      category: "programming",
    },
  ];

  useEffect(() => {
    if (isParentLoaded) {
      const timer = setTimeout(() => setItemsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isParentLoaded]);

  const getCategoryColor = (category: string) => {
    return category === "exam"
      ? "from-emerald-400/20 to-blue-400/20"
      : "from-blue-400/20 to-purple-400/20";
  };

  const getCategoryAccent = (category: string) => {
    return category === "exam"
      ? "group-hover:border-emerald-400 dark:group-hover:border-emerald-500"
      : "group-hover:border-blue-400 dark:group-hover:border-blue-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {roadmapItems.map((item, index) => (
          <div
            key={item.slug}
            className={`group relative transition-all duration-700 ease-out ${
              itemsLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <Link
              href={`/roadmap/${item.slug}`}
              className={`block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 ${getCategoryAccent(
                item.category
              )} hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transform`}
              aria-label={`${item.name} roadmap`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(
                  item.category
                )} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
              />
              <div
                className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  item.category === "exam"
                    ? "bg-emerald-400/30"
                    : "bg-blue-400/30"
                } opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping`}
              />
              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-700 shadow-xs group-hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-600 group-hover:border-white dark:group-hover:border-gray-500 transform ${
                    itemsLoaded ? "scale-100 rotate-0" : "scale-90 rotate-6"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className="object-contain h-7 w-7 group-hover:scale-110 transition-transform duration-300"
                    width={28}
                    height={28}
                    loading={index < 6 ? "eager" : "lazy"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/default-icon.svg";
                    }}
                  />
                </div>
                <h3
                  className={`text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 ${
                    item.category === "exam"
                      ? "group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                      : "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </h3>
                <div
                  className={`w-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                    item.category === "exam" ? "bg-emerald-500" : "bg-blue-500"
                  }`}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoadMapHeader = ({ isParentLoaded }: { isParentLoaded: boolean }) => {
  const { theme } = useTheme();
  const [headerLoaded, setHeaderLoaded] = useState(false);

  useEffect(() => {
    if (isParentLoaded) {
      const timer = setTimeout(() => setHeaderLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isParentLoaded]);

  return (
    <div
      className={`max-w-4xl mx-auto text-center mb-12 relative transition-all duration-700 ease-out ${
        headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <h3
        className={`text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700 ease-out ${
          headerLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <span className="bg-gradient-to-r from-indigo-600  to-blue-700 bg-clip-text text-transparent">
          Comprehensive Learning
        </span>{" "}
        <span className="relative inline-block">
          Roadmaps
          <span
            className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full ${
              theme === "dark" ? "opacity-90" : ""
            } transition-all duration-700 ease-out ${
              headerLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          ></span>
        </span>
      </h3>
      <p
        className={`text-gray-600 dark:text-gray-300 text-base sm:text-lg mt-6 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
          headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        Structured paths to master various technologies and ace competitive
        exams with our carefully curated learning roadmaps
      </p>
      <div
        className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ease-out ${
          headerLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        {[
          {
            label: "17+ Roadmaps",
            color: "bg-emerald-500",
            shadow: "shadow-emerald-500/20",
          },
          {
            label: "Regular Updates",
            color: "bg-blue-500",
            shadow: "shadow-blue-500/20",
          },
          {
            label: "Free Access",
            color: "bg-blue-500",
            shadow: "shadow-blue-500/20",
          },
          {
            label: "Expert Curated",
            color: "bg-amber-500",
            shadow: "shadow-amber-500/20",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm ${
              item.shadow
            } border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 transform ${
              headerLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: `${500 + index * 100}ms` }}
          >
            <span
              className={`w-2 h-2 ${item.color} rounded-full mr-2 animate-pulse`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoadMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-opacity duration-700 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative z-10 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <RoadMapHeader isParentLoaded={isLoaded} />
        <RoadmapList isParentLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default RoadMap;
