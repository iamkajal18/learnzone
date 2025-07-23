"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

function TestimonialHeader() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        <span className="relative inline-block">
           <h3 className="text-3xl md:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600  to-blue-700 bg-clip-text text-transparent">
              Voices of Our
            </span>{" "}
            <span className="relative inline-block">
               Learners
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full ${
                  theme === "dark" ? "opacity-90" : "opacity-100"
                }`}
              ></span>
            </span>
          </h3>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500 rounded-full ${
              theme === "dark" ? "opacity-90" : "opacity-100"
            }`}
            style={{ originX: 0 }}
          />
        </span>
      </h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-4 text-xl max-w-2xl mx-auto leading-relaxed ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Join <span className="font-semibold text-blue-500">10,000+</span> learners who transformed their careers with our courses
      </motion.p>
    </motion.div>
  );
}

function TestimonialCard({ feedback = {}, index }) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const userName = feedback.name || "Anonymous";
  const userRole = feedback.role || feedback.email || "User";
  const testimonialText = feedback.testimonial || "";
  const rating = feedback.rating || 5;
  const course = feedback.course;
  const date = feedback.date || new Date().toISOString();

  const avatarUrl = feedback.image || 
    `https://ui-avatars.com/api/?name=${userName.split(" ").join("+")}&background=00CFD1&color=fff&size=256&font-size=0.4&rounded=true&bold=true`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`p-6 rounded-2xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
      } border shadow-sm hover:shadow-xl relative overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
      />
      
      <div className="flex items-start space-x-4 mb-4 relative z-10">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <motion.div whileHover={{ rotate: 5 }} className="relative">
            <img
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
              src={avatarUrl}
              alt={userName}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${userName.split(" ").join("+")}&background=00CFD1&color=fff`;
              }}
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </motion.div>
        <div>
          <p className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {userName}
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
            {userRole}
          </p>
          {course && (
            <p className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
              theme === "dark" ? "bg-gray-700 text-purple-300" : "bg-blue-50 text-blue-700"
            }`}>
              {course}
            </p>
          )}
        </div>
      </div>
      <div className="relative z-10">
        <svg
          className={`absolute -top-6 -left-2 w-8 h-8 ${
            theme === "dark" ? "text-gray-700" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`pl-6 relative z-10 text-lg italic ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          "{testimonialText}"
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center mt-6 justify-between"
        >
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                whileHover={{ scale: 1.2 }}
                className={`w-6 h-6 ${
                  i < rating
                    ? "text-yellow-400"
                    : theme === "dark"
                    ? "text-gray-600"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-xs px-3 py-1 rounded-full ${
              theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TestimonialCarousel({ feedbacks = [] }) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(feedbacks.length / itemsPerPage) - 1);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [feedbacks, currentIndex, isAutoPlaying]);

  const startIndex = currentIndex * itemsPerPage;
  const visibleFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);

  while (visibleFeedbacks.length < itemsPerPage) {
    visibleFeedbacks.push({});
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleFeedbacks.map((feedback, index) => (
            <TestimonialCard
              key={feedback._id || index}
              feedback={feedback}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {feedbacks.length > itemsPerPage && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:bg-gray-100"
            } text-blue-500 p-3 rounded-full shadow-lg z-10 border ${
              theme === "dark" ? "border-gray-600" : "border-gray-200"
            }`}
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
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
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:bg-gray-100"
            } text-blue-500 p-3 rounded-full shadow-lg z-10 border ${
              theme === "dark" ? "border-gray-600" : "border-gray-200"
            }`}
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
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
          </motion.button>
        </>
      )}

      {feedbacks.length > itemsPerPage && (
        <div className="flex justify-center mt-10 space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? theme === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 w-8"
                  : theme === "dark"
                  ? "bg-gray-600 w-4"
                  : "bg-gray-300 w-4"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Testimonial() {
  const { theme } = useTheme();
  const [feedbacks, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/get-feedback");
      if (response.data.success) {
        const sortedFeedbacks = response.data.feedbacks.sort((a, b) => {
          if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
          }
          return (b.rating || 0) - (a.rating || 0);
        });
        setFeedback(sortedFeedbacks);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setError("Failed to load testimonials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`h-12 rounded-full w-1/2 mx-auto mb-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`h-5 rounded-full w-1/3 mx-auto ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-6 rounded-2xl shadow ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div className="space-y-2 flex-1">
                    <div
                      className={`h-5 rounded-full w-3/4 ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-3 rounded-full w-1/2 ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-3 rounded-full w-1/4 mt-2 ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 rounded-full ${
                        i === 3 ? "w-5/6" : "w-full"
                      } ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="flex mt-6 justify-between">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div
                    className={`w-16 h-6 rounded-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </motion.div>
          <h3 className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Oops! Something went wrong
          </h3>
          <p className={`mb-6 text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {error}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getFeedback}
            className={`px-6 py-3 rounded-lg font-medium ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-colors`}
          >
            Try Again
          </motion.button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto">
        <TestimonialHeader />
        {feedbacks.length > 0 ? (
          <TestimonialCarousel feedbacks={feedbacks} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <svg
                className="w-12 h-12 text-blue-500"
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
            </motion.div>
            <h3 className={`text-2xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              No testimonials yet
            </h3>
            <p className={`mb-6 text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Be the first to share your experience!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors`}
            >
              Share Your Story
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}