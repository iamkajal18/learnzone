"use client"
import React, { useState } from "react";

const NumericalAbility = () => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const topics = [
    {
      id: "arrangements-series",
      title: "Arrangements and Series",
      content: (
        <div className="space-y-6 overflow-auto max-w-4xl">
          {/* ... existing Arrangements and Series content ... */}
        </div>
      )
    },
    {
      id: "permutations-combinations",
      title: "Permutations & Combinations",
      content: (
        <div className="space-y-12">
          {/* ... existing P&C content ... */}
        </div>
      )
    },
    {
      id: "number-system",
      title: "Number System, LCM & HCF",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Number System, LCM & HCF</h3>
          {/* ... existing Number System content ... */}
        </div>
      )
    },
    {
      id: "percentages",
      title: "Percentages",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Percentages</h3>
          {/* ... existing Percentages content ... */}
        </div>
      )
    },
    {
      id: "allegations-mixtures",
      title: "Allegations and Mixtures",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Allegations and Mixtures</h3>
          <p className="mb-4">Rules of alligation for solving mixture problems.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "probability",
      title: "Probability",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Probability</h3>
          {/* ... existing Probability content ... */}
        </div>
      )
    },
    {
      id: "ratios-proportion-averages",
      title: "Ratios, Proportion, and Averages",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Ratios, Proportion, and Averages</h3>
          <p className="mb-4">Understanding relationships between quantities.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "reasoning",
      title: "Reasoning",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Reasoning</h3>
          <p className="mb-4">Logical and analytical reasoning problems.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "work-time",
      title: "Work and Time",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Work and Time</h3>
          <p className="mb-4">Problems involving work efficiency and time management.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "speed-time-distance",
      title: "Speed Time and Distance",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Speed Time and Distance</h3>
          <p className="mb-4">Relationship between speed, time and distance.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "geometry",
      title: "Geometry",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Geometry</h3>
          <p className="mb-4">Properties of shapes, angles, and spatial relationships.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "divisibility",
      title: "Divisibility",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Divisibility</h3>
          <p className="mb-4">Rules and problems related to number divisibility.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "profit-loss",
      title: "Profit and Loss",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Profit and Loss</h3>
          <p className="mb-4">Calculating profit, loss, and related percentages.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "ages",
      title: "Ages",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Ages</h3>
          <p className="mb-4">Problems involving age relationships and calculations.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "clocks-calendar",
      title: "Clocks & Calendar",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Clocks & Calendar</h3>
          <p className="mb-4">Time and calendar related problems.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "series-progressions",
      title: "Series and Progressions",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Series and Progressions</h3>
          <p className="mb-4">Arithmetic and geometric progressions.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "equations",
      title: "Equations",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Equations</h3>
          <p className="mb-4">Linear and quadratic equation solving.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "averages",
      title: "Averages",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Averages</h3>
          <p className="mb-4">Mean, median, mode and weighted averages.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "area-shapes-perimeter",
      title: "Area, Shapes & Perimeter",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Area, Shapes & Perimeter</h3>
          <p className="mb-4">Calculations involving area and perimeter.</p>
          {/* Add detailed content here */}
        </div>
      )
    },
    {
      id: "numbers-decimal-fractions",
      title: "Numbers & Decimal Fractions",
      content: (
        <div>
          <h3 className="text-xl font-bold mb-4">Numbers & Decimal Fractions</h3>
          <p className="mb-4">Operations with decimal numbers and fractions.</p>
          {/* Add detailed content here */}
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700 mb-4">📚 Topics</h2>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full text-left p-2 rounded-md hover:bg-blue-50 transition-colors ${
                  activeTopic === topic.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                }`}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {activeTopic ? (
          <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
            {topics.find(t => t.id === activeTopic)?.content}
            <div className="mt-8 pt-4 border-t">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Test Yourself on This Topic
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Welcome to Numerical Ability</h2>
            <p className="text-gray-700 mb-6">
              Select a topic from the sidebar to explore detailed content, examples, and practice questions.
            </p>
            <div className="max-w-md mx-auto">
              <img 
                src="https://img.freepik.com/free-vector/math-background_23-2148146940.jpg" 
                alt="Math illustration" 
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumericalAbility;