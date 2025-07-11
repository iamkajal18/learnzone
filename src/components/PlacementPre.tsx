"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiBook, FiAward, FiClock, FiStar, FiTrendingUp, FiFilter, FiSearch } from "react-icons/fi";

const guidesData = [
  {
    id: 1,
    title: "Verbal Ability Mastery",
    image: "/verbal.jpg",
    alt: "Verbal Ability Guide",
    href: "/verbal",
    progress: 60,
    duration: "4h",
    category: "Placement Prep",
    description: "Ace verbal tests with strong communication skills.",
    lessons: 12,
    rating: 4.5,
    reviews: 120,
    featured: true
  },
  {
    id: 2,
    title: "Data Structures Deep Dive",
    image: "/Data structure.jpeg",
    alt: "Data Structures Guide",
    href: "/datastructure",
    progress: 25,
    duration: "10h",
    category: "Technical Skills",
    description: "Master data structures for coding interviews.",
    lessons: 20,
    rating: 4.8,
    reviews: 200,
    featured: true
  },
  {
    id: 3,
    title: "Resume Building Workshop",
    image: "/Resume.jpeg",
    alt: "Resume Guide",
    href: "/resume",
    progress: 80,
    duration: "2h",
    category: "Career Development",
    description: "Craft a resume that stands out.",
    lessons: 8,
    rating: 4.3,
    reviews: 90
  },
  {
    id: 4,
    title: "Effective Communication",
    image: "/communication.jpeg",
    alt: "Communication Guide",
    href: "/communication",
    progress: 40,
    duration: "3h",
    category: "Soft Skills",
    description: "Excel in professional communication.",
    lessons: 10,
    rating: 4.6,
    reviews: 150
  },
  {
    id: 5,
    title: "Algorithmic Thinking",
    image: "/Algo.png",
    alt: "Algorithms Guide",
    href: "/algorithm",
    progress: 10,
    duration: "8h",
    category: "Coding",
    description: "Optimize solutions with algorithms.",
    lessons: 15,
    rating: 4.7,
    reviews: 180
  },
  {
    id: 6,
    title: "Group Discussion Strategies",
    image: "/Group.jpeg",
    alt: "Group Discussion Guide",
    href: "/groupdiscussion",
    progress: 50,
    duration: "2h",
    category: "Placement Prep",
    description: "Lead effectively in group discussions.",
    lessons: 6,
    rating: 4.4,
    reviews: 100
  },
  {
    id: 7,
    title: "Logical Reasoning Pro",
    image: "/Reasoning.png",
    alt: "Reasoning Ability Guide",
    href: "/reasoning",
    progress: 30,
    duration: "5h",
    category: "Placement Prep",
    description: "Crush reasoning challenges with sharp logic!",
    lessons: 14,
    rating: 4.2,
    reviews: 110
  },
  {
    id: 8,
    title: "Numerical Aptitude",
    image: "/NumericalAbility.jpg",
    alt: "Numerical Ability Guide",
    href: "/numerical",
    progress: 45,
    duration: "6h",
    category: "Placement Prep",
    description: "Master numbers with top analytical skills!",
    lessons: 16,
    rating: 4.3,
    reviews: 130
  },
];

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedCategory === category
              ? "bg-[#0286a3] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {category}
        </button>
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
  duration, 
  rating, 
  reviews,
  category,
  description,
  lessons
}: {
  title: string;
  image: string;
  alt: string;
  href: string;
  progress: number;
  duration: string;
  rating: number;
  reviews: number;
  category?: string;
  description?: string;
  lessons?: number;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={href} className="block">
        <div className="relative aspect-video">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-[#0286a3]/10 dark:bg-[#0286a3]/20 text-[#0286a3] dark:text-[#06b6d4] rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <FiClock className="mr-1" /> {duration}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          <Link href={href} className="hover:text-[#0286a3] dark:hover:text-[#06b6d4] transition-colors">
            {title}
          </Link>
        </h3>
        
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress: {progress}%</span>
            <span>{lessons} lessons</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[#0286a3] to-[#06b6d4] h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex text-amber-400 mr-2">
              <FiStar className="fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Placement Prep", "Technical Skills", "Soft Skills", "Career Development", "Coding"];

  const filteredAndSortedGuides = useMemo(() => {
    let filtered = guidesData.filter(guide => {
      const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
      const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guide.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortOption === "progress") return b.progress - a.progress;
      if (sortOption === "rating") return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, sortOption, searchQuery]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-teal-400 dark:text-teal-300">Placement Prepartion</span>
            <span className="text-black dark:text-gray-100"> & Tips </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Comprehensive guides for career development and technical skills
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search guides..."
                className="pl-10 w-full py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[#0286a3] focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0286a3]"
              >
                <option value="title">Title</option>
                <option value="progress">Progress</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {filteredAndSortedGuides.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <FiBook className="mx-auto text-3xl text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              No matching resources found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedGuides.map((guide) => (
              <CourseCard key={guide.id} {...guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;