"use client";
import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is LearnLive and who is it for?",
    answer:
      "LearnLive is an all-in-one learning platform designed for students preparing for competitive exams, placement drives, and career development. It offers live classes, structured roadmaps, guides, quizzes, and expert tips.",
    icon: "🎓"
  },
  {
    id: 2,
    question: "How does competition preparation work on LearnLive?",
    answer:
      "We provide structured guides, syllabus breakdowns, study plans, time management tips, and pressure-practice methods to prepare you holistically for exams like GATE, SSC, Banking, and more.",
    icon: "🏆"
  },
  {
    id: 3,
    question: "What kind of courses and roadmaps are available?",
    answer:
      "Our platform features 17+ regularly updated roadmaps covering technical skills like JavaScript, Python, C++, Data Structures, and placement prep topics like algorithms, verbal ability, and communication skills.",
    icon: "🗺️"
  },
  {
    id: 5,
    question: "Can I track my learning progress?",
    answer:
      "Yes! You can track your progress for each guide or course with completion percentages, visual indicators, and completion milestones on your dashboard.",
    icon: "📊"
  },
  {
    id: 7,
    question: "Is there placement preparation support?",
    answer:
      "Absolutely. We offer mock interviews, resume building guides, aptitude preparation, group discussion tips, and curated career resources to help you excel in placements.",
    icon: "💼"
  },
  {
    id: 8,
    question: "Can instructors publish their own content?",
    answer:
      "Yes. LearnLive allows verified instructors to publish course content, create quizzes, and host live classes. Instructors can also monitor student engagement.",
    icon: "👨‍🏫"
  },
  {
    id: 9,
    question: "How do I get started with LearnLive?",
    answer:
      "Just sign up with your email, browse the course library or competition guides, and click 'Start Learning'. You can explore both free and paid content.",
    icon: "🚀"
  },
  {
    id: 10,
    question: "Is my data safe on LearnLive?",
    answer:
      "Yes, we follow strict security standards to ensure your personal data, progress, and payment info remain safe and encrypted.",
    icon: "🔒"
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (faqId: number) => {
    setOpenIndex((prevId) => (prevId === faqId ? null : faqId));
  };

  return (
    <div className="relative py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-200 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#00cfd1] to-[#0286a3] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#0286a3] to-[#00cfd1] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full mb-4">
            <span className="text-white text-xl">❓</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00cfd1] to-[#0286a3]">
              Frequently Asked
            </span>{" "}
            Questions
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Discover everything you need to know about mastering your learning journey with LearnLive.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                openIndex === faq.id ? 'ring-1 ring-[#00cfd1]/30 dark:ring-[#00cfd1]/50' : ''
              }`}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="relative p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      openIndex === faq.id 
                        ? 'bg-gradient-to-r from-[#00cfd1] to-[#0286a3]' 
                        : 'bg-gray-100 dark:bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-[#00cfd1] group-hover:to-[#0286a3]'
                    }`}>
                      <span className={`text-sm transition-all duration-300 ${
                        openIndex === faq.id ? 'text-white' : 'group-hover:text-white'
                      }`}>
                        {faq.icon}
                      </span>
                    </div>
                    
                    {/* Question */}
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Toggle Button */}
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === faq.id 
                      ? 'bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rotate-45' 
                      : 'bg-gray-100 dark:bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-[#00cfd1] group-hover:to-[#0286a3]'
                  }`}>
                    <span className={`text-xs font-bold transition-all duration-300 ${
                      openIndex === faq.id ? 'text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-white'
                    }`}>
                      +
                    </span>
                  </div>
                </div>
                
                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === faq.id ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
<div className="text-center mt-8">
  <a
    href="/support"
    className="text-xs font-medium text-[#0286a3] dark:text-[#00cfd1] hover:text-[#00cfd1] dark:hover:text-[#0286a3] transition-colors duration-300"
  >
    Contact support →
  </a>
</div>

      </div>
    </div>
  );
}

export default Faq;