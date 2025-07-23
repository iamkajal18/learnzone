"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const guidesData = [
  {
    id: 1,
    title: "Verbal Ability Mastery",
    image: "/verbal.jpg",
    alt: "Verbal Ability Guide",
    href: "/verbal",
    progress: 70,
    category: "Placement Prep",
    description: "Ace verbal tests with strong communication skills.",
    featured: true,
  },
  {
    id: 2,
    title: "Data Structures Deep Dive",
    image: "/Data structure.jpeg",
    alt: "Data Structures Guide",
    href: "/datastructure",
    progress: 25,
    category: "Technical Skills",
    description: "Master data structures for coding interviews.",
    featured: true,
  },
  {
    id: 3,
    title: "Resume Building Workshop",
    image: "/Resume.jpeg",
    alt: "Resume Guide",
    href: "/resume",
    progress: 80,
    category: "Career Development",
    description: "Craft a resume that stands out.",
  },
  {
    id: 4,
    title: "Effective Communication",
    image: "/communication.jpeg",
    alt: "Communication Guide",
    href: "/communication",
    progress: 40,
    category: "Soft Skills",
    description: "Excel in professional communication.",
  },
  {
    id: 5,
    title: "Algorithmic Thinking",
    image: "/Algo.png",
    alt: "Algorithms Guide",
    href: "/algorithm",
    progress: 10,
    category: "Coding",
    description: "Optimize solutions with algorithms.",
  },
  {
    id: 6,
    title: "Group Discussion Strategies",
    image: "/Group.jpeg",
    alt: "Group Discussion Guide",
    href: "/groupdiscussion",
    progress: 50,
    category: "Placement Prep",
    description: "Lead effectively in group discussions.",
  },
  {
    id: 7,
    title: "Logical Reasoning Pro",
    image: "/Reasoning.png",
    alt: "Reasoning Ability Guide",
    href: "/reasoning",
    progress: 30,
    category: "Placement Prep",
    description: "Crush reasoning challenges with sharp logic!",
  },
  {
    id: 8,
    title: "Numerical Aptitude",
    image: "/NumericalAbility.jpg",
    alt: "Numerical Ability Guide",
    href: "/numerical",
    progress: 45,
    category: "Placement Prep",
    description: "Master numbers with top analytical skills!",
  },
];

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
            selectedCategory === category
              ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

const CourseCard = ({
  title,
  image,
  alt,
  href,
  progress,
  category,
  description,
}: {
  title: string;
  image: string;
  alt: string;
  href: string;
  progress: number;
  category?: string;
  description?: string;
}) => {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(0,0,0,0.12), 0 0 6px rgba(59,130,246,0.15)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full max-w-[240px] mx-auto shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-semibold px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Progress</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{progress}%</span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-1.5 rounded-full"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Start Learning
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Placement Prep",
    "Technical Skills",
    "Soft Skills",
    "Career Development",
    "Coding",
  ];

  const filteredAndSortedGuides = useMemo(() => {
    let filtered = guidesData.filter((guide) => {
      const matchesCategory =
        selectedCategory === "All" || guide.category === selectedCategory;
      const matchesSearch =
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortOption === "progress") return b.progress - a.progress;
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, sortOption, searchQuery]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Placement Preparation
            </span>{" "}
            <span className="relative inline-block">
              & Tips
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-90"></span>
            </span>
          </h3>

          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-sm">
            Master essential skills with our curated learning paths
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative max-w-md w-full"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search guides..."
                className="pl-10 w-full py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Sort by:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                <option value="title">Title</option>
                <option value="progress">Progress</option>
              </select>
            </motion.div>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {filteredAndSortedGuides.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 mx-auto text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              No matching resources found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAndSortedGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard {...guide} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;