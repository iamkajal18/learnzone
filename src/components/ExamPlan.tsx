'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function ExamPlan() {
  const router = useRouter();
  const [selectedNoteMethod, setSelectedNoteMethod] = useState<string | null>(null);
  const [downloadedTemplates, setDownloadedTemplates] = useState<string[]>([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleTemplateClick = (templateName: string) => {
    if (!downloadedTemplates.includes(templateName)) {
      setDownloadedTemplates([...downloadedTemplates, templateName]);
    }
    // In a real app, you would trigger the actual download here
    console.log(`Downloading ${templateName}`);
  };

  const handleDownloadAll = () => {
    setShowDownloadModal(true);
    // Simulate download completion
    setTimeout(() => setShowDownloadModal(false), 3000);
  };

  const templates = [
    {
      name: "3-Day Plan Worksheet",
      desc: "Printable schedule with time blocks",
      emoji: "🗓️"
    },
    {
      name: "Exam Weight Calculator",
      desc: "Prioritize by topic importance",
      emoji: "⚖️"
    },
    {
      name: "Anki Flashcard Template",
      desc: "Pre-formatted deck for quick setup",
      emoji: "🗂️"
    },
    {
      name: "Professor Question Predictor",
      desc: "Worksheet to anticipate test questions",
      emoji: "🔮"
    }
  ];

  const dayPlans = [
    {
      day: "Day 1",
      tasks: [
        "Identify 3-5 key topics",
        "Create summary sheets",
        "Watch review videos"
      ]
    },
    {
      day: "Day 2",
      tasks: [
        "Practice past exams",
        "Join study group",
        "Anki flashcards"
      ]
    },
    {
      day: "Day 3",
      tasks: [
        "Final review (2-3 hours)",
        "Light exercise",
        "7+ hours sleep"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Download Complete!</h3>
            <p>Your study kit has been downloaded successfully.</p>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with Back Button */}
        <div className="p-6 bg-gradient-to-r from-indigo-700 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">📝 Exam Prep Master Guide</h1>
            <button 
              onClick={() => router.back()}
              className="flex items-center text-indigo-100 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Resources
            </button>
          </div>
          <h2 className="text-xl mt-2 text-indigo-200">
            How to Ace Finals Without All-Nighters
          </h2>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Key Strategy */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">⏱️</span>
              <h3 className="text-2xl font-bold text-gray-800">
                The 3-Day Study Plan
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {dayPlans.map((dayPlan) => (
                <div key={dayPlan.day} className="border border-indigo-100 rounded-lg p-4 hover:shadow-md transition">
                  <h4 className="font-bold text-indigo-600 mb-2">{dayPlan.day}</h4>
                  <ul className="space-y-2">
                    {dayPlan.tasks.map((task, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="font-medium">Pro Tip:</p>
              <p>"Label your notes by exam weight! Focus 70% effort on topics worth 50%+ of your grade."</p>
            </div>
          </div>

          {/* Templates Download */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">📎</span>
              Free Study Templates
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div 
                  key={template.name}
                  onClick={() => handleTemplateClick(template.name)}
                  className={`border rounded-lg p-4 transition cursor-pointer ${
                    downloadedTemplates.includes(template.name)
                      ? 'bg-green-50 border-green-200'
                      : 'hover:bg-indigo-50 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{template.emoji}</span>
                    <div>
                      <h4 className="font-bold">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.desc}</p>
                      {downloadedTemplates.includes(template.name) && (
                        <span className="inline-block mt-1 text-xs text-green-600">
                          ✓ Downloaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🔍</span>
              Deep Dive Techniques
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Predicting Exam Questions</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Analyze past 3 years' tests (pattern mapping)</li>
                  <li>Note professor's lecture emphasis points</li>
                  <li>Review study guide bold terms</li>
                  <li>Practice explaining concepts aloud</li>
                </ol>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Anki Flashcard System</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-1">Card Front:</p>
                    <div className="bg-white p-3 rounded border">
                      <p>What is the <u>second law of thermodynamics</u>?</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Card Back:</p>
                    <div className="bg-white p-3 rounded border">
                      <p>In any cyclic process, entropy will either increase or remain the same.</p>
                      <p className="mt-2 text-sm text-gray-500">#Physics #Thermo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Note-Taking Method</h4>
                <div className="mb-4">
                  <h5 className="font-medium mb-2">Which style works for you?</h5>
                  <div className="space-y-2">
                    {['Cornell', 'Mind Maps', 'Bullet Journal', 'Outline'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="note-taking"
                          className="mr-2"
                          checked={selectedNoteMethod === option}
                          onChange={() => setSelectedNoteMethod(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                {selectedNoteMethod && (
                  <p className="text-sm text-indigo-600">
                    Great choice! We'll prioritize {selectedNoteMethod} resources for you.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gray-100 p-6 text-center">
          <h3 className="text-xl font-bold mb-3">Ready to ace your exams?</h3>
          <button
            onClick={handleDownloadAll}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Full Study Kit (PDF)
          </button>
          <p className="mt-2 text-sm text-gray-600">
            {downloadedTemplates.length > 0 ? (
              `You've downloaded ${downloadedTemplates.length}/${templates.length} templates`
            ) : (
              'Includes all templates and bonus materials'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExamPlan;