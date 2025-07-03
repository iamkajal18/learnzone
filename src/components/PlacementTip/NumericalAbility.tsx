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

type Tip = {
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

const NumericalAbility = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('javascript');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeTipTab, setActiveTipTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const subtopics: Subtopic[] = [
    {
      name: 'Number Systems',
      explanation: 'Study of integers, decimals, fractions, and their properties, including divisibility and prime numbers.',
      useCases: 'Aptitude tests, coding problems, financial calculations.',
    },
    {
      name: 'Percentages',
      explanation: 'Calculating proportions, discounts, and growth rates using percentage formulas.',
      useCases: 'Business analytics, sales calculations, data interpretation.',
    },
    {
      name: 'Profit and Loss',
      explanation: 'Analyzing cost price, selling price, profit margins, and discounts.',
      useCases: 'Commerce, trading, financial decision-making.',
    },
    {
      name: 'Time and Work',
      explanation: 'Solving problems on work rates, efficiency, and collaborative tasks.',
      useCases: 'Project management, scheduling, resource allocation.',
    },
    {
      name: 'Time, Speed, and Distance',
      explanation: 'Calculating relationships between speed, distance, and time, including relative speed.',
      useCases: 'Logistics, physics, competitive exams.',
    },
    {
      name: 'Ratio and Proportion',
      explanation: 'Understanding relationships between quantities and their proportional divisions.',
      useCases: 'Mixture problems, scaling, financial ratios.',
    },
    {
      name: 'Simple and Compound Interest',
      explanation: 'Computing interest based on principal, rate, and time for loans and investments.',
      useCases: 'Banking, finance, investment planning.',
    },
    {
      name: 'Averages',
      explanation: 'Finding mean values and applying them to data sets or weighted scenarios.',
      useCases: 'Statistics, performance analysis, data science.',
    },
    {
      name: 'Permutations and Combinations',
      explanation: 'Calculating arrangements and selections of objects with or without repetition.',
      useCases: 'Probability, scheduling, combinatorial problems.',
    },
    {
      name: 'Probability',
      explanation: 'Determining the likelihood of events using probability rules and formulas.',
      useCases: 'Risk analysis, gaming, statistical modeling.',
    },
    {
      name: 'Data Interpretation',
      explanation: 'Analyzing and drawing conclusions from charts, tables, and graphs.',
      useCases: 'Business intelligence, market research, aptitude tests.',
    },
    {
      name: 'Mensuration',
      explanation: 'Calculating areas, volumes, and surface areas of geometric shapes.',
      useCases: 'Engineering, architecture, competitive exams.',
    },
  ];

  const practiceProblems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Calculate Percentage Increase',
      difficulty: 'Easy',
      description: 'Find the percentage increase in price from $200 to $250.',
      tags: ['Percentages', 'Arithmetic'],
      examples: [
        {
          input: 'Original price: $200, New price: $250',
          output: '25%',
          explanation: 'Percentage increase = ((New - Original) / Original) * 100.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function percentageIncrease(original, newPrice) {
  return ((newPrice - original) / original * 100).toFixed(2) + '%';
}
console.log(percentageIncrease(200, 250)); // Output: 25.00%`,
        },
      ],
    },
    {
      id: 2,
      title: 'Profit and Loss Calculation',
      difficulty: 'Medium',
      description: 'Find the profit percentage if CP = $400 and SP = $500.',
      tags: ['Profit and Loss', 'Arithmetic'],
      examples: [
        {
          input: 'CP = $400, SP = $500',
          output: '25%',
          explanation: 'Profit % = ((SP - CP) / CP) * 100.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function profitPercentage(cp, sp) {
  return ((sp - cp) / cp * 100).toFixed(2) + '%';
}
console.log(profitPercentage(400, 500)); // Output: 25.00%`,
        },
      ],
    },
    {
      id: 3,
      title: 'Time and Work Problem',
      difficulty: 'Medium',
      description: 'A and B can complete a task in 12 and 15 days, respectively. How long to complete together?',
      tags: ['Time and Work', 'Arithmetic'],
      examples: [
        {
          input: 'A: 12 days, B: 15 days',
          output: '6.67 days',
          explanation: 'Combined rate = 1/12 + 1/15, Time = 1 / Combined rate.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function timeAndWork(daysA, daysB) {
  const rateA = 1 / daysA;
  const rateB = 1 / daysB;
  return (1 / (rateA + rateB)).toFixed(2);
}
console.log(timeAndWork(12, 15)); // Output: 6.67`,
        },
      ],
    },
    {
      id: 4,
      title: 'Time, Speed, and Distance',
      difficulty: 'Medium',
      description: 'A car travels 120 km at 60 km/h. How long does it take?',
      tags: ['Time, Speed, Distance', 'Arithmetic'],
      examples: [
        {
          input: 'Distance: 120 km, Speed: 60 km/h',
          output: '2 hours',
          explanation: 'Time = Distance / Speed.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function timeToTravel(distance, speed) {
  return (distance / speed).toFixed(2) + ' hours';
}
console.log(timeToTravel(120, 60)); // Output: 2.00 hours`,
        },
      ],
    },
    {
      id: 5,
      title: 'Ratio and Proportion',
      difficulty: 'Easy',
      description: 'Divide $600 in the ratio 2:3 between A and B.',
      tags: ['Ratio and Proportion', 'Arithmetic'],
      examples: [
        {
          input: 'Total: $600, Ratio: 2:3',
          output: 'A: $240, B: $360',
          explanation: 'Total parts = 2 + 3, A’s share = (2/5) * 600, B’s share = (3/5) * 600.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function divideInRatio(total, ratioA, ratioB) {
  const totalParts = ratioA + ratioB;
  const shareA = (ratioA / totalParts) * total;
  const shareB = (ratioB / totalParts) * total;
  return \`A: \${shareA}, B: \${shareB}\`;
}
console.log(divideInRatio(600, 2, 3)); // Output: A: 240, B: 360`,
        },
      ],
    },
    {
      id: 6,
      title: 'Compound Interest',
      difficulty: 'Hard',
      description: 'Find the compound interest on $1000 at 5% per annum for 2 years, compounded annually.',
      tags: ['Compound Interest', 'Arithmetic'],
      examples: [
        {
          input: 'Principal: $1000, Rate: 5%, Time: 2 years',
          output: '$102.50',
          explanation: 'CI = P * (1 + r/100)^t - P.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function compoundInterest(principal, rate, time) {
  const amount = principal * Math.pow(1 + rate / 100, time);
  return (amount - principal).toFixed(2);
}
console.log(compoundInterest(1000, 5, 2)); // Output: 102.50`,
        },
      ],
    },
    {
      id: 7,
      title: 'Average of Numbers',
      difficulty: 'Easy',
      description: 'Find the average of numbers 10, 20, 30, 40, 50.',
      tags: ['Averages', 'Arithmetic'],
      examples: [
        {
          input: 'Numbers: [10, 20, 30, 40, 50]',
          output: '30',
          explanation: 'Average = Sum of numbers / Count.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function average(numbers) {
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return (sum / numbers.length).toFixed(2);
}
console.log(average([10, 20, 30, 40, 50])); // Output: 30.00`,
        },
      ],
    },
    {
      id: 8,
      title: 'Permutations',
      difficulty: 'Hard',
      description: 'Find the number of ways to arrange 3 books on a shelf.',
      tags: ['Permutations', 'Combinatorics'],
      examples: [
        {
          input: 'Books: 3',
          output: '6',
          explanation: 'Permutations = n! = 3! = 6.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
function permutations(n) {
  return factorial(n);
}
console.log(permutations(3)); // Output: 6`,
        },
      ],
    },
    {
      id: 9,
      title: 'Probability of Event',
      difficulty: 'Medium',
      description: 'Find the probability of drawing a red card from a standard deck of 52 cards.',
      tags: ['Probability', 'Statistics'],
      examples: [
        {
          input: 'Deck: 52 cards, Red cards: 26',
          output: '0.5',
          explanation: 'Probability = Favorable outcomes / Total outcomes = 26/52.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function probability(favorable, total) {
  return (favorable / total).toFixed(2);
}
console.log(probability(26, 52)); // Output: 0.50`,
        },
      ],
    },
    {
      id: 10,
      title: 'Area of a Triangle',
      difficulty: 'Medium',
      description: 'Find the area of a triangle with base 10 cm and height 5 cm.',
      tags: ['Mensuration', 'Geometry'],
      examples: [
        {
          input: 'Base: 10 cm, Height: 5 cm',
          output: '25 cm²',
          explanation: 'Area = (1/2) * base * height.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function triangleArea(base, height) {
  return (0.5 * base * height).toFixed(2) + ' cm²';
}
console.log(triangleArea(10, 5)); // Output: 25.00 cm²`,
        },
      ],
    },
  ];

  const tips: Tip[] = [
    {
      id: 1,
      title: 'Percentage Shortcut',
      category: 'Shortcut',
      description: 'To find 10% of a number, divide by 10; for 5%, divide by 20.',
      example: '5% of 200 = 200 / 20 = 10.',
    },
    {
      id: 2,
      title: 'Avoid Unit Mistakes',
      category: 'Common Mistake',
      description: 'Always check units in time, speed, distance problems to avoid errors.',
      example: 'Convert km/h to m/s by multiplying by 5/18.',
    },
    {
      id: 3,
      title: 'Prioritize Easy Questions',
      category: 'Test Strategy',
      description: 'In aptitude tests, solve easy questions first to maximize score within time limits.',
      example: 'Start with percentage or average problems before tackling probability.',
    },
    {
      id: 4,
      title: 'Work Rate Formula',
      category: 'Shortcut',
      description: 'For time and work, use combined rate: 1/A + 1/B = 1/T.',
      example: 'A: 10 days, B: 15 days → T = 1 / (1/10 + 1/15) = 6 days.',
    },
    {
      id: 5,
      title: 'Misinterpreting Ratios',
      category: 'Common Mistake',
      description: 'Ensure ratio parts are correctly summed before dividing.',
      example: 'Ratio 2:3 means 5 parts, not 2 or 3 individually.',
    },
    {
      id: 6,
      title: 'Use Approximations',
      category: 'Test Strategy',
      description: 'For quick calculations, approximate numbers to simplify mental math.',
      example: 'For 12.3% of 198, approximate as 12% of 200 = 24.',
    },
    {
      id: 7,
      title: 'Compound Interest Shortcut',
      category: 'Shortcut',
      description: 'For small rates, approximate CI as SI for first year: CI ≈ P * r * t / 100.',
      example: 'For $1000 at 5% for 1 year, CI ≈ $50.',
    },
    {
      id: 8,
      title: 'Probability Denominator Error',
      category: 'Common Mistake',
      description: 'Always verify total outcomes in probability calculations.',
      example: 'For a die, total outcomes are 6, not 5 or 7.',
    },
    {
      id: 9,
      title: 'Memorize Key Formulas',
      category: 'Test Strategy',
      description: 'Memorize formulas for mensuration, interest, and permutations to save time.',
      example: 'Area of circle = πr², CI = P(1 + r/100)^t - P.',
    },
    {
      id: 10,
      title: 'Data Interpretation Shortcut',
      category: 'Shortcut',
      description: 'Focus on key data points in charts to avoid information overload.',
      example: 'For a pie chart, calculate percentages directly from angles (360° = 100%).',
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'How do you approach solving numerical problems under time pressure?',
      difficulty: 'Easy',
      description: 'Explain your strategy for tackling numerical questions in tests or interviews.',
      tags: ['Test Strategy', 'Numerical Ability'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A structured approach.',
          explanation: 'Highlight prioritization and shortcuts.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I prioritize easy questions like percentages or averages first to secure quick points. I use shortcuts, like dividing by 10 for 10% calculations, and double-check units. In a test, I solved a time and work problem in 30 seconds using the combined rate formula, saving time for harder questions.`,
        },
      ],
    },
    {
      id: 2,
      question: 'Solve: What is 15% of 240?',
      difficulty: 'Easy',
      description: 'Calculate the percentage value quickly.',
      tags: ['Percentages', 'Arithmetic'],
      examples: [
        {
          input: 'Number: 240, Percentage: 15%',
          output: '36',
          explanation: '15% of 240 = (15/100) * 240.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `To find 15% of 240, calculate (15/100) * 240 = 0.15 * 240 = 36. Alternatively, break it down: 10% of 240 = 24, 5% = 12, so 15% = 24 + 12 = 36.`,
        },
      ],
    },
    {
      id: 3,
      question: 'Explain a time you used numerical skills to solve a real-world problem.',
      difficulty: 'Medium',
      description: 'Share a specific instance using the STAR method.',
      tags: ['Numerical Ability', 'Behavioral'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A STAR-based response.',
          explanation: 'Focus on numerical application and outcome.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In a project (Situation), I needed to optimize a budget of $5000 (Task). I used percentage calculations to allocate 60% to resources and 40% to marketing, ensuring cost efficiency (Action). This saved 15% of the budget, allowing reinvestment in R&D (Result).`,
        },
      ],
    },
    {
      id: 4,
      question: 'Find the time taken for two workers to complete a task.',
      difficulty: 'Medium',
      description: 'A takes 20 days, B takes 30 days. How long together?',
      tags: ['Time and Work', 'Arithmetic'],
      examples: [
        {
          input: 'A: 20 days, B: 30 days',
          output: '12 days',
          explanation: 'Combined rate = 1/20 + 1/30, Time = 1 / Combined rate.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `A’s rate = 1/20, B’s rate = 1/30. Combined rate = 1/20 + 1/30 = 3/60 + 2/60 = 5/60 = 1/12. Time = 12 days. Alternatively, LCM of 20 and 30 = 60, A’s work = 3 units/day, B’s = 2 units/day, total = 5 units/day, so 60/5 = 12 days.`,
        },
      ],
    },
    {
      id: 5,
      question: 'What is the compound interest on $2000 at 4% for 2 years?',
      difficulty: 'Hard',
      description: 'Calculate the compound interest compounded annually.',
      tags: ['Compound Interest', 'Arithmetic'],
      examples: [
        {
          input: 'Principal: $2000, Rate: 4%, Time: 2 years',
          output: '$166.40',
          explanation: 'CI = P * (1 + r/100)^t - P.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `CI = 2000 * (1 + 4/100)^2 - 2000 = 2000 * (1.04)^2 - 2000 = 2000 * 1.0816 - 2000 = 2163.20 - 2000 = $166.40. Alternatively, first year SI = $80, second year SI on $2080 = $83.20, total CI = $163.20 (approximate).`,
        },
      ],
    },
    {
      id: 6,
      question: 'How do you ensure accuracy in numerical calculations?',
      difficulty: 'Medium',
      description: 'Explain your approach to minimizing errors in aptitude tests.',
      tags: ['Test Strategy', 'Numerical Ability'],
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
          code: `I double-check calculations, verify units, and use approximations for quick validation. For example, in a percentage problem, I confirm 10% of 500 = 50, then adjust for 15%. In a test, this helped me catch a unit error in a speed problem, ensuring accuracy.`,
        },
      ],
    },
    {
      id: 7,
      question: 'Find the number of ways to choose 2 books from 5.',
      difficulty: 'Medium',
      description: 'Calculate the combinations of selecting 2 books.',
      tags: ['Combinations', 'Combinatorics'],
      examples: [
        {
          input: 'Books: 5, Choose: 2',
          output: '10',
          explanation: 'Combinations = C(n, r) = n! / (r! * (n-r)!).',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `C(5, 2) = 5! / (2! * 3!) = (5 * 4) / (2 * 1) = 20 / 2 = 10. Alternatively, list pairs: (1,2), (1,3), ..., (4,5) = 10 ways.`,
        },
      ],
    },
    {
      id: 8,
      question: 'Calculate the speed of a train.',
      difficulty: 'Medium',
      description: 'A train travels 180 km in 3 hours. Find its speed.',
      tags: ['Time, Speed, Distance', 'Arithmetic'],
      examples: [
        {
          input: 'Distance: 180 km, Time: 3 hours',
          output: '60 km/h',
          explanation: 'Speed = Distance / Time.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Speed = 180 / 3 = 60 km/h. To verify, convert to m/s: 60 * (5/18) = 16.67 m/s.`,
        },
      ],
    },
    {
      id: 9,
      question: 'What is the probability of getting heads twice in 3 coin tosses?',
      difficulty: 'Hard',
      description: 'Calculate the probability of exactly 2 heads in 3 tosses.',
      tags: ['Probability', 'Combinatorics'],
      examples: [
        {
          input: 'Tosses: 3, Heads: 2',
          output: '0.375',
          explanation: 'P = C(3, 2) * (1/2)^2 * (1/2)^1 / (1/2)^3.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `P = C(3, 2) * (1/2)^3 = 3 * (1/8) = 3/8 = 0.375. Alternatively, favorable outcomes (HHT, HTH, THH) = 3, total outcomes = 2^3 = 8, so P = 3/8.`,
        },
      ],
    },
    {
      id: 10,
      question: 'Interpret a pie chart for sales data.',
      difficulty: 'Medium',
      description: 'A pie chart shows 40% electronics, 30% clothing, 20% books, 10% others. Find electronics sales for $10000 total.',
      tags: ['Data Interpretation', 'Percentages'],
      examples: [
        {
          input: 'Total: $10000, Electronics: 40%',
          output: '$4000',
          explanation: 'Electronics sales = 40% of $10000.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Electronics = (40/100) * 10000 = $4000. Alternatively, convert percentage to decimal: 0.4 * 10000 = 4000.`,
        },
      ],
    },
    {
      id: 11,
      question: 'Find the area of a circle with radius 7 cm.',
      difficulty: 'Easy',
      description: 'Calculate the area using the formula for a circle.',
      tags: ['Mensuration', 'Geometry'],
      examples: [
        {
          input: 'Radius: 7 cm',
          output: '153.94 cm²',
          explanation: 'Area = π * r^2, use π ≈ 3.14.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Area = π * 7^2 = 3.14 * 49 = 153.94 cm². Alternatively, approximate π as 22/7: (22/7) * 49 = 154 cm².`,
        },
      ],
    },
    {
      id: 12,
      question: 'How do you avoid common mistakes in numerical problems?',
      difficulty: 'Medium',
      description: 'Discuss strategies to minimize errors in calculations.',
      tags: ['Test Strategy', 'Numerical Ability'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A strategy for accuracy.',
          explanation: 'Emphasize verification and clarity.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I verify units, use approximations, and double-check calculations. For example, in a ratio problem, I ensure total parts are summed correctly. In a test, I caught a mistake by approximating 12% of 500 as 60, confirming my final answer.`,
        },
      ],
    },
    {
      id: 13,
      question: 'Divide $1200 in the ratio 3:5.',
      difficulty: 'Easy',
      description: 'Calculate the shares for two parts in the given ratio.',
      tags: ['Ratio and Proportion', 'Arithmetic'],
      examples: [
        {
          input: 'Total: $1200, Ratio: 3:5',
          output: '$450, $750',
          explanation: 'Total parts = 3 + 5, Shares = (3/8) * 1200, (5/8) * 1200.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Total parts = 3 + 5 = 8. First share = (3/8) * 1200 = 450. Second share = (5/8) * 1200 = 750. Verify: 450 + 750 = 1200.`,
        },
      ],
    },
    {
      id: 14,
      question: 'Find the average speed for a journey.',
      difficulty: 'Hard',
      description: 'A car travels 60 km at 40 km/h and 60 km at 60 km/h. Find the average speed.',
      tags: ['Time, Speed, Distance', 'Arithmetic'],
      examples: [
        {
          input: 'Distance: 60 km + 60 km, Speeds: 40 km/h, 60 km/h',
          output: '48 km/h',
          explanation: 'Average speed = Total distance / Total time.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Total distance = 60 + 60 = 120 km. Time for first 60 km = 60/40 = 1.5 h. Time for second 60 km = 60/60 = 1 h. Total time = 1.5 + 1 = 2.5 h. Average speed = 120 / 2.5 = 48 km/h.`,
        },
      ],
    },
    {
      id: 15,
      question: 'Explain why numerical skills are important in your role.',
      difficulty: 'Medium',
      description: 'Discuss the relevance of numerical ability in professional settings.',
      tags: ['Numerical Ability', 'Behavioral'],
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
          code: `Numerical skills are crucial for data-driven decisions. In a project, I used percentage calculations to optimize a $10,000 budget, saving 20% by reallocating resources efficiently. These skills ensure accuracy in analytics, forecasting, and problem-solving in any technical role.`,
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
    { title: 'What is Numerical Ability?', id: 'overview' },
    { title: 'Key Numerical Topics', id: 'subtopics' },
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Numerical Ability: A Comprehensive Guide</h1>
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
            aria-label="Navigate through numerical ability chapters"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What is Numerical Ability?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Numerical Ability</strong> refers to the capacity to solve mathematical problems involving arithmetic, algebra, geometry, and data analysis. It is a critical skill in placement exams, competitive programming, and professional roles requiring quantitative analysis.
            </p>
            <p>
              Numerical ability tests assess speed, accuracy, and problem-solving under time constraints, making them essential for aptitude tests in companies like TCS, Infosys, and AMCAT.
            </p>
          </div>
        </section>

        <section id="subtopics" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Key Numerical Topics</h2>
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
                          tip.category === 'Shortcut'
                            ? 'bg-blue-100 text-blue-800'
                            : tip.category === 'Common Mistake'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
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
                        tips[activeTipTab].category === 'Shortcut'
                          ? 'bg-blue-100 text-blue-800'
                          : tips[activeTipTab].category === 'Common Mistake'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
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

export default NumericalAbility;