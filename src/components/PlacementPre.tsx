"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FiBook, FiSearch } from "react-icons/fi";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow:
          "0 10px 20px rgba(0,0,0,0.12), 0 0 6px rgba(59,130,246,0.15)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-full max-w-[280px] mx-auto shadow-md"
    >
      <Link href={href} className="block relative group">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-medium px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-fit mb-2">
          {category}
        </span>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          <Link
            href={href}
            className="hover:text-blue-500 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            {title}
          </Link>
        </h3>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {progress}%
            </span>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
            >
              Start Learning
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

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
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Placement Preparation
            </span>{" "}
            <span className="relative inline-block">
              & Tips
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full ${
                  theme === "dark" ? "opacity-90" : "opacity-100"
                }`}
              ></span>
            </span>
          </h3>

          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
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
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search guides..."
                className="pl-10 w-full py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
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
                className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
          >
            <FiBook className="mx-auto text-3xl text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              No matching resources found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
