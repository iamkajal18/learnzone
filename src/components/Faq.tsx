"use client";
import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is LearnLive and who is it for?",
    answer:
      "LearnLive is an all-in-one learning platform designed for students preparing for competitive exams, placement drives, and career development. It offers live classes, structured roadmaps, guides, quizzes, and expert tips.",
  },
  {
    id: 2,
    question: "How does competition preparation work on LearnLive?",
    answer:
      "We provide structured guides, syllabus breakdowns, study plans, time management tips, and pressure-practice methods to prepare you holistically for exams like GATE, SSC, Banking, and more.",
  },
  {
    id: 3,
    question: "What kind of courses and roadmaps are available?",
    answer:
      "Our platform features 17+ regularly updated roadmaps covering technical skills like JavaScript, Python, C++, Data Structures, and placement prep topics like algorithms, verbal ability, and communication skills.",
  },
  {
    id: 4,
    question: "How can I join live classes?",
    answer:
      "Once enrolled in a course, you’ll receive live class schedules. You can join them via your dashboard. We use WebRTC-based live streaming for smooth, real-time sessions with instructors.",
  },
  {
    id: 5,
    question: "Can I track my learning progress?",
    answer:
      "Yes! You can track your progress for each guide or course with completion percentages, visual indicators, and completion milestones on your dashboard.",
  },
  {
    id: 6,
    question: "What should I do if I miss a live class?",
    answer:
      "Missed a session? No worries! All live sessions are recorded and uploaded so you can watch them anytime from your course dashboard.",
  },
  {
    id: 7,
    question: "Is there placement preparation support?",
    answer:
      "Absolutely. We offer mock interviews, resume building guides, aptitude preparation, group discussion tips, and curated career resources to help you excel in placements.",
  },
  {
    id: 8,
    question: "Can instructors publish their own content?",
    answer:
      "Yes. LearnLive allows verified instructors to publish course content, create quizzes, and host live classes. Instructors can also monitor student engagement.",
  },
  {
    id: 9,
    question: "How do I get started with LearnLive?",
    answer:
      "Just sign up with your email, browse the course library or competition guides, and click 'Start Learning'. You can explore both free and paid content.",
  },
  {
    id: 10,
    question: "Is my data safe on LearnLive?",
    answer:
      "Yes, we follow strict security standards to ensure your personal data, progress, and payment info remain safe and encrypted.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (faqId: number) => {
    setOpenIndex((prevId) => (prevId === faqId ? null : faqId));
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 ">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-2xl font-extrabold mb-4 tracking-tight">
    
            Frequently Asked Questions
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover everything you need to know about mastering your learning journey with LearnLive.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-4 py-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => toggleFAQ(faq.id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {faq.question}
              </h3>
              <span className="text-2xl text-indigo-600 font-bold transition-transform duration-300 ease-in-out">
                {openIndex === faq.id ? "−" : "+"}
              </span>
            </div>
            {openIndex === faq.id && (
              <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed animate-fade-in">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;