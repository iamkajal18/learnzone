import React from 'react';
import Link from 'next/link';
const StudyPlan = () => {
  const strategies = [
    {
      title: "Competition Format",
      items: [
        "Research syllabus & scoring criteria",
        "Analyze past papers for patterns",
        "Understand time limits & question types"
      ],
      icon: "🔍"
    },
    {
      title: "Study Plan",
      items: [
        "Break topics into chunks",
        "Prioritize by difficulty",
        "Schedule revisions & mocks"
      ],
      icon: "📅"
    },
    {
      title: "Time Management",
      items: [
        "Use Pomodoro technique",
        "Focus on high-yield topics",
        "Practice with timed tests"
      ],
      icon: "⏱️"
    },
    {
      title: "Core Concepts",
      items: [
        "Master fundamentals first",
        "Use active learning methods",
        "Solve varied problems"
      ],
      icon: "🧠"
    },
    {
      title: "Pressure Practice",
      items: [
        "Take timed mock tests",
        "Analyze mistakes",
        "Develop question strategies"
      ],
      icon: "🔥"
    },
    {
      title: "Mental Stamina",
      items: [
        "Maintain sleep schedule",
        "Exercise regularly",
        "Practice mindfulness"
      ],
      icon: "💪"
    },
    {
      title: "Learn From Top",
      items: [
        "Study toppers' methods",
        "Join study groups",
        "Find mentors"
      ],
      icon: "🏆"
    },
    {
      title: "Stay Motivated",
      items: [
        "Set small milestones",
        "Visualize success",
        "Reward progress"
      ],
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-indigo-800 mb-2">
            Competition Success Guide
          </h1>
          <p className="text-lg text-gray-600">
            Essential strategies for peak performance
          </p>
        </div>

        {/* Dense Grid Layout */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strategies.map((strategy, index) => (
            <div 
              key={index}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-t-4 border-indigo-400"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <span className="text-2xl mb-2" aria-hidden="true">{strategy.icon}</span>
                <h2 className="text-lg font-semibold text-gray-800">{strategy.title}</h2>
              </div>
              <ul className="space-y-2 text-sm">
                {strategy.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-green-500 mr-1 mt-0.5">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compact CTA */}
       
<div className="mt-12 bg-indigo-700 text-white p-6 rounded-lg text-center">
 
  <h3 className="text-xl font-bold mb-2">Get Competition Ready</h3>
  <p className="mb-4 text-sm">Visit Trackode For Play Quiz</p>
  <a 
    href="https://trackode.in/programming-quizzes" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-block bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition-colors duration-150 text-sm"
  >
   Start Now
  </a>
</div>
      </div>
    </div>
  );
};

export default StudyPlan;