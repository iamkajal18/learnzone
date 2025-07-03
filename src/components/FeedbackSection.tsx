'use client';

import { useState } from 'react';

interface FeedbackSectionProps {
  question: string;
  answer: string;
}

export default function FeedbackSection({ question, answer }: FeedbackSectionProps) {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getFeedback = async () => {
    setLoading(true);
    setError('');
    setFeedback('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ question, answer }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.success && data.feedback) {
        setFeedback(data.feedback);
      } else {
        setError('❌ Could not fetch feedback.');
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={getFeedback}
        disabled={loading}
        className="bg-[#2C5D5B] text-white px-4 py-2 rounded-md hover:bg-[#244846] transition duration-300 shadow"
      >
        {loading ? 'Analyzing...' : 'Get Feedback'}
      </button>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

      {feedback && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md border text-sm whitespace-pre-wrap text-gray-800">
          <strong>AI Feedback:</strong><br />
          {feedback}
        </div>
      )}
    </div>
  );
}
