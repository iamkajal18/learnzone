'use client';

import { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/button';
import { Textarea } from '@/components/Textarea';

export default function InterviewCard() {
  const [role, setRole] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchQuestion = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (data.success) {
        setQuestion(data.question);
      } else {
        setError('❌ Failed to fetch question');
      }
    } catch (err) {
      console.error('❌ Error fetching question:', err);
      setError('❌ Something went wrong while generating the question.');
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert('⚠️ Please write your answer before submitting.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/save-result', {
        method: 'POST',
        body: JSON.stringify({ role, question, answer }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ Answer submitted successfully!');
        setRole('');
        setQuestion('');
        setAnswer('');
      } else {
        alert('❌ Error saving answer');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong');
    }
    setSaving(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#2C5D5B]">AI Interview</h1>

      <Input
        placeholder="Enter job role (e.g., Frontend Developer)"
        value={role}
        onChange={(e: any) => setRole(e.target.value)}
        className="mb-4"
      />

      <Button onClick={fetchQuestion} disabled={loading || !role}>
        {loading ? 'Generating...' : 'Generate Question'}
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {question && (
        <>
          <div className="bg-gray-100 p-4 mt-6 rounded-md border text-gray-800 whitespace-pre-wrap">
            {question}
          </div>

          <Textarea
            className="mt-4"
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e: any) => setAnswer(e.target.value)}
          />

          <Button
            className="mt-4"
            onClick={submitAnswer}
            disabled={saving || !answer.trim()}
          >
            {saving ? 'Submitting...' : 'Submit Answer'}
          </Button>
        </>
      )}
    </div>
  );
}
