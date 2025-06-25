"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Subcomponent: TestimonialHeader
function TestimonialHeader() {
  return (
    <div className="text-center mb-4">
      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 to-teal-400 bg-clip-text text-transparent">
          What
        </span>{" "}
        Our Learners Say
      </h3>
    </div>
  );
}

// Subcomponent: TestimonialCarousel
function TestimonialCarousel({ feedbacks }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel navigation for 3 items at a time
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, Math.ceil(feedbacks.length / itemsPerPage) - 1);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // Auto-scroll (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks, currentIndex]);

  // Calculate the testimonials to display
  const startIndex = currentIndex * itemsPerPage;
  const visibleFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);

  return (
    
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleFeedbacks.map((feedback, key) => (
          <div
            key={key}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center space-x-3 mb-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={
                  feedback.image ||
                  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                }
                alt="User profile"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{feedback.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feedback.role || "Learner"}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
              {feedback.testimonial}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {feedbacks.length > itemsPerPage && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700 transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700 transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots for navigation */}
      {feedbacks.length > itemsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
              } transition-all duration-300`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Testimonial Component
export default function Testimonial() {
  const [feedbacks, setFeedback] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch testimonials
  const getFeedback = async () => {
    try {
      const response = await axios.get("/api/get-feedback");
      if (response.data.success) {
        setFeedback(response.data.feedbacks);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className={`py-8 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {darkMode ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          </button>
        </div>

        <TestimonialHeader />
        <TestimonialCarousel feedbacks={feedbacks} />
      </div>
    </div>
  );
}