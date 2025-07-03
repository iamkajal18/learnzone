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

const CommunicationSkillsBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('text');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const subtopics: Subtopic[] = [
    {
      name: 'Active Listening',
      explanation: 'Active listening involves fully concentrating on the speaker, understanding their message, and responding thoughtfully, using verbal and non-verbal cues like nodding and paraphrasing.',
      useCases: 'Interviews (understanding questions), team meetings (collaboration), client interactions (building trust).',
    },
    {
      name: 'Body Language',
      explanation: 'Body language includes facial expressions, gestures, posture, and eye contact, which convey emotions and intentions, significantly impacting message perception.',
      useCases: 'Interviews (projecting confidence), group discussions (showing engagement), presentations (emphasizing points).',
    },
    {
      name: 'Conflict Resolution',
      explanation: 'Conflict resolution involves managing disagreements constructively by focusing on interests, using objective criteria, and finding mutually beneficial solutions.',
      useCases: 'Team projects (resolving disputes), negotiations (reaching agreements), group discussions (maintaining harmony).',
    },
    {
      name: 'Digital Communication',
      explanation: 'Digital communication encompasses professional email writing, virtual meeting etiquette, and appropriate use of instant messaging in professional settings.',
      useCases: 'Remote work (emails, virtual interviews), client communication (clear messaging), team collaboration (chat platforms).',
    },
    {
      name: 'Empathy in Communication',
      explanation: 'Empathy involves understanding and validating others’ feelings through active listening and perspective-taking, fostering trust and connection.',
      useCases: 'Leadership (motivating teams), customer service (handling complaints), conflict resolution (building rapport).',
    },
    {
      name: 'Presentation Skills',
      explanation: 'Presentation skills involve structuring and delivering information clearly, using visual aids and confident delivery to engage audiences.',
      useCases: 'Technical presentations (explaining projects), interviews (showcasing skills), client pitches (persuading stakeholders).',
    },
    {
      name: 'Persuasive Communication',
      explanation: 'Persuasive communication uses logical arguments, emotional appeals, and credibility to influence others’ decisions or opinions.',
      useCases: 'Interviews (selling your skills), negotiations (convincing stakeholders), group discussions (leading opinions).',
    },
    {
      name: 'Intercultural Communication',
      explanation: 'Intercultural communication involves understanding and adapting to cultural differences in verbal and non-verbal interactions to avoid misunderstandings.',
      useCases: 'Global teams (collaborating across cultures), client interactions (respecting diversity), interviews (cultural sensitivity).',
    },
    {
      name: 'Feedback Delivery',
      explanation: 'Feedback delivery involves providing constructive, specific, and actionable feedback to help others improve while maintaining a positive tone.',
      useCases: 'Team reviews (performance feedback), peer collaboration (improving work), interviews (discussing past performance).',
    },
    {
      name: 'Negotiation Skills',
      explanation: 'Negotiation skills involve discussing terms to reach mutually beneficial agreements, using preparation, active listening, and strategic concessions.',
      useCases: 'Salary discussions (job offers), project planning (resource allocation), client contracts (terms agreement).',
    },
  ];

  const practiceProblems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Elevator Pitch',
      difficulty: 'Easy',
      description: 'Deliver a 30-second pitch about yourself, highlighting your skills and career goals.',
      tags: ['Communication', 'Interview Skills'],
      examples: [
        {
          input: 'Introduce yourself in an interview for a software engineer role.',
          output: 'A concise 30-second pitch summarizing background and goals.',
          explanation: 'Include name, education, key skills, and aspirations tailored to the role.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Hi, I'm [Your Name], a computer science graduate with expertise in full-stack development. I've built projects using React and Node.js, including a web app that boosted user engagement by 20%. Passionate about solving complex problems, I aim to contribute innovative solutions to your engineering team.`,
        },
      ],
    },
    {
      id: 2,
      title: 'Conflict Resolution Scenario',
      difficulty: 'Medium',
      description: 'Resolve a disagreement between team members during a group discussion on project priorities.',
      tags: ['Communication', 'Conflict Resolution'],
      examples: [
        {
          input: 'Two team members argue over prioritizing feature A (client-focused) vs. feature B (performance-focused).',
          output: 'A mediated solution finding common ground.',
          explanation: 'Use active listening and propose a compromise aligning with project goals.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I hear both sides: feature A ensures client satisfaction, while feature B enhances performance. Let’s align on project goals and rank features by impact and deadlines. I suggest starting feature A to meet client needs and scheduling B for the next sprint to balance priorities.`,
        },
      ],
    },
    {
      id: 3,
      title: 'Craft a Professional Email',
      difficulty: 'Medium',
      description: 'Write a professional email to a recruiter following up on a job application.',
      tags: ['Digital Communication', 'Professionalism'],
      examples: [
        {
          input: 'Follow up on a software developer application submitted last week.',
          output: 'A concise, polite email requesting status.',
          explanation: 'Use a clear subject, professional tone, and specific details about the application.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Subject: Follow-Up on Software Developer Application

Dear [Recruiter Name],

I hope this email finds you well. I am writing to follow up on my application for the Software Developer position at [Company], submitted on [Date]. I am very enthusiastic about the opportunity to contribute to your team and would appreciate any updates on the application status.

Thank you for your time and consideration. Please let me know if you need additional information.

Best regards,
[Your Name]`,
        },
      ],
    },
    {
      id: 4,
      title: 'Persuasive Group Discussion',
      difficulty: 'Hard',
      description: 'Lead a group discussion on whether companies should adopt remote work permanently.',
      tags: ['Persuasive Communication', 'Group Discussion'],
      examples: [
        {
          input: 'Topic: Should companies adopt remote work permanently?',
          output: 'A structured argument with supporting points.',
          explanation: 'Balance pros (flexibility, cost savings) and cons (collaboration challenges) to persuade effectively.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I believe companies should adopt remote work permanently, as it offers flexibility, reduces commuting costs, and boosts productivity, as seen in studies showing 20% higher output for remote teams. However, collaboration can be challenging. To address this, companies can implement hybrid models and tools like Slack to ensure effective communication, balancing benefits with team cohesion.`,
        },
      ],
    },
    {
      id: 5,
      title: 'Intercultural Communication Scenario',
      difficulty: 'Medium',
      description: 'Respond to a client from a different cultural background who prefers indirect communication.',
      tags: ['Intercultural Communication', 'Professionalism'],
      examples: [
        {
          input: 'A client avoids direct feedback but hints at project concerns.',
          output: 'A polite, indirect response addressing concerns.',
          explanation: 'Use tactful language and ask open-ended questions to align with the client’s style.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Dear [Client Name],

Thank you for sharing your thoughts on the project. I value your perspective and would love to explore how we can ensure the project meets your expectations. Could you share any specific areas where we might enhance our approach? I’m happy to discuss further to align with your vision.

Best regards,
[Your Name]`,
        },
      ],
    },
    {
      id: 6,
      title: 'Presentation Opening',
      difficulty: 'Medium',
      description: 'Prepare an engaging opening for a technical presentation on a recent project.',
      tags: ['Presentation Skills', 'Professionalism'],
      examples: [
        {
          input: 'Present a project on a web app to stakeholders.',
          output: 'A compelling 1-minute opening.',
          explanation: 'Hook the audience with a question or statistic and outline the presentation’s purpose.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Good morning, everyone. Did you know that 70% of users abandon apps due to poor performance? Today, I’ll share how our new web app tackles this issue, delivering a 30% faster response time. We’ll explore its features, impact, and next steps to ensure it meets your needs.`,
        },
      ],
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'Tell me about yourself.',
      difficulty: 'Easy',
      description: 'Provide a concise overview of your background, skills, and aspirations.',
      tags: ['Introduction', 'Interview Skills'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A 1–2 minute summary of education, experience, and goals.',
          explanation: 'Focus on relevant skills and align with the job role.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I’m [Your Name], a computer science graduate with a focus on software development. I’ve worked on projects like a React-based e-commerce platform, enhancing user engagement by 25%. My skills in JavaScript and problem-solving drive my passion for creating efficient solutions. I’m excited to contribute to your team’s innovative projects.`,
        },
      ],
    },
    {
      id: 2,
      question: 'Describe a time you faced a conflict in a team. How did you handle it?',
      difficulty: 'Medium',
      description: 'Discuss a specific conflict and your resolution approach using the STAR method.',
      tags: ['Conflict Resolution', 'Behavioral'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A structured response using Situation, Task, Action, Result.',
          explanation: 'Highlight teamwork and conflict resolution skills.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In my final year project, two teammates disagreed on feature prioritization (Situation). As the team lead, I needed to ensure project progress (Task). I facilitated a meeting, listened to both sides, and proposed a compromise to balance client needs and technical feasibility (Action). We delivered the project on time, meeting all requirements (Result).`,
        },
      ],
    },
    {
      id: 3,
      question: 'How do you ensure effective communication in a remote team?',
      difficulty: 'Medium',
      description: 'Explain strategies for clear communication in virtual settings.',
      tags: ['Digital Communication', 'Remote Work'],
      examples: [
        {
          input: 'Asked in a remote job interview.',
          output: 'A response highlighting tools and practices.',
          explanation: 'Emphasize clarity, tools, and regular check-ins.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I ensure effective remote communication by using tools like Slack for quick updates and Zoom for meetings, setting clear agendas, and scheduling regular check-ins. I also practice active listening and confirm understanding via follow-up emails. In a previous project, this approach reduced miscommunication by 30%.`,
        },
      ],
    },
    {
      id: 4,
      question: 'How do you handle giving constructive feedback to a colleague?',
      difficulty: 'Medium',
      description: 'Describe your approach to delivering feedback that is helpful and positive.',
      tags: ['Feedback Delivery', 'Leadership'],
      examples: [
        {
          input: 'Asked in a managerial interview.',
          output: 'A method for constructive feedback.',
          explanation: 'Use specific, actionable, and positive language.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I use the sandwich method: start with positive feedback, address areas for improvement specifically, and end with encouragement. For example, I commended a colleague’s design skills, suggested clearer documentation for better collaboration, and expressed confidence in their growth. This led to improved team workflows.`,
        },
      ],
    },
    {
      id: 5,
      question: 'How do you adapt your communication style to different audiences?',
      difficulty: 'Medium',
      description: 'Explain how you tailor communication based on the audience’s needs.',
      tags: ['Intercultural Communication', 'Adaptability'],
      examples: [
        {
          input: 'Asked in a client-facing role interview.',
          output: 'A response showing audience awareness.',
          explanation: 'Highlight flexibility and cultural sensitivity.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I assess the audience’s background and preferences. For technical teams, I use precise, data-driven language; for clients, I focus on benefits and avoid jargon. In a global project, I adapted to a client’s indirect style by using open-ended questions, improving rapport and project alignment.`,
        },
      ],
    },
    {
      id: 6,
      question: 'Describe a time you persuaded a team to adopt your idea.',
      difficulty: 'Hard',
      description: 'Discuss a situation where you used persuasive communication effectively.',
      tags: ['Persuasive Communication', 'Leadership'],
      examples: [
        {
          input: 'Asked in a leadership-focused interview.',
          output: 'A STAR-based response showing persuasion.',
          explanation: 'Highlight logical and emotional appeals.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In a project, my team hesitated to adopt a new framework (Situation). I needed to ensure project efficiency (Task). I presented data showing a 20% performance improvement and shared a success story from a similar project, addressing concerns (Action). The team adopted the framework, reducing development time by 15% (Result).`,
        },
      ],
    },
    {
      id: 7,
      question: 'How do you prepare for a presentation to a large audience?',
      difficulty: 'Medium',
      description: 'Explain your process for preparing and delivering effective presentations.',
      tags: ['Presentation Skills', 'Public Speaking'],
      examples: [
        {
          input: 'Asked in a technical interview.',
          output: 'A structured preparation approach.',
          explanation: 'Include practice, visuals, and audience engagement.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I start by defining the presentation’s goal and audience, structuring content with a clear intro, body, and conclusion. I create engaging visuals and practice multiple times to refine delivery. In a recent tech talk, I used this approach, receiving positive feedback for clarity and engagement.`,
        },
      ],
    },
    {
      id: 8,
      question: 'How do you handle a situation where you don’t understand a question in an interview?',
      difficulty: 'Easy',
      description: 'Describe your approach to seeking clarification without appearing unprepared.',
      tags: ['Active Listening', 'Interview Skills'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A polite clarification request.',
          explanation: 'Show confidence and engagement.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I politely ask for clarification to ensure I address the question accurately. For example, I might say, “Could you please elaborate on that point to help me provide a more focused response?” This shows active listening and commitment to giving a relevant answer.`,
        },
      ],
    },
    {
      id: 9,
      question: 'How do you manage stress during high-pressure communication scenarios?',
      difficulty: 'Medium',
      description: 'Explain techniques for staying calm and effective under pressure.',
      tags: ['Emotional Intelligence', 'Communication'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A response highlighting stress management.',
          explanation: 'Focus on preparation and mindfulness.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I use deep breathing and preparation to manage stress. Before a high-pressure presentation, I rehearse thoroughly and visualize success. During a tense group discussion, I took a moment to breathe and refocus, enabling me to mediate calmly and keep the conversation productive.`,
        },
      ],
    },
    {
      id: 10,
      question: 'How do you negotiate a salary offer?',
      difficulty: 'Hard',
      description: 'Describe your approach to negotiating a job offer professionally.',
      tags: ['Negotiation Skills', 'Professionalism'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A strategic negotiation response.',
          explanation: 'Research, justify, and propose a range.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I research industry standards to understand fair compensation. In a recent offer, I expressed gratitude, highlighted my skills, and proposed a range based on market data: “I’m excited about the role and believe my experience in [skill] aligns with a salary of [range].” This led to a 10% increase.`,
        },
      ],
    },
    {
      id: 11,
      question: 'How do you handle a misunderstanding due to cultural differences?',
      difficulty: 'Medium',
      description: 'Explain how you address cultural misunderstandings in communication.',
      tags: ['Intercultural Communication', 'Adaptability'],
      examples: [
        {
          input: 'Asked in a global team interview.',
          output: 'A response showing cultural sensitivity.',
          explanation: 'Use empathy and clarification.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I approach misunderstandings with empathy, seeking to understand the cultural context. In a project with a global team, a misunderstanding arose due to direct vs. indirect styles. I clarified intentions through open-ended questions and adapted my tone, ensuring smooth collaboration.`,
        },
      ],
    },
    {
      id: 12,
      question: 'Describe a time you turned a negative situation into a positive one through communication.',
      difficulty: 'Hard',
      description: 'Discuss a scenario where your communication skills improved an outcome.',
      tags: ['Emotional Intelligence', 'Problem-Solving'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A STAR-based response.',
          explanation: 'Highlight communication’s impact.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `A client was upset due to a delayed deliverable (Situation). My role was to maintain trust (Task). I acknowledged their concerns, explained the issue transparently, and proposed a revised timeline with added features (Action). The client appreciated the honesty, renewing the contract (Result).`,
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
    { title: 'What are Communication Skills?', id: 'overview' },
    { title: 'Key Communication Skills', id: 'subtopics' },
    { title: 'Practice Problems', id: 'problems' },
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
    <div className="max-w-7xl mx-auto px-4 py-11 bg-gray-100 min-h-screen ">
      <header className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Communication Skills: A Comprehensive Guide</h1>
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
            aria-label="Navigate through communication skills chapters"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What are Communication Skills?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Communication Skills</strong> encompass the ability to convey information clearly, effectively, and confidently through verbal, non-verbal, and written channels. These skills are critical for building relationships, succeeding in interviews, and collaborating in professional environments.
            </p>
            <p>
              Effective communication involves active listening, clear articulation, empathy, cultural sensitivity, and adaptability to various contexts, ensuring messages are understood and relationships are strengthened.
            </p>
          </div>
        </section>

        <section id="subtopics" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Key Communication Skills</h2>
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

        <section id="interview" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: Interview Questions</h2>
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

export default CommunicationSkillsBook;