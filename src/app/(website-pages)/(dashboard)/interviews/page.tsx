'use client';

import FeedbackSection from '@/components/FeedbackSection';
import { useEffect, useState } from 'react';

interface Interview {
  _id: string;
  role: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function InterviewListPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch('/api/interviews');
        const data = await res.json();
        if (data.success) {
          setInterviews(data.interviews);
        }
      } catch (err) {
        console.error('Failed to load interviews', err);
      }
      setLoading(false);
    };

    fetchInterviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#2C5D5B]">Your Past Interviews</h1>

      {loading && <p>Loading...</p>}

      {!loading && interviews.length === 0 && (
        <p className="text-gray-500">No interviews found.</p>
      )}

      <div className="space-y-6">
        {interviews.map((interview) => (
  <div key={interview._id} className="border rounded-md p-4 shadow-sm bg-white">
    <p className="text-sm text-gray-400">
      {new Date(interview.createdAt).toLocaleString()}
    </p>
    <h2 className="text-xl font-semibold mt-1 text-[#2C5D5B]">
      Role: {interview.role}
    </h2>
    <p className="mt-2 text-gray-800">
      <strong>Question:</strong> {interview.question}
    </p>
    <p className="mt-2 text-gray-700 whitespace-pre-wrap">
      <strong>Your Answer:</strong> {interview.answer}
    </p>

    {/* New: Feedback UI */}
    <FeedbackSection
      question={interview.question}
      answer={interview.answer}
    />
  </div>
))}

      </div>
    </div>
  );
}
