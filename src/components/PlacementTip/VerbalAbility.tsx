'use client';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

type VerbalTopic = {
  name: string;
  explanation: string;
  example: string;
};

type PracticeProblem = {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  solutions: {
    language: string;
    code: string;
  }[];
};

type Tip = {
  id: number;
  title: string;
  category: 'Vocabulary' | 'Reading' | 'Grammar' | 'Test Strategy';
  description: string;
  example: string;
};

type InterviewQuestion = {
  id: number;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  solutions: {
    language: string;
    code: string;
  }[];
};

const VerbalAbilityBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('text');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeTipTab, setActiveTipTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const verbalTopics: VerbalTopic[] = [
    {
      name: 'Reading Comprehension',
      explanation: 'Understanding and interpreting written passages to answer questions.',
      example: 'Read a 300-word passage and answer questions on main idea, tone, and details.',
    },
    {
      name: 'Vocabulary',
      explanation: 'Knowledge of word meanings, synonyms, antonyms, and contextual usage.',
      example: 'Choose the synonym for "ameliorate": improve, worsen, maintain, or degrade.',
    },
    {
      name: 'Grammar and Sentence Correction',
      explanation: 'Identifying and correcting grammatical errors in sentences.',
      example: 'Correct: "She go to the market daily" to "She goes to the market daily."',
    },
    {
      name: 'Sentence Completion',
      explanation: 'Filling blanks in sentences with appropriate words or phrases.',
      example: 'The project was ____ due to lack of funds. (Answer: abandoned)',
    },
    {
      name: 'Para Jumbles',
      explanation: 'Rearranging jumbled sentences to form a coherent paragraph.',
      example: 'Rearrange: (A) She won. (B) The race was tough. (C) She trained hard. (Answer: C-B-A)',
    },
    {
      name: 'Cloze Test',
      explanation: 'Filling multiple blanks in a passage with contextually appropriate words.',
      example: 'The ____ (1) weather made the ____ (2) event enjoyable. (Answers: pleasant, outdoor)',
    },
    {
      name: 'Synonyms and Antonyms',
      explanation: 'Identifying words with similar or opposite meanings.',
      example: 'Synonym of "big": large; Antonym: small.',
    },
    {
      name: 'Idioms and Phrases',
      explanation: 'Understanding and using common idiomatic expressions.',
      example: '"Bark up the wrong tree" means to make a mistake about something.',
    },
    {
      name: 'Analogies',
      explanation: 'Identifying relationships between pairs of words.',
      example: 'Big : Small :: Tall : Short.',
    },
    {
      name: 'Critical Reasoning',
      explanation: 'Evaluating arguments, assumptions, and conclusions in text.',
      example: 'Identify the assumption in: "Study hard to pass." (Answer: Studying leads to passing.)',
    },
    {
      name: 'Spotting Errors',
      explanation: 'Detecting grammatical or contextual errors in sentences.',
      example: 'Spot error: "He don’t like to read." (Answer: "don’t" should be "doesn’t").',
    },
    {
      name: 'Verbal Reasoning',
      explanation: 'Solving problems involving logical relationships in text.',
      example: 'If all cats are mammals, and some mammals are black, are some cats black? (Answer: Maybe)',
    },
  ];

  const practiceProblems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Reading Comprehension',
      difficulty: 'Medium',
      description: 'Read the passage and identify the main idea.',
      tags: ['Reading Comprehension', 'Critical Thinking'],
      examples: [
        {
          input: 'Passage: Technology improves efficiency but raises privacy concerns.',
          output: 'Main Idea: Technology’s benefits and drawbacks.',
          explanation: 'The passage discusses both efficiency gains and privacy issues.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Read the passage carefully, noting key points. The main idea is the central theme, often summarized in the first or last sentence. Here, it’s the dual impact of technology.`,
        },
      ],
    },
    {
      id: 2,
      title: 'Vocabulary - Synonym',
      difficulty: 'Easy',
      description: 'Choose the synonym for "benevolent."',
      tags: ['Vocabulary', 'Synonyms'],
      examples: [
        {
          input: 'Options: kind, harsh, neutral, vague',
          output: 'Kind',
          explanation: 'Benevolent means kind or generous.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Identify the meaning of "benevolent" (kind, generous). Among the options, "kind" is the closest synonym.`,
        },
      ],
    },
    {
      id: 3,
      title: 'Sentence Correction',
      difficulty: 'Medium',
      description: 'Correct the sentence: "He don’t have no time to study."',
      tags: ['Grammar', 'Sentence Correction'],
      examples: [
        {
          input: 'He don’t have no time to study.',
          output: 'He doesn’t have time to study.',
          explanation: 'Correct "don’t" to "doesn’t" and remove double negative "no."',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Identify grammatical errors: "don’t" should be "doesn’t" for subject-verb agreement, and "no" creates a double negative. Corrected: He doesn’t have time to study.`,
        },
      ],
    },
    {
      id: 4,
      title: 'Para Jumbles',
      difficulty: 'Hard',
      description: 'Rearrange: (A) She won the award. (B) She trained for months. (C) The competition was fierce.',
      tags: ['Para Jumbles', 'Logical Sequence'],
      examples: [
        {
          input: 'A, B, C',
          output: 'B, C, A',
          explanation: 'Logical order: Training (B), competition (C), outcome (A).',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Determine the logical sequence: Training (B) precedes the competition (C), which leads to winning (A). Order: B, C, A.`,
        },
      ],
    },
    {
      id: 5,
      title: 'Cloze Test',
      difficulty: 'Medium',
      description: 'Fill blanks: The ____ (1) event was canceled due to ____ (2) weather.',
      tags: ['Cloze Test', 'Vocabulary'],
      examples: [
        {
          input: 'Blanks: (1) and (2)',
          output: 'charity, adverse',
          explanation: 'Context suggests a positive event (charity) and negative weather (adverse).',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Analyze context: The event is likely positive, so "charity" fits (1). Weather caused cancellation, so "adverse" fits (2). Answer: charity, adverse.`,
        },
      ],
    },
    {
      id: 6,
      title: 'Spotting Errors',
      difficulty: 'Easy',
      description: 'Spot error: "She go to school every day."',
      tags: ['Grammar', 'Spotting Errors'],
      examples: [
        {
          input: 'She go to school every day.',
          output: 'go should be goes',
          explanation: 'Third-person singular requires "goes" for subject-verb agreement.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Check subject-verb agreement: "She" is third-person singular, so "go" should be "goes." Corrected: She goes to school every day.`,
        },
      ],
    },
    {
      id: 7,
      title: 'Analogies',
      difficulty: 'Medium',
      description: 'Solve: Pen : Write :: Knife : ?',
      tags: ['Analogies', 'Verbal Reasoning'],
      examples: [
        {
          input: 'Pen : Write :: Knife : ?',
          output: 'Cut',
          explanation: 'Pen is used to write; knife is used to cut.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Identify the relationship: Pen’s function is to write. Knife’s function is to cut. Answer: Cut.`,
        },
      ],
    },
    {
      id: 8,
      title: 'Idioms and Phrases',
      difficulty: 'Medium',
      description: 'What does "kick the bucket" mean?',
      tags: ['Idioms', 'Vocabulary'],
      examples: [
        {
          input: 'Kick the bucket',
          output: 'To die',
          explanation: 'The idiom "kick the bucket" is a euphemism for dying.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Recall common idioms: "Kick the bucket" is a well-known phrase meaning to die.`,
        },
      ],
    },
    {
      id: 9,
      title: 'Critical Reasoning',
      difficulty: 'Hard',
      description: 'Identify assumption: "Exercise improves health, so join a gym."',
      tags: ['Critical Reasoning', 'Logic'],
      examples: [
        {
          input: 'Exercise improves health, so join a gym.',
          output: 'Joining a gym leads to exercise.',
          explanation: 'The conclusion assumes that a gym membership facilitates exercise.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `The conclusion "join a gym" assumes that joining a gym will lead to exercise, which improves health. Assumption: Joining a gym facilitates exercise.`,
        },
      ],
    },
    {
      id: 10,
      title: 'Sentence Completion',
      difficulty: 'Medium',
      description: 'Complete: Her speech was so ____ that the audience was captivated.',
      tags: ['Sentence Completion', 'Vocabulary'],
      examples: [
        {
          input: 'Her speech was so ____ that the audience was captivated.',
          output: 'eloquent',
          explanation: 'Eloquent fits the context of a captivating speech.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Analyze context: A captivating speech requires a positive adjective like "eloquent," meaning expressive and persuasive. Answer: eloquent.`,
        },
      ],
    },
  ];

  const tips: Tip[] = [
    {
      id: 1,
      title: 'Expand Vocabulary Daily',
      category: 'Vocabulary',
      description: 'Learn 5-10 new words daily using flashcards or apps.',
      example: 'Use Anki to learn "ameliorate" (improve) with synonyms and sentences.',
    },
    {
      id: 2,
      title: 'Practice Active Reading',
      category: 'Reading',
      description: 'Annotate passages to identify main ideas and key details.',
      example: 'Highlight the main idea in a passage about technology’s impact.',
    },
    {
      id: 3,
      title: 'Master Grammar Rules',
      category: 'Grammar',
      description: 'Focus on subject-verb agreement and tense consistency.',
      example: 'Correct "She go" to "She goes" for third-person singular.',
    },
    {
      id: 4,
      title: 'Use Context Clues for Cloze Tests',
      category: 'Test Strategy',
      description: 'Rely on surrounding text to choose appropriate words.',
      example: 'In "The ____ event was canceled," "charity" fits a positive context.',
    },
    {
      id: 5,
      title: 'Identify Logical Flow in Para Jumbles',
      category: 'Test Strategy',
      description: 'Look for chronological or cause-effect sequences.',
      example: 'In jumbled sentences, training precedes competition, then outcome.',
    },
    {
      id: 6,
      title: 'Learn Common Idioms',
      category: 'Vocabulary',
      description: 'Memorize frequently tested idioms and their meanings.',
      example: 'Learn "kick the bucket" means to die.',
    },
    {
      id: 7,
      title: 'Avoid Overthinking Analogies',
      category: 'Test Strategy',
      description: 'Focus on the primary relationship between words.',
      example: 'Pen : Write :: Knife : Cut (function-based relationship).',
    },
    {
      id: 8,
      title: 'Practice Spotting Errors',
      category: 'Grammar',
      description: 'Review common errors like double negatives or verb tense.',
      example: 'Spot "He don’t" as incorrect; correct to "He doesn’t."',
    },
    {
      id: 9,
      title: 'Summarize Passages for Comprehension',
      category: 'Reading',
      description: 'Write one-sentence summaries to grasp main ideas.',
      example: 'Summarize a passage on AI as: "AI improves efficiency but raises ethical concerns."',
    },
    {
      id: 10,
      title: 'Use Elimination in MCQs',
      category: 'Test Strategy',
      description: 'Eliminate clearly wrong options to narrow choices.',
      example: 'For synonym of "big," eliminate "small" and "vague," leaving "large."',
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'How do you improve your verbal communication skills?',
      difficulty: 'Easy',
      description: 'Explain your approach to enhancing verbal ability.',
      tags: ['Behavioral', 'Verbal Ability'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'Structured practice.',
          explanation: 'Highlight specific methods like reading or speaking practice.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I read diverse materials like The Hindu editorials to enhance vocabulary and practice summarizing articles to improve comprehension. I also participate in group discussions to refine articulation.`,
        },
      ],
    },
    {
      id: 2,
      question: 'Explain a time you used verbal skills to solve a problem.',
      difficulty: 'Medium',
      description: 'Share a specific instance using the STAR method.',
      tags: ['Behavioral', 'Communication'],
      examples: [
        {
          input: 'Team conflict during a project.',
          output: 'Resolved through discussion.',
          explanation: 'Describe clear communication to resolve the issue.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Situation: Team disagreement on project priorities. Task: Align the team. Action: I facilitated a discussion, clearly explaining each viewpoint and proposing a compromise. Result: The team agreed, improving collaboration.`,
        },
      ],
    },
    {
      id: 3,
      question: 'What does this word mean: "ephemeral"?',
      difficulty: 'Medium',
      description: 'Define the word and provide a sentence.',
      tags: ['Vocabulary', 'Technical'],
      examples: [
        {
          input: 'Ephemeral',
          output: 'Short-lived',
          explanation: 'Ephemeral means lasting for a short time.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Ephemeral means short-lived. Example: The beauty of cherry blossoms is ephemeral, lasting only a few days.`,
        },
      ],
    },
    {
      id: 4,
      question: 'Correct this sentence: "Me and him goes to the store."',
      difficulty: 'Easy',
      description: 'Identify and fix grammatical errors.',
      tags: ['Grammar', 'Sentence Correction'],
      examples: [
        {
          input: 'Me and him goes to the store.',
          output: 'He and I go to the store.',
          explanation: 'Use subject pronouns and correct verb agreement.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Errors: "Me and him" should be "He and I" (subject pronouns), and "goes" should be "go" for plural subject. Corrected: He and I go to the store.`,
        },
      ],
    },
    {
      id: 5,
      question: 'How do you prepare for verbal ability tests?',
      difficulty: 'Medium',
      description: 'Discuss your strategy for verbal aptitude tests.',
      tags: ['Test Strategy', 'Verbal Ability'],
      examples: [
        {
          input: 'Asked in a technical interview.',
          output: 'Systematic preparation.',
          explanation: 'Highlight practice and resources.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I practice reading comprehension with editorials, use flashcards for vocabulary, and solve grammar exercises daily. I also take timed mock tests to simulate exam conditions, improving my speed and accuracy.`,
        },
      ],
    },
    {
      id: 6,
      question: 'What is the main idea of this passage? [Technology improves lives but raises ethical concerns.]',
      difficulty: 'Medium',
      description: 'Identify the central theme of the passage.',
      tags: ['Reading Comprehension', 'Critical Thinking'],
      examples: [
        {
          input: 'Technology improves lives but raises ethical concerns.',
          output: 'Technology’s benefits and ethical challenges.',
          explanation: 'The passage balances positive and negative aspects.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Read the passage and identify the core theme. The passage highlights technology’s benefits (improving lives) and drawbacks (ethical concerns). Main idea: Technology’s benefits and ethical challenges.`,
        },
      ],
    },
    {
      id: 7,
      question: 'What does "break the ice" mean?',
      difficulty: 'Easy',
      description: 'Explain the idiom and its usage.',
      tags: ['Idioms', 'Vocabulary'],
      examples: [
        {
          input: 'Break the ice',
          output: 'Start a conversation',
          explanation: 'The idiom means to initiate interaction in a social setting.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `The idiom "break the ice" means to start a conversation to ease tension. Example: She told a joke to break the ice at the meeting.`,
        },
      ],
    },
    {
      id: 8,
      question: 'Solve analogy: Big : Small :: Fast : ?',
      difficulty: 'Medium',
      description: 'Find the word that completes the analogy.',
      tags: ['Analogies', 'Verbal Reasoning'],
      examples: [
        {
          input: 'Big : Small :: Fast : ?',
          output: 'Slow',
          explanation: 'Big is the opposite of small; fast is the opposite of slow.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Identify the relationship: Big is the opposite of small. Similarly, fast’s opposite is slow. Answer: Slow.`,
        },
      ],
    },
    {
      id: 9,
      question: 'Why are verbal skills important in your role?',
      difficulty: 'Medium',
      description: 'Discuss the relevance of verbal ability in professional settings.',
      tags: ['Behavioral', 'Communication'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'Effective communication.',
          explanation: 'Highlight practical applications.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Verbal skills are crucial for explaining technical concepts and collaborating with teams. In a project, I used clear communication to align stakeholders, reducing misunderstandings by 20%.`,
        },
      ],
    },
    {
      id: 10,
      question: 'Rearrange these sentences: (A) She succeeded. (B) The task was challenging. (C) She prepared thoroughly.',
      difficulty: 'Hard',
      description: 'Form a coherent paragraph from jumbled sentences.',
      tags: ['Para Jumbles', 'Logical Sequence'],
      examples: [
        {
          input: 'A, B, C',
          output: 'C, B, A',
          explanation: 'Preparation (C) leads to the challenging task (B), resulting in success (A).',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Determine logical order: Preparation (C) precedes the challenging task (B), leading to success (A). Order: C, B, A.`,
        },
      ],
    },
    {
      id: 11,
      question: 'Spot error: "The team are working on the project."',
      difficulty: 'Easy',
      description: 'Identify and correct the grammatical error.',
      tags: ['Grammar', 'Spotting Errors'],
      examples: [
        {
          input: 'The team are working on the project.',
          output: 'are should be is',
          explanation: 'Team is singular, requiring "is."',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Check subject-verb agreement: "Team" is singular, so "are" should be "is." Corrected: The team is working on the project.`,
        },
      ],
    },
    {
      id: 12,
      question: 'What is the assumption in: "Read daily to improve vocabulary"?',
      difficulty: 'Hard',
      description: 'Identify the implied assumption.',
      tags: ['Critical Reasoning', 'Logic'],
      examples: [
        {
          input: 'Read daily to improve vocabulary.',
          output: 'Reading exposes you to new words.',
          explanation: 'The statement assumes reading introduces vocabulary.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `The conclusion "improve vocabulary" assumes reading exposes you to new words, which you learn. Assumption: Reading exposes you to new words.`,
        },
      ],
    },
    {
      id: 13,
      question: 'Complete: His decision was so ____ that everyone agreed.',
      difficulty: 'Medium',
      description: 'Choose the appropriate word to fill the blank.',
      tags: ['Sentence Completion', 'Vocabulary'],
      examples: [
        {
          input: 'His decision was so ____ that everyone agreed.',
          output: 'prudent',
          explanation: 'Prudent means wise, fitting a universally accepted decision.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Context suggests a positive adjective for a decision everyone agreed with. "Prudent" (wise) fits best. Answer: prudent.`,
        },
      ],
    },
    {
      id: 14,
      question: 'How do you handle complex reading comprehension passages?',
      difficulty: 'Medium',
      description: 'Explain your strategy for understanding dense texts.',
      tags: ['Reading Comprehension', 'Test Strategy'],
      examples: [
        {
          input: 'Asked in a technical interview.',
          output: 'Structured reading.',
          explanation: 'Describe a methodical approach.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I skim the passage to identify the main idea, then read carefully, noting key details and structure. For a passage on AI ethics, I summarized it as "balancing innovation and responsibility," which helped answer questions accurately.`,
        },
      ],
    },
    {
      id: 15,
      question: 'Write a program to check if a word is a palindrome.',
      difficulty: 'Hard',
      description: 'Create a function to verify palindromic words (e.g., "racecar").',
      tags: ['Verbal Reasoning', 'Coding'],
      examples: [
        {
          input: 'racecar',
          output: 'True',
          explanation: 'The word reads the same forward and backward.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function isPalindrome(word) {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
console.log(isPalindrome('racecar')); // Output: True`,
        },
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const chapters = [
    { title: 'What is Verbal Ability?', id: 'overview' },
    { title: 'Key Verbal Topics', id: 'topics' },
    { title: 'Practice Problems', id: 'problems' },
    { title: 'Tips and Strategies', id: 'tips' },
    { title: 'Interview Questions', id: 'interview' },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentChapter(value);
    const element = document.getElementById(chapters[value].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0286a3]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-11 bg-gray-100 min-h-screen">
      <header className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Verbal Ability: A Comprehensive Guide</h1>
        <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="sticky top-0 bg-white rounded-lg shadow-md p-4 mb-8 z-10">
        <label htmlFor="chapter-slider" className="block text-lg font-semibold mb-2 text-gray-800">
          Navigate Chapters
        </label>
        <div className="relative">
          <input
            id="chapter-slider"
            type="range"
            min="0"
            max={chapters.length - 1}
            value={currentChapter}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0286a3]"
            aria-label="Navigate through verbal ability chapters"
            aria-valuemin={0}
            aria-valuemax={chapters.length - 1}
            aria-valuenow={currentChapter}
            style={{
              background: `linear-gradient(to right, #0286a3 ${((currentChapter) / (chapters.length - 1)) * 100}%, #e5e7eb ${((currentChapter) / (chapters.length - 1)) * 100}%)`,
            }}
          />
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              background: #0286a3;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              transition: background 0.3s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              background: #016f85;
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: #0286a3;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              transition: background 0.3s;
            }
            input[type="range"]::-moz-range-thumb:hover {
              background: #016f85;
            }
          `}</style>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          {chapters.map((chapter, index) => (
            <div key={index} className="relative group">
              <span
                className={`cursor-pointer hover:text-[#0286a3] transition-colors ${
                  currentChapter === index ? 'text-[#0286a3] font-semibold' : ''
                }`}
                onClick={() => {
                  setCurrentChapter(index);
                  const element = document.getElementById(chapter.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {chapter.title}
              </span>
              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-8 left-1/2 transform -translate-x-1/2">
                {chapter.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        <section id="overview" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What is Verbal Ability?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Verbal Ability</strong> refers to the skills required to understand, interpret, and communicate effectively using language. It includes reading comprehension, vocabulary, grammar, and logical reasoning through text, crucial for aptitude tests and interviews.
            </p>
            <p>
              This guide covers all major verbal ability topics, practice problems, tips, and interview questions to prepare for placement exams like TCS, Infosys, and AMCAT.
            </p>
          </div>
        </section>

        <section id="topics" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Key Verbal Topics</h2>
          <div className="space-y-8">
            {verbalTopics.map((topic, index) => (
              <div key={index} className="border-l-4 border-[#0286a3] pl-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{topic.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Explanation:</strong> {topic.explanation}</p>
                <p className="text-gray-600 mb-2"><strong>Example:</strong> {topic.example}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="problems" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 3: Practice Problems</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {practiceProblems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => {
                      setActiveProblemTab(problem.id - 1);
                      setActiveSolutionTab(problem.solutions[0].language);
                    }}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeProblemTab === problem.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{problem.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          problem.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-800'
                            : problem.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {problem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {practiceProblems.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{practiceProblems[activeProblemTab].title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        practiceProblems[activeProblemTab].difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : practiceProblems[activeProblemTab].difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {practiceProblems[activeProblemTab].difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{practiceProblems[activeProblemTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Examples:</h4>
                    {practiceProblems[activeProblemTab].examples.map((example, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <p className="font-mono text-sm">
                          <span className="font-semibold">Input:</span> {example.input}
                          <br />
                          <span className="font-semibold">Output:</span> {example.output}
                          <br />
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium text-lg mb-4">Solution:</h4>
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {practiceProblems[activeProblemTab].solutions.map((solution) => (
                        <button
                          key={solution.language}
                          onClick={() => setActiveSolutionTab(solution.language)}
                          className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                            activeSolutionTab === solution.language
                              ? 'bg-[#0286a3] text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {solution.language.charAt(0).toUpperCase() + solution.language.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-md overflow-hidden border border-gray-200">
                      <SyntaxHighlighter
                        language={activeSolutionTab}
                        style={vs}
                        showLineNumbers
                        wrapLines
                        lineNumberStyle={{ color: '#999', minWidth: '2.5em' }}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          backgroundColor: '#f8fafc',
                        }}
                      >
                        {practiceProblems[activeProblemTab].solutions.find(
                          (s) => s.language === activeSolutionTab
                        )?.code || '// No solution available for this language'}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="tips" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: Tips and Strategies</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {tips.map((tip) => (
                  <div
                    key={tip.id}
                    onClick={() => setActiveTipTab(tip.id - 1)}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeTipTab === tip.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{tip.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tip.category === 'Vocabulary'
                            ? 'bg-blue-100 text-blue-800'
                            : tip.category === 'Reading'
                            ? 'bg-green-100 text-green-800'
                            : tip.category === 'Grammar'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tip.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {tips.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{tips[activeTipTab].title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        tips[activeTipTab].category === 'Vocabulary'
                          ? 'bg-blue-100 text-blue-800'
                          : tips[activeTipTab].category === 'Reading'
                          ? 'bg-green-100 text-green-800'
                          : tips[activeTipTab].category === 'Grammar'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {tips[activeTipTab].category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{tips[activeTipTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Example:</h4>
                    <p className="text-gray-600">{tips[activeTipTab].example}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="interview" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 5: Interview Questions</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {interviewQuestions.map((question) => (
                  <div
                    key={question.id}
                    onClick={() => {
                      setActiveQuestionTab(question.id - 1);
                      setActiveSolutionTab(question.solutions[0].language);
                    }}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeQuestionTab === question.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{question.question}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          question.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {question.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {interviewQuestions.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{interviewQuestions[activeQuestionTab].question}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        interviewQuestions[activeQuestionTab].difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : interviewQuestions[activeQuestionTab].difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {interviewQuestions[activeQuestionTab].difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{interviewQuestions[activeQuestionTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Examples:</h4>
                    {interviewQuestions[activeQuestionTab].examples.map((example, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <p className="font-mono text-sm">
                          <span className="font-semibold">Input:</span> {example.input}
                          <br />
                          <span className="font-semibold">Output:</span> {example.output}
                          <br />
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium text-lg mb-4">Solution:</h4>
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {interviewQuestions[activeQuestionTab].solutions.map((solution) => (
                        <button
                          key={solution.language}
                          onClick={() => setActiveSolutionTab(solution.language)}
                          className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                            activeSolutionTab === solution.language
                              ? 'bg-[#0286a3] text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {solution.language.charAt(0).toUpperCase() + solution.language.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-md overflow-hidden border border-gray-200">
                      <SyntaxHighlighter
                        language={activeSolutionTab}
                        style={vs}
                        showLineNumbers
                        wrapLines
                        lineNumberStyle={{ color: '#999', minWidth: '2.5em' }}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          backgroundColor: '#f8fafc',
                        }}
                      >
                        {interviewQuestions[activeQuestionTab].solutions.find(
                          (s) => s.language === activeSolutionTab
                        )?.code || '// No solution available for this language'}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 animate-fade-in-up">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                We use cookies to ensure you have the best browsing experience on our website. By using our site, you
                acknowledge that you have read and understood our{' '}
                <a href="/cookie-policy" className="text-[#0286a3] hover:underline">
                  Cookie Policy
                </a>{' '}
                &{' '}
                <a href="/privacy-policy" className="text-[#0286a3] hover:underline">
                  Privacy Policy
                </a>.
              </p>
            </div>
            <button
              onClick={handleAcceptCookies}
              className="bg-[#0286a3] hover:bg-[#016f85] text-white px-4 py-2 rounded-md whitespace-nowrap transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerbalAbilityBook;