"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const guidesData = [
  {
    id: 1,
    title: "Verbal Ability",
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
  },
  {
    id: 2,
    title: "Data Structures",
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
  },
  {
    id: 3,
    title: "Resume Building",
    image: "/resume.jpeg",
    alt: "Resume Guide",
    href: "/resume",
    progress: 80,
    duration: "2h",
    category: "Career Development",
    description: "Craft a resume that stands out.",
    lessons: 8,
    rating: 4.3,
    reviews: 90,
  },
  {
    id: 4,
    title: "Communication Skills",
    image: "/communication.jpeg",
    alt: "Communication Guide",
    href: "/communication",
    progress: 40,
    duration: "3h",
    category: "Soft Skills",
    description: "Excel in professional communication.",
    lessons: 10,
    rating: 4.6,
    reviews: 150,
  },
  {
    id: 5,
    title: "Algorithms",
    image: "/algo.png",
    alt: "Algorithms Guide",
    href: "/algorithm",
    progress: 10,
    duration: "8h",
    category: "Coding",
    description: "Optimize solutions with algorithms.",
    lessons: 15,
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 6,
    title: "Group Discussion",
    image: "/group.jpeg",
    alt: "Group Discussion Guide",
    href: "/groupdiscussion",
    progress: 50,
    duration: "2h",
    category: "Placement Prep",
    description: "Lead effectively in group discussions.",
    lessons: 6,
    rating: 4.4,
    reviews: 100,
  },
  {
    id: 7,
    title: "Reasoning Ability",
    image: "/reasoning.png",
    alt: "Reasoning Ability Guide",
    href: "/reasoning",
    progress: 30,
    duration: "5h",
    category: "Placement Prep",
    description: "Crush reasoning challenges with sharp logic!",
    lessons: 14,
    rating: 4.2,
    reviews: 110,
  },
  {
    id: 8,
    title: "Numerical Ability",
    image: "/numerical.jpeg",
    alt: "Numerical Ability Guide",
    href: "/numerical",
    progress: 45,
    duration: "6h",
    category: "Placement Prep",
    description: "Master numbers with top analytical skills!",
    lessons: 16,
    rating: 4.3,
    reviews: 130,
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
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
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
  reviews 
}: {
  title: string;
  image: string;
  alt: string;
  href: string;
  progress: number;
  duration: string;
  rating: number;
  reviews: number;
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
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1.5 line-clamp-2">
          <Link href={href} className="hover:text-[#0286a3] dark:hover:text-[#06b6d4] transition-colors">
            {title}
          </Link>
        </h3>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{duration}</span>
          <span className="text-[#0286a3] font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-2">
          <div
            className="bg-gradient-to-r from-[#0286a3] to-[#06b6d4] h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center text-xs">
          <div className="flex text-amber-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.round(rating) ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>
      </div>
    </div>
  );
};

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("title");

  const categories = ["All", "Placement Prep", "Technical Skills", "Soft Skills", "Career Development", "Coding"];

  const filteredAndSortedGuides = useMemo(() => {
    let filtered = guidesData.filter(
      (guide) => selectedCategory === "All" || guide.category === selectedCategory
    );

    return filtered.sort((a, b) => {
      if (sortOption === "progress") return b.progress - a.progress;
      if (sortOption === "rating") return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, sortOption]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            <span className="text-[#0286a3]">Placement and</span>{' '}
            <span className="text-gray-800 dark:text-gray-200">Preparation Tips</span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Curated resources to excel in placements and career development
          </p>
        </div>

        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex justify-end">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1.5"
            >
              <option value="title">Sort by Title</option>
              <option value="progress">Sort by Progress</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {filteredAndSortedGuides.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No matching guides found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndSortedGuides.map((guide) => (
              <CourseCard key={guide.id} {...guide} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
            {[
              { title: "Quizzes", href: "/quizzes" },
              { title: "Interviews", href: "/interviews" },
              { title: "Forum", href: "/forum" },
              { title: "Resources", href: "/resources" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-center text-[#0286a3] dark:text-[#06b6d4] bg-[#0286a3]/10 dark:bg-[#0286a3]/20 rounded-md py-2 px-3 hover:bg-[#0286a3]/20 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;