'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/button';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Label } from '@/components/Label';

interface Question {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
}

interface QuizResult {
  role: string;
  question: string;
  answer: string;
  isCorrect: boolean;
}

export default function InterviewPage() {
  const [role, setRole] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);

  // Load saved quiz and results from localStorage on mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('quizQuestions');
    const savedResults = localStorage.getItem('quizResults');
    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions);
      if (Array.isArray(parsedQuestions) && parsedQuestions.every(q => 
        q.question && 
        q.options && 
        ['A', 'B', 'C', 'D'].every(key => typeof q.options[key] === 'string') && 
        ['A', 'B', 'C', 'D'].includes(q.correctAnswer)
      )) {
        setQuestions(parsedQuestions);
      }
    }
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  // Save questions and results to localStorage whenever they change
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('quizQuestions', JSON.stringify(questions));
    }
  }, [questions]);

  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem('quizResults', JSON.stringify(results));
    }
  }, [results]);

  const fetchQuestions = async () => {
    if (!role.trim()) {
      alert('⚠️ Please enter a job role.');
      return;
    }
    if (!numQuestions || isNaN(parseInt(numQuestions)) || parseInt(numQuestions) <= 0) {
      alert('⚠️ Please enter a valid number of questions.');
      return;
    }

    setLoading(true);
    try {
      const prompt = `Generate ${numQuestions} interview questions for the role of ${role}. Each question should have exactly 4 multiple-choice options labeled A, B, C, and D, with only one correct answer. Format the response as a JSON array, where each question is an object with the following structure: { "question": string, "options": { "A": string, "B": string, "C": string, "D": string }, "correctAnswer": string }. Ensure the correctAnswer is one of "A", "B", "C", or "D".`;
      
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      // Get the raw text response
      let text = await res.json();
      text= text.questions
      
      // Strip ```json and ``` markers
      const cleanedText = text.replace(/```json\n|\n```/g, '').trim();
      
      // Parse the cleaned text as JSON
      let data;
      try {
        data = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('❌ Error parsing JSON:', parseError);
        throw new Error('Invalid JSON format');
      }

      if (data && Array.isArray(data) && data.every(q => 
        q.question && 
        q.options && 
        ['A', 'B', 'C', 'D'].every(key => typeof q.options[key] === 'string') && 
        ['A', 'B', 'C', 'D'].includes(q.correctAnswer)
      )) {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        setFeedback('');
        setResults([]);
        localStorage.removeItem('quizResults'); // Clear previous results for new quiz
      } else {
        alert('❌ Invalid question format received from API');
      }
    } catch (err) {
      console.error('❌ Error fetching questions:', err);
      alert('❌ Something went wrong while generating questions.');
    }
    setLoading(false);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) {
      alert('⚠️ Please select an answer.');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Save result to state and localStorage
    const newResult: QuizResult = {
      role,
      question: currentQuestion.question,
      answer: selectedAnswer,
      isCorrect,
    };
    setResults((prev) => [...prev, newResult]);

    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setFeedback('');
      } else {
        const correctCount = results.filter(r => r.isCorrect).length + (isCorrect ? 1 : 0);
        alert(`🎉 Quiz completed! Your score: ${correctCount}/${questions.length}`);
        setQuestions([]);
        setRole('');
        setNumQuestions('');
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        setFeedback('');
        // Keep results in localStorage for review, or clear if desired
        // localStorage.removeItem('quizQuestions');
        // localStorage.removeItem('quizResults');
      }
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#2C5D5B]">AI Interview</h1>

      <Input
        placeholder="Enter job role (e.g., Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-4"
        disabled={questions.length > 0}
      />

      <Input
        type="number"
        placeholder="Enter number of questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
        className="mb-4"
        disabled={questions.length > 0}
      />

      <Button onClick={fetchQuestions} disabled={loading || !role || !numQuestions || questions.length > 0}>
        {loading ? 'Generating...' : 'Generate Questions'}
      </Button>

      {currentQuestion && (
        <div className="mt-6">
          <div className="bg-gray-100 p-4 rounded-md border text-gray-800">
            <p className="font-semibold">Question {currentQuestionIndex + 1} of {questions.length}:</p>
            <p>{currentQuestion.question}</p>
          </div>

          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="mt-4 space-y-2"
          >
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={key} />
                <Label htmlFor={key}>{`${key}: ${value}`}</Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            className="mt-4"
            onClick={submitAnswer}
            disabled={!selectedAnswer}
          >
            Submit Answer
          </Button>

          {feedback && (
            <div className="mt-4 p-2 bg-blue-100 rounded-md text-blue-800">
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// tum grok par hi raho ... 2 min santi se socho ki kya ye tarika sahi hai ?
// tumhe jo bhi questions genrate ho rhe hain 
// 1. model banana hai same format me ki questions generate hoke aaya hai wo db me store ho sake 

// 2. db me store karne se pehle tumhe ek quiz bana ke us quiz ke sath in questions to attach karna hoga 
// 3. ab tumhare pass db me ek quiz hai aur uske questions
// 4. ab tum uss quiz ko aur uske question ko client pe dikha do fir isse ye hoga ki client ko ye pata rahega ki correct answer konsa hai 
// 5. uske baad tumko ek playground banana hai fir tumko user ka sara answers firse db me store karna hai ki nuser ka resuklt pata chal sake kitne sahi hain kitne galat achha