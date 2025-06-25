"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample data for guides
const guidesData = [
  {
    id: 1,
    title: "Verbal Ability",
    image: "/Verbal.png",
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
    image: "/images/DataStructures.png",
    alt: "Data Structures Guide",
    href: "/guides/dsa",
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
    image: "/images/ResumeBuilding.png",
    alt: "Resume Guide",
    href: "/guides/resume",
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
    image: "/images/SoftSkills.png",
    alt: "Soft Skills Guide",
    href: "/guides/communication",
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
    image: "Algorithum.png",
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
    image: "/images/GroupDiscussion.png",
    alt: "Group Discussion Guide",
    href: "/guides/groupdiscussion",
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
    image: "/images/Reasoning.png",
    alt: "Reasoning Ability Guide",
    href: "/guides/reasoning",
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
    image: "/images/NumericalAbility.jpg",
    alt: "Numerical Ability Guide",
    href: "/guides/numerical",
    progress: 45,
    duration: "6h",
    category: "Placement Prep",
    description: "Master numbers with top analytical skills!",
    lessons: 16,
    rating: 4.3,
    reviews: 130,
  },
];

// SearchBar Component
interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e:any) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search learning guides..."
        className="w-full px-5 py-3 text-base bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 dark:text-gray-400">
        🔍
      </span>
    </div>
  );
};

// CategoryFilter Component
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}
const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            selectedCategory === category
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// SortFilter Component
interface SortFilterProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}
const SortFilter = ({ sortOption, onSortChange }: SortFilterProps) => {
  return (
    <div className="flex justify-end mb-6">
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="title">Sort by Title</option>
        <option value="progress">Sort by Progress</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
  );
};

// ProgressTracker Component
interface ProgressTrackerProps {
  overallProgress: number;
  completedGuides: number;
  totalGuides: number;
}
const ProgressTracker = ({ overallProgress, completedGuides, totalGuides }: ProgressTrackerProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-10">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Your Learning Progress
      </h2>
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
        <span>
          {completedGuides}/{totalGuides} Guides Completed
        </span>
        <span>{overallProgress}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

// CourseCard Component
interface CourseCardProps {
  title: string;
  image: string;
  alt: string;
  href: string;
  progress: number;
  duration: string;
  rating: number;
  reviews: number;
}

const CourseCard = ({
  title,
  image,
  alt,
  href,
  progress,
  duration,
  rating,
  reviews,
}: CourseCardProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={href}>
        <div className="relative w-full h-40 overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={alt}
            className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
          <Link
            href={href}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {title}
          </Link>
        </h3>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
          <span>{duration}</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={`text-base ${
                  i < Math.round(rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                }`}
              >
                ★
              </span>
            ))}
          <span className="ml-2">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>
      </div>
    </div>
  );
};

// GuidePreview Component
interface GuidePreviewProps {
  title: string;
  description: string;
  href: string;
  lessons: number;
}

const GuidePreview = ({ title, description, href, lessons }: GuidePreviewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {lessons} Lessons
        </span>
        <Link
          href={href}
          className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
};

// QuickLink Component
interface QuickLinkProps {
  title: string;
  href: string;
}

const QuickLink = ({ title, href }: QuickLinkProps) => (
  <Link
    href={href}
    className="block px-5 py-2.5 text-sm font-medium text-purple-600 dark:text-purple-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
  >
    {title}
  </Link>
);

// Main LearningHub Component
const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title");

  const categories = [
    "All",
    "Placement Prep",
    "Technical Skills",
    "Soft Skills",
    "Career Development",
    "Coding",
  ];

  const quickLinks = [
    { title: "Practice Quizzes", href: "/quizzes" },
    { title: "Mock Interviews", href: "/interviews" },
    { title: "Community Forum", href: "/forum" },
    { title: "Career Resources", href: "/resources" },
  ];

  const filteredAndSortedGuides = useMemo(() => {
    let filtered = guidesData.filter(
      (guide) =>
        (selectedCategory === "All" || guide.category === selectedCategory) &&
        guide.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortOption === "progress") return b.progress - a.progress;
      if (sortOption === "rating") return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, searchQuery, sortOption]);

  const overallProgress = Math.round(
    guidesData.reduce((sum, guide) => sum + guide.progress, 0) / guidesData.length
  );
  const completedGuides = guidesData.filter((guide) => guide.progress === 100).length;
  const totalGuides = guidesData.length;

  return (
    <section className="pt-16 pb-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-3xl font-extrabold mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">📚</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
             Placement and Preparation Tips
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 maxixon-w-2xl mx-auto">
            Explore curated resources to excel in placement prep, technical skills, and career development.
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} />
        <ProgressTracker
          overallProgress={overallProgress}
          completedGuides={completedGuides}
          totalGuides={totalGuides}
        />
        <div className="flex justify-between items-center mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <SortFilter sortOption={sortOption} onSortChange={setSortOption} />
        </div>

        {filteredAndSortedGuides.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            No guides found. Try adjusting your search or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedGuides.map((guide) => (
              <CourseCard key={guide.id} {...guide} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Featured Learning Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedGuides.slice(0, 2).map((guide) => (
              <GuidePreview key={guide.id} {...guide} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
            {quickLinks.map((link, index) => (
              <QuickLink key={index} {...link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningHub;