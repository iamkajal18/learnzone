"use client"
import { useState } from 'react';

export default function QuizCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ quizName: '', totalMarks: '', totalQuestions: '', instructions: '' });
  const [errors, setErrors] = useState({});
  const totalSteps = 2;

  const steps = [
    {
      title: 'Basic Details',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-xl font-bold text-gray-900">Quiz Name *</label>
            <input
              type="text"
              value={formData.quizName}
              onChange={(e) => setFormData({ ...formData, quizName: e.target.value })}
              className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out"
              placeholder="Enter Quiz Name"
            />
            {errors.quizName && <p className="text-red-500 text-sm mt-1">{errors.quizName}</p>}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xl font-bold text-gray-900">Total Marks *</label>
              <input
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out"
                placeholder="Enter Total Marks"
              />
              {errors.totalMarks && <p className="text-red-500 text-sm mt-1">{errors.totalMarks}</p>}
            </div>
            <div>
              <label className="block text-xl font-bold text-gray-900">Total Questions *</label>
              <input
                type="number"
                value={formData.totalQuestions}
                onChange={(e) => setFormData({ ...formData, totalQuestions: e.target.value })}
                className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out"
                placeholder="Enter Total Questions"
              />
              {errors.totalQuestions && <p className="text-red-500 text-sm mt-1">{errors.totalQuestions}</p>}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Instructions',
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-start space-x-6">
            <div className="w-1/2 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Sample Format</h3>
              <ul className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Time limit: Hours</li>
                <li>Total marks:</li>
                <li>All questions are mandatory</li>
                <li>No negative marking</li>
                <li>Submit before the deadline</li>
              </ul>
            </div>
            <div className="w-1/2 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Generated Instructions</h3>
              <p className="text-gray-600">Click 'Generate' to create instructions</p>
            </div>
          </div>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out"
            placeholder="Enter or modify instructions here..."
            rows="4"
          ></textarea>
          <button
            onClick={() =>
              setFormData({
                ...formData,
                instructions:
                  "1. Time limit: 1 Hour\n2. Total marks: 100\n3. All questions are mandatory\n4. No negative marking\n5. Submit before the deadline\n6. Created at: 01:44 AM IST, Saturday, June 28, 2025",
              })
            }
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300 ease-in-out"
          >
            Generate with AI
          </button>
          {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>
      ),
    },
  ];

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.quizName) newErrors.quizName = 'Quiz Name is required';
      if (!formData.totalMarks) newErrors.totalMarks = 'Total Marks is required';
      else if (formData.totalMarks <= 0) newErrors.totalMarks = 'Total Marks must be positive';
      if (!formData.totalQuestions) newErrors.totalQuestions = 'Total Questions is required';
      else if (formData.totalQuestions <= 0) newErrors.totalQuestions = 'Total Questions must be positive';
    } else if (currentStep === 2) {
      if (!formData.instructions) newErrors.instructions = 'Instructions are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const createQuiz = () => {
    if (validateStep()) {
      alert(`Quiz created successfully!\nDetails: ${JSON.stringify(formData, null, 2)}`);
      // Add API call or further logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20">
        <div className="flex justify-between border-b-2 border-pink-200 pb-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                currentStep === index + 1
                  ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>
        <div className="space-y-8">
          {steps[currentStep - 1].content}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition duration-300 disabled:opacity-50"
            >
              Previous
            </button>
            {currentStep === totalSteps ? (
              <a href="/interview">
  <button
    onClick={createQuiz}
    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold shadow-md hover:from-green-600 hover:to-teal-600 transition duration-300"
  >
    Create Quiz
  </button>
</a>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-xl font-semibold shadow-md hover:from-pink-700 hover:to-orange-600 transition duration-300"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}