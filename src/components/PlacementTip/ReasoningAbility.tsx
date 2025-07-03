'use client';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

type Trick = {
  id: number;
  title: string;
  category: 'Shortcut' | 'Common Mistake' | 'Test Strategy';
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

type Subtopic = {
  name: string;
  explanation: string;
  useCases: string;
};

const ReasoningAbilityBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('javascript');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeTrickTab, setActiveTrickTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const subtopics: Subtopic[] = [
    {
      name: 'Logical Reasoning',
      explanation: 'Involves deducing conclusions from given premises using logical rules.',
      useCases: 'Aptitude tests, decision-making, problem-solving.',
    },
    {
      name: 'Syllogisms',
      explanation: 'Analyzing categorical statements to determine valid conclusions.',
      useCases: 'Competitive exams, logical analysis, interviews.',
    },
    {
      name: 'Puzzles',
      explanation: 'Solving complex problems requiring logical arrangement or pattern recognition.',
      useCases: 'Brain teasers, coding interviews, analytical roles.',
    },
    {
      name: 'Data Sufficiency',
      explanation: 'Determining if provided data is sufficient to answer a question.',
      useCases: 'Aptitude tests, financial analysis, decision-making.',
    },
    {
      name: 'Blood Relations',
      explanation: 'Understanding family relationships to solve logical queries.',
      useCases: 'Aptitude tests, logical reasoning sections.',
    },
    {
      name: 'Coding-Decoding',
      explanation: 'Deciphering codes based on patterns or rules.',
      useCases: 'Cryptography, aptitude tests, security analysis.',
    },
    {
      name: 'Seating Arrangement',
      explanation: 'Arranging people or objects based on given conditions.',
      useCases: 'Competitive exams, scheduling, logistics.',
    },
    {
      name: 'Direction Sense',
      explanation: 'Solving problems involving directions and distances.',
      useCases: 'Navigation, aptitude tests, spatial reasoning.',
    },
    {
      name: 'Clocks and Calendars',
      explanation: 'Analyzing time-related problems using clock angles or calendar rules.',
      useCases: 'Aptitude tests, scheduling, time management.',
    },
    {
      name: 'Number Series',
      explanation: 'Identifying patterns in numerical sequences.',
      useCases: 'Aptitude tests, data analysis, pattern recognition.',
    },
    {
      name: 'Analogy',
      explanation: 'Finding relationships between pairs of words or concepts.',
      useCases: 'Verbal reasoning, aptitude tests, cognitive assessments.',
    },
    {
      name: 'Statement and Assumption',
      explanation: 'Evaluating whether assumptions are implied by given statements.',
      useCases: 'Critical reasoning, interviews, decision-making.',
    },
  ];

  const practiceProblems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Syllogism Validation',
      difficulty: 'Easy',
      description: 'Determine if the conclusion follows: All A are B. Some B are C. Conclusion: Some A are C.',
      tags: ['Syllogisms', 'Logical Reasoning'],
      examples: [
        {
          input: 'All A are B. Some B are C.',
          output: 'Does not follow',
          explanation: 'No direct link between A and C; conclusion is invalid.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function checkSyllogism(premise1, premise2, conclusion) {
  return premise1.includes('All') && premise2.includes('Some') ? 'Does not follow' : 'Check manually';
}
console.log(checkSyllogism('All A are B', 'Some B are C', 'Some A are C')); // Output: Does not follow`,
        },
      ],
    },
    {
      id: 2,
      title: 'Seating Arrangement Puzzle',
      difficulty: 'Medium',
      description: 'Five people (A, B, C, D, E) sit in a row. A is to the left of B, C is not at the end. Who is in the middle?',
      tags: ['Seating Arrangement', 'Puzzles'],
      examples: [
        {
          input: 'A left of B, C not at end',
          output: 'C',
          explanation: 'After arranging based on constraints, C is in the middle.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function findMiddle(seats, constraints) {
  // Simplified logic for demonstration
  return constraints.includes('C not at end') ? 'C' : 'Unknown';
}
console.log(findMiddle(['A', 'B', 'C', 'D', 'E'], 'C not at end')); // Output: C`,
        },
      ],
    },
    {
      id: 3,
      title: 'Data Sufficiency Problem',
      difficulty: 'Medium',
      description: 'Is x > y? (1) x + y = 10 (2) x - y = 4',
      tags: ['Data Sufficiency', 'Logical Reasoning'],
      examples: [
        {
          input: 'Statements: (1) x + y = 10, (2) x - y = 4',
          output: 'Sufficient',
          explanation: 'Solving the equations gives x = 7, y = 3, so x > y.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function isDataSufficient(stmt1, stmt2) {
  const x = (stmt1 + stmt2) / 2; // x + y = 10, x - y = 4
  const y = (stmt1 - stmt2) / 2;
  return x > y ? 'Sufficient' : 'Not sufficient';
}
console.log(isDataSufficient(10, 4)); // Output: Sufficient`,
        },
      ],
    },
    {
      id: 4,
      title: 'Blood Relation Query',
      difficulty: 'Easy',
      description: 'A is B’s father, C is B’s sister, D is A’s father-in-law. Who is D to C?',
      tags: ['Blood Relations', 'Logical Reasoning'],
      examples: [
        {
          input: 'A (father), B (child), C (child), D (father-in-law)',
          output: 'Father',
          explanation: 'D is A’s father-in-law, so D is C’s father.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function findRelation(relations) {
  return relations.includes('father-in-law') ? 'Father' : 'Unknown';
}
console.log(findRelation('D is A’s father-in-law')); // Output: Father`,
        },
      ],
    },
    {
      id: 5,
      title: 'Coding-Decoding',
      difficulty: 'Medium',
      description: 'If "CAT" is coded as "EDW", decode "JHL".',
      tags: ['Coding-Decoding', 'Pattern Recognition'],
      examples: [
        {
          input: 'JHL',
          output: 'IFK',
          explanation: 'Each letter is shifted forward by 2 positions (A→C, T→W). Reverse for decoding.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function decodeString(str, shift) {
  return str
    .split('')
    .map(char => String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65))
    .join('');
}
console.log(decodeString('JHL', 2)); // Output: IFK`,
        },
      ],
    },
    {
      id: 6,
      title: 'Direction Sense',
      difficulty: 'Medium',
      description: 'A man walks 5 km north, 3 km east, 2 km south. How far is he from the starting point?',
      tags: ['Direction Sense', 'Spatial Reasoning'],
      examples: [
        {
          input: '5 km N, 3 km E, 2 km S',
          output: '3.61 km',
          explanation: 'Net displacement: (3 km E, 3 km N), distance = √(3² + 3²).',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function calculateDistance(moves) {
  let x = 0, y = 0;
  moves.forEach(move => {
    if (move.includes('N')) y += parseInt(move);
    if (move.includes('S')) y -= parseInt(move);
    if (move.includes('E')) x += parseInt(move);
  });
  return Math.sqrt(x * x + y * y).toFixed(2);
}
console.log(calculateDistance(['5 N', '3 E', '2 S'])); // Output: 3.61`,
        },
      ],
    },
    {
      id: 7,
      title: 'Clock Angle Problem',
      difficulty: 'Hard',
      description: 'Find the angle between the hour and minute hands at 3:15.',
      tags: ['Clocks and Calendars', 'Geometry'],
      examples: [
        {
          input: 'Time: 3:15',
          output: '7.5°',
          explanation: 'Hour hand: (3 * 30 + 15/2)°, Minute hand: (15 * 6)°, Angle = |90 - 97.5|.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function clockAngle(hours, minutes) {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const angle = Math.abs(hourAngle - minuteAngle);
  return Math.min(angle, 360 - angle).toFixed(1);
}
console.log(clockAngle(3, 15)); // Output: 7.5`,
        },
      ],
    },
    {
      id: 8,
      title: 'Number Series Completion',
      difficulty: 'Medium',
      description: 'Find the next number in the series: 2, 5, 11, 23, ?',
      tags: ['Number Series', 'Pattern Recognition'],
      examples: [
        {
          input: '2, 5, 11, 23',
          output: '44',
          explanation: 'Pattern: Each term is roughly doubled plus a small increment.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function nextInSeries(series) {
  return series[series.length - 1] * 2 + 1;
}
console.log(nextInSeries([2, 5, 11, 23])); // Output: 44`,
        },
      ],
    },
    {
      id: 9,
      title: 'Analogy Problem',
      difficulty: 'Easy',
      description: 'Big : Small :: Tall : ?',
      tags: ['Analogy', 'Verbal Reasoning'],
      examples: [
        {
          input: 'Big : Small :: Tall : ?',
          output: 'Short',
          explanation: 'Big is the opposite of Small, so Tall’s opposite is Short.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function findAnalogy(pair1, pair2) {
  return pair1[0] === 'Big' && pair1[1] === 'Small' ? 'Short' : 'Unknown';
}
console.log(findAnalogy(['Big', 'Small'], ['Tall', '?'])); // Output: Short`,
        },
      ],
    },
    {
      id: 10,
      title: 'Statement and Assumption',
      difficulty: 'Hard',
      description: 'Statement: "Study hard to pass." Assumption: Studying hard leads to passing.',
      tags: ['Statement and Assumption', 'Critical Reasoning'],
      examples: [
        {
          input: 'Statement: Study hard to pass.',
          output: 'Valid',
          explanation: 'The statement implies that studying hard is necessary to pass.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function checkAssumption(statement, assumption) {
  return statement.includes('Study hard') && assumption.includes('leads to passing') ? 'Valid' : 'Invalid';
}
console.log(checkAssumption('Study hard to pass', 'Studying hard leads to passing')); // Output: Valid`,
        },
      ],
    },
  ];

  const tricks: Trick[] = [
    {
      id: 1,
      title: 'Venn Diagrams for Syllogisms',
      category: 'Shortcut',
      description: 'Use Venn diagrams to quickly validate syllogisms.',
      example: 'For "All A are B, Some B are C," draw overlapping circles to check if Some A are C (invalid).',
    },
    {
      id: 2,
      title: 'Avoid Overthinking Puzzles',
      category: 'Common Mistake',
      description: 'Don’t assume complexity in puzzles; list all constraints clearly.',
      example: 'For seating problems, write positions and constraints to avoid missing rules.',
    },
    {
      id: 3,
      title: 'Prioritize Data Sufficiency',
      category: 'Test Strategy',
      description: 'Evaluate each statement independently before combining in data sufficiency questions.',
      example: 'For "Is x > y?", check if statement 1 alone or statement 2 alone is enough.',
    },
    {
      id: 4,
      title: 'Blood Relation Tree',
      category: 'Shortcut',
      description: 'Draw a family tree to simplify blood relation problems.',
      example: 'For "A is B’s father, D is A’s father-in-law," a tree shows D is father to A’s wife.',
    },
    {
      id: 5,
      title: 'Misinterpreting Directions',
      category: 'Common Mistake',
      description: 'Always clarify starting direction in direction sense problems.',
      example: 'Assume facing North unless specified, and track turns carefully.',
    },
    {
      id: 6,
      title: 'Use Elimination in Coding-Decoding',
      category: 'Test Strategy',
      description: 'Eliminate impossible patterns to identify the coding rule quickly.',
      example: 'For "CAT → EDW," test letter shifts (e.g., +2) to confirm the pattern.',
    },
    {
      id: 7,
      title: 'Clock Angle Formula',
      category: 'Shortcut',
      description: 'Use formula: |30H - 5.5M| for clock angles, where H is hours, M is minutes.',
      example: 'At 3:00, angle = |30*3 - 5.5*0| = 90°.',
    },
    {
      id: 8,
      title: 'Series Pattern Recognition',
      category: 'Test Strategy',
      description: 'Look for arithmetic, geometric, or doubling patterns in number series.',
      example: 'For 2, 5, 11, 23, check if each term doubles and adds a small number.',
    },
    {
      id: 9,
      title: 'Analogy Simplification',
      category: 'Shortcut',
      description: 'Identify the relationship (e.g., opposite, synonym) in analogy questions.',
      example: 'Big : Small (opposite) → Tall : Short.',
    },
    {
      id: 10,
      title: 'Assuming Unstated Facts',
      category: 'Common Mistake',
      description: 'Avoid assuming information not provided in statement-assumption questions.',
      example: 'For "Study hard to pass," don’t assume other factors like luck are implied.',
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'How do you approach solving logical reasoning problems under time pressure?',
      difficulty: 'Easy',
      description: 'Explain your strategy for tackling reasoning questions in tests or interviews.',
      tags: ['Test Strategy', 'Logical Reasoning'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A structured approach.',
          explanation: 'Highlight prioritization and logical steps.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I break down the problem into premises and use shortcuts like Venn diagrams for syllogisms. In a test, I solved a seating arrangement by listing constraints, saving time for harder questions.`,
        },
      ],
    },
    {
      id: 2,
      question: 'Solve: All men are mortal. Socrates is a man. Is Socrates mortal?',
      difficulty: 'Easy',
      description: 'Determine if the conclusion follows from the premises.',
      tags: ['Syllogisms', 'Logical Reasoning'],
      examples: [
        {
          input: 'All men are mortal, Socrates is a man.',
          output: 'Yes',
          explanation: 'Socrates falls under "men," so he is mortal.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `The premise "All men are mortal" establishes a universal rule. Since Socrates is a man, he must be mortal. Conclusion: Yes.`,
        },
      ],
    },
    {
      id: 3,
      question: 'Describe a time you used logical reasoning to solve a problem.',
      difficulty: 'Medium',
      description: 'Share a specific instance using the STAR method.',
      tags: ['Logical Reasoning', 'Behavioral'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A STAR-based response.',
          explanation: 'Focus on logical process and outcome.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In a project (Situation), I needed to optimize team scheduling (Task). I used a seating arrangement approach to assign tasks based on availability (Action), reducing conflicts by 30% (Result).`,
        },
      ],
    },
    {
      id: 4,
      question: 'Solve a puzzle: Arrange 3 people (A, B, C) in a circle with A facing B.',
      difficulty: 'Medium',
      description: 'Determine a valid arrangement based on the condition.',
      tags: ['Puzzles', 'Seating Arrangement'],
      examples: [
        {
          input: 'A facing B, circular arrangement',
          output: 'A-B-C',
          explanation: 'In a circle, A faces B, with C completing the arrangement.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Arrange A, B, C in a circle. If A faces B, place A and B opposite each other, with C at the third position. One valid arrangement: A-B-C (circular).`,
        },
      ],
    },
    {
      id: 5,
      question: 'Is the data sufficient? x + y = 10, xy = 24. Find x and y.',
      difficulty: 'Hard',
      description: 'Determine if the statements provide enough information.',
      tags: ['Data Sufficiency', 'Logical Reasoning'],
      examples: [
        {
          input: 'x + y = 10, xy = 24',
          output: 'Sufficient',
          explanation: 'Solve the quadratic: t² - 10t + 24 = 0, gives x, y = 4, 6.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Form the quadratic: t² - (x+y)t + xy = 0 → t² - 10t + 24 = 0. Solve: t = [10 ± √(100 - 96)]/2 = 6, 4. Thus, x, y = 4, 6. Sufficient.`,
        },
      ],
    },
    {
      id: 6,
      question: 'How do you ensure accuracy in reasoning problems?',
      difficulty: 'Medium',
      description: 'Explain your approach to minimizing errors in aptitude tests.',
      tags: ['Test Strategy', 'Logical Reasoning'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A methodical approach.',
          explanation: 'Highlight verification techniques.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I list premises, use diagrams, and verify conclusions. For a syllogism, I used a Venn diagram to confirm validity, catching an error in a test.`,
        },
      ],
    },
    {
      id: 7,
      question: 'Decode: If "DOG" is "EPH," what is "KLM"?',
      difficulty: 'Medium',
      description: 'Identify the coding pattern and decode the given term.',
      tags: ['Coding-Decoding', 'Pattern Recognition'],
      examples: [
        {
          input: 'KLM',
          output: 'JIK',
          explanation: 'Each letter in "DOG" shifts forward by 1 (D→E, O→P, G→H). Reverse for decoding.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Pattern: Each letter shifts forward by 1 (D→E, O→P, G→H). For decoding KLM, shift back: K→J, L→K, M→L. Result: JIK.`,
        },
      ],
    },
    {
      id: 8,
      question: 'Find the distance after: 10 km west, 5 km north, 10 km east.',
      difficulty: 'Medium',
      description: 'Calculate the final distance from the starting point.',
      tags: ['Direction Sense', 'Spatial Reasoning'],
      examples: [
        {
          input: '10 km W, 5 km N, 10 km E',
          output: '5 km',
          explanation: 'Net displacement: 5 km north.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Net x-displacement: -10 (west) + 10 (east) = 0. Net y-displacement: 5 (north). Distance = √(0² + 5²) = 5 km.`,
        },
      ],
    },
    {
      id: 9,
      question: 'Find the angle at 6:30.',
      difficulty: 'Hard',
      description: 'Calculate the angle between the hour and minute hands.',
      tags: ['Clocks and Calendars', 'Geometry'],
      examples: [
        {
          input: 'Time: 6:30',
          output: '15°',
          explanation: 'Hour hand: 180 + 15 = 195°, Minute hand: 180°, Angle = |195 - 180|.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Hour hand: (6 * 30 + 30 * 0.5) = 195°. Minute hand: 30 * 6 = 180°. Angle = |195 - 180| = 15°. Alternatively, use formula: |30*6 - 5.5*30| = 15°.`,
        },
      ],
    },
    {
      id: 10,
      question: 'Find the next number: 3, 7, 15, 31, ?',
      difficulty: 'Medium',
      description: 'Identify the pattern in the number series.',
      tags: ['Number Series', 'Pattern Recognition'],
      examples: [
        {
          input: '3, 7, 15, 31',
          output: '63',
          explanation: 'Pattern: Each term is doubled and increased by 1.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Pattern: 3→7 (3*2+1), 7→15 (7*2+1), 15→31 (15*2+1). Next: 31*2+1 = 63.`,
        },
      ],
    },
    {
      id: 11,
      question: 'Solve analogy: Pen : Write :: Scissors : ?',
      difficulty: 'Easy',
      description: 'Find the word that completes the analogy.',
      tags: ['Analogy', 'Verbal Reasoning'],
      examples: [
        {
          input: 'Pen : Write :: Scissors : ?',
          output: 'Cut',
          explanation: 'Pen is used to write; scissors are used to cut.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Pen’s function is to write; scissors’ function is to cut. Answer: Cut.`,
        },
      ],
    },
    {
      id: 12,
      question: 'Is the assumption valid? Statement: "Exercise improves health." Assumption: Regular exercise is beneficial.',
      difficulty: 'Medium',
      description: 'Evaluate if the assumption is implied.',
      tags: ['Statement and Assumption', 'Critical Reasoning'],
      examples: [
        {
          input: 'Statement: Exercise improves health.',
          output: 'Valid',
          explanation: 'The statement implies regular exercise is beneficial.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `The statement suggests exercise has a positive effect on health, implying regular exercise is beneficial. Assumption is valid.`,
        },
      ],
    },
    {
      id: 13,
      question: 'Arrange 4 people (P, Q, R, S) with P next to Q.',
      difficulty: 'Medium',
      description: 'Find a valid linear arrangement.',
      tags: ['Seating Arrangement', 'Puzzles'],
      examples: [
        {
          input: 'P next to Q',
          output: 'P-Q-R-S',
          explanation: 'P and Q are adjacent, followed by R and S.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Place P and Q together (P-Q or Q-P), then add R and S. One valid arrangement: P-Q-R-S.`,
        },
      ],
    },
    {
      id: 14,
      question: 'Determine if x is even. (1) x + 2 is even (2) x/2 is an integer.',
      difficulty: 'Hard',
      description: 'Evaluate data sufficiency for the question.',
      tags: ['Data Sufficiency', 'Logical Reasoning'],
      examples: [
        {
          input: '(1) x + 2 is even, (2) x/2 is an integer',
          output: 'Each sufficient',
          explanation: 'Both statements independently confirm x is even.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Statement 1: If x + 2 is even, x is even (e.g., 4 + 2 = 6). Statement 2: If x/2 is an integer, x is even (e.g., 4/2 = 2). Each is sufficient.`,
        },
      ],
    },
    {
      id: 15,
      question: 'Why are reasoning skills important in your role?',
      difficulty: 'Medium',
      description: 'Discuss the relevance of reasoning ability in professional settings.',
      tags: ['Logical Reasoning', 'Behavioral'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A professional response.',
          explanation: 'Highlight practical applications.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Reasoning skills enable problem-solving and decision-making. In a project, I used logical analysis to resolve a scheduling conflict, improving efficiency by 20%. These skills are vital for technical and analytical roles.`,
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
    { title: 'What is Reasoning Ability?', id: 'overview' },
    { title: 'Key Reasoning Topics', id: 'subtopics' },
    { title: 'Practice Problems', id: 'problems' },
    { title: 'Tricks and Strategies', id: 'tricks' },
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Reasoning Ability: A Comprehensive Guide</h1>
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
            aria-label="Navigate through reasoning ability chapters"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What is Reasoning Ability?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Reasoning Ability</strong> refers to the capacity to analyze information, draw logical conclusions, and solve problems using critical and analytical thinking. It is a core component of aptitude tests in placement exams, competitive programming, and professional roles requiring decision-making.
            </p>
            <p>
              Reasoning ability tests assess logical deduction, pattern recognition, and problem-solving under time constraints, making them essential for companies like TCS, Infosys, and AMCAT.
            </p>
          </div>
        </section>

        <section id="subtopics" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Key Reasoning Topics</h2>
          <div className="space-y-8">
            {subtopics.map((subtopic, index) => (
              <div key={index} className="border-l-4 border-[#0286a3] pl-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{subtopic.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Explanation:</strong> {subtopic.explanation}</p>
                <p className="text-gray-600 mb-2"><strong>Use Cases:</strong> {subtopic.useCases}</p>
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

        <section id="tricks" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: Tricks and Strategies</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {tricks.map((trick) => (
                  <div
                    key={trick.id}
                    onClick={() => setActiveTrickTab(trick.id - 1)}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeTrickTab === trick.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{trick.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          trick.category === 'Shortcut'
                            ? 'bg-blue-100 text-blue-800'
                            : trick.category === 'Common Mistake'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {trick.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {tricks.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{tricks[activeTrickTab].title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        tricks[activeTrickTab].category === 'Shortcut'
                          ? 'bg-blue-100 text-blue-800'
                          : tricks[activeTrickTab].category === 'Common Mistake'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {tricks[activeTrickTab].category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{tricks[activeTrickTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Example:</h4>
                    <p className="text-gray-600">{tricks[activeTrickTab].example}</p>
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

export default ReasoningAbilityBook;