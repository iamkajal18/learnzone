"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext"; // Make sure to create this context

// Subcomponent: TestimonialHeader
function TestimonialHeader() {
  const { theme } = useTheme();
  
  return (
    <div className="text-center mb-12">
      <h3 className="text-3xl md:text-3xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-teal-400 to-cyan-600 bg-clip-text text-transparent">
          What Our
        </span>{" "}
        <span className="relative inline-block">
          Learners Say
          <span className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full ${
            theme === 'dark' ? 'opacity-90' : ''
          }`}></span>
        </span>
      </h3>
      <p className={`mt-4 text-lg max-w-2xl mx-auto ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Join thousands of satisfied learners who transformed their skills with us
      </p>
    </div>
  );
}

// Subcomponent: TestimonialCard
function TestimonialCard({ feedback, index }) {
  const { theme } = useTheme();

  return (
    <div 
      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border ${
        index % 2 === 0 
          ? theme === 'dark' 
            ? "bg-gradient-to-br from-gray-800 to-gray-900" 
            : "bg-gradient-to-br from-teal-50 to-cyan-50" 
          : theme === 'dark' 
            ? "bg-gray-800" 
            : "bg-white"
      } ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
      }`}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            src={
              feedback.image ||
              `https://ui-avatars.com/api/?name=${feedback.name.split(' ').join('+')}&background=00CFD1&color=fff`
            }
            alt={feedback.name}
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <p className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{feedback.name}</p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}>{feedback.role || feedback.email}</p>
        </div>
      </div>
      <div className="relative">
        <svg
          className={`absolute -top-6 -left-2 w-8 h-8 ${
            theme === 'dark' ? 'text-teal-900' : 'text-teal-200'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className={`pl-6 relative z-10 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {feedback.testimonial}
        </p>
        <div className="flex mt-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < (feedback.rating || 5) ? "text-yellow-400" : theme === 'dark' ? "text-gray-600" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

// Subcomponent: TestimonialCarousel
function TestimonialCarousel({ feedbacks }) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(feedbacks.length / itemsPerPage) - 1);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    } else if (touchStart - touchEnd < -50) {
      prevSlide();
    }
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
    <div 
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleFeedbacks.map((feedback, index) => (
          <TestimonialCard key={feedback._id || index} feedback={feedback} index={index} />
        ))}
      </div>

      {/* Navigation Arrows */}
      {feedbacks.length > itemsPerPage && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 ${
              theme === 'dark' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-500 hover:bg-teal-600'
            } text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl z-10`}
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 ${
              theme === 'dark' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-500 hover:bg-teal-600'
            } text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl z-10`}
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? theme === 'dark' 
                    ? "bg-teal-600 w-6" 
                    : "bg-teal-500 w-6" 
                  : theme === 'dark' 
                    ? "bg-gray-600" 
                    : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Testimonial Component
export default function Testimonial() {
  const { theme } = useTheme();
  const [feedbacks, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials
  const getFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/get-feedback");
      if (response.data.success) {
        setFeedback(response.data.feedbacks);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className={`py-16 px-4 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className={`h-10 rounded-full w-1/2 mx-auto mb-4 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>
            <div className={`h-4 rounded-full w-1/3 mx-auto ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className={`p-6 rounded-2xl shadow animate-pulse ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className="space-y-2">
                    <div className={`h-4 rounded-full w-24 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}></div>
                    <div className={`h-3 rounded-full w-16 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className={`h-3 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-3 rounded-full w-5/6 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-3 rounded-full w-2/3 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                </div>
                <div className="flex mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 px-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-teal-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <TestimonialHeader />
        {feedbacks.length > 0 ? (
          <TestimonialCarousel feedbacks={feedbacks} />
        ) : (
          <div className="text-center py-12">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              theme === 'dark' ? 'bg-teal-900' : 'bg-teal-100'
            }`}>
              <svg
                className="w-12 h-12 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              No testimonials yet
            </h3>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}