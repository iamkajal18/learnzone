'use client';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ResumeComponent = {
  name: string;
  explanation: string;
  example: string;
};

type Tip = {
  id: number;
  title: string;
  category: 'Content' | 'Formatting' | 'Strategy';
  description: string;
  example: string;
};

type Mistake = {
  id: number;
  title: string;
  incorrect: string;
  correct: string;
  explanation: string;
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

const ResumeBuildingBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('text');
  const [activeTipTab, setActiveTipTab] = useState(0);
  const [activeMistakeTab, setActiveMistakeTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const resumeComponents: ResumeComponent[] = [
    {
      name: 'Contact Information',
      explanation: 'Includes your name, phone, email, LinkedIn, and GitHub (if relevant).',
      example: 'John Doe | john.doe@email.com | (123) 456-7890 | linkedin.com/in/johndoe | github.com/johndoe',
    },
    {
      name: 'Professional Summary',
      explanation: 'A brief 2-3 sentence overview of your skills, experience, and career goals.',
      example: 'Final-year B.Tech student specializing in full-stack development with expertise in React and Node.js, seeking software engineering roles.',
    },
    {
      name: 'Education',
      explanation: 'Lists your academic qualifications, including degree, institution, and CGPA.',
      example: 'B.Tech in Computer Science, ABC University, 2023-2027, CGPA: 8.5/10',
    },
    {
      name: 'Skills',
      explanation: 'Highlights technical and soft skills relevant to the job.',
      example: 'Technical: JavaScript, Python, SQL | Soft: Communication, Teamwork',
    },
    {
      name: 'Projects',
      explanation: 'Showcases relevant projects with descriptions of your role and technologies used.',
      example: 'E-commerce Platform: Built a full-stack app using Next.js and MongoDB, improving user engagement by 20%.',
    },
    {
      name: 'Work Experience',
      explanation: 'Details internships or jobs, focusing on responsibilities and achievements.',
      example: 'Software Intern, XYZ Corp, Jun 2025 - Aug 2025: Developed REST APIs, reducing response time by 15%.',
    },
    {
      name: 'Certifications',
      explanation: 'Lists relevant certifications to demonstrate expertise.',
      example: 'AWS Certified Solutions Architect, 2025',
    },
    {
      name: 'Achievements',
      explanation: 'Highlights awards or recognitions, e.g., hackathons or academic honors.',
      example: '1st Place, GITM Hackathon 2024: Developed a real-time chat app.',
    },
    {
      name: 'Extracurricular Activities',
      explanation: 'Showcases leadership or teamwork through clubs, events, or volunteering.',
      example: 'President, Coding Club, ABC University, 2024-2025',
    },
    {
      name: 'References',
      explanation: 'Optional; include "Available upon request" or specific contacts if requested.',
      example: 'Available upon request',
    },
  ];

  const tips: Tip[] = [
    {
      id: 1,
      title: 'Use ATS-Friendly Keywords',
      category: 'Strategy',
      description: 'Incorporate job-specific keywords to pass Applicant Tracking Systems.',
      example: 'For a software role, include terms like "React," "API development," or "Agile."',
    },
    {
      id: 2,
      title: 'Keep It Concise',
      category: 'Formatting',
      description: 'Limit your resume to one page for freshers, focusing on relevant details.',
      example: 'Reduce a 2-page resume to 1 by removing outdated internships.',
    },
    {
      id: 3,
      title: 'Tailor for Each Job',
      category: 'Strategy',
      description: 'Customize your resume to highlight skills matching the job description.',
      example: 'For a data science role, emphasize Python and machine learning projects.',
    },
    {
      id: 4,
      title: 'Quantify Achievements',
      category: 'Content',
      description: 'Use numbers to show impact (e.g., percentages, time saved).',
      example: 'Improved app performance by 30% vs. Improved app performance.',
    },
    {
      id: 5,
      title: 'Use Action Verbs',
      category: 'Content',
      description: 'Start bullet points with strong verbs like "Developed," "Led," or "Optimized."',
      example: 'Developed a web app vs. Worked on a web app.',
    },
    {
      id: 6,
      title: 'Consistent Formatting',
      category: 'Formatting',
      description: 'Use uniform fonts, sizes, and spacing for a professional look.',
      example: 'Use Arial 11pt for all text, with 1-inch margins.',
    },
    {
      id: 7,
      title: 'Highlight Relevant Projects',
      category: 'Content',
      description: 'Prioritize projects that demonstrate skills for the target role.',
      example: 'List a Next.js project for a front-end developer position.',
    },
    {
      id: 8,
      title: 'Include a LinkedIn Profile',
      category: 'Strategy',
      description: 'Add a professional LinkedIn URL to provide more context.',
      example: 'linkedin.com/in/johndoe (ensure profile is updated).',
    },
    {
      id: 9,
      title: 'Proofread Thoroughly',
      category: 'Content',
      description: 'Eliminate typos and grammatical errors to maintain credibility.',
      example: 'Use tools like Grammarly to catch errors like "recieved" vs. "received."',
    },
    {
      id: 10,
      title: 'Use a Professional Email',
      category: 'Formatting',
      description: 'Use a simple, professional email address.',
      example: 'john.doe@email.com vs. coolguy123@email.com.',
    },
  ];

  const mistakes: Mistake[] = [
    {
      id: 1,
      title: 'Including Irrelevant Information',
      incorrect: 'Listed high school achievements on a fresher resume.',
      correct: 'Focus on college projects and internships.',
      explanation: 'Irrelevant details dilute the resume’s impact for professional roles.',
    },
    {
      id: 2,
      title: 'Using Unprofessional Email',
      incorrect: 'coolcoder99@gmail.com',
      correct: 'john.doe@gmail.com',
      explanation: 'Unprofessional emails can create a negative impression.',
    },
    {
      id: 3,
      title: 'Overloading with Text',
      incorrect: 'Paragraph-long descriptions for each project.',
      correct: 'Concise bullet points (e.g., "Built app using React").',
      explanation: 'Hiring managers skim resumes; brevity enhances readability.',
    },
    {
      id: 4,
      title: 'Inconsistent Formatting',
      incorrect: 'Mixed fonts (Arial, Times New Roman) and sizes.',
      correct: 'Uniform Arial 11pt with consistent spacing.',
      explanation: 'Inconsistency looks unprofessional and distracts readers.',
    },
    {
      id: 5,
      title: 'Not Tailoring to Job',
      incorrect: 'Generic resume for all roles.',
      correct: 'Customized skills and projects for each job description.',
      explanation: 'Tailoring shows alignment with the role’s requirements.',
    },
    {
      id: 6,
      title: 'Including Typos',
      incorrect: 'Developed a web aplication.',
      correct: 'Developed a web application.',
      explanation: 'Typos suggest lack of attention to detail.',
    },
    {
      id: 7,
      title: 'Using Passive Language',
      incorrect: 'Was responsible for app development.',
      correct: 'Developed a scalable web app.',
      explanation: 'Active verbs convey confidence and impact.',
    },
    {
      id: 8,
      title: 'Omitting Quantifiable Results',
      incorrect: 'Improved app performance.',
      correct: 'Improved app performance by 25%.',
      explanation: 'Numbers make achievements concrete and impressive.',
    },
    {
      id: 9,
      title: 'Including Unnecessary Sections',
      incorrect: 'Added hobbies like "watching movies."',
      correct: 'Omit hobbies unless relevant (e.g., tech meetups).',
      explanation: 'Irrelevant sections waste valuable resume space.',
    },
    {
      id: 10,
      title: 'Poor ATS Optimization',
      incorrect: 'Used creative terms like "coding wizard."',
      correct: 'Used standard terms like "software developer."',
      explanation: 'ATS may not recognize non-standard keywords.',
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'Walk me through your resume.',
      difficulty: 'Easy',
      description: 'Explain your background, focusing on key experiences.',
      tags: ['Behavioral', 'Resume'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'Structured overview.',
          explanation: 'Highlight education, projects, and achievements in order.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Start with education: "I’m a B.Tech student at ABC University, graduating in 2027 with an 8.5 CGPA." Then discuss projects: "I built an e-commerce app using Next.js, improving user engagement by 20%." Conclude with goals: "I’m seeking roles to apply my full-stack skills."`,
        },
      ],
    },
    {
      id: 2,
      question: 'Why did you choose these projects for your resume?',
      difficulty: 'Medium',
      description: 'Justify the relevance of your listed projects.',
      tags: ['Behavioral', 'Projects'],
      examples: [
        {
          input: 'E-commerce app project.',
          output: 'Relevant to role.',
          explanation: 'Explain how projects align with job requirements.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I chose my e-commerce app because it showcases my full-stack skills in React and Node.js, directly relevant to the software developer role. It involved real-world challenges like optimizing performance, which aligns with the job’s needs.`,
        },
      ],
    },
    {
      id: 3,
      question: 'What achievement are you most proud of on your resume?',
      difficulty: 'Medium',
      description: 'Discuss a key accomplishment and its impact.',
      tags: ['Behavioral', 'Achievements'],
      examples: [
        {
          input: 'GITM Hackathon 2024 win.',
          output: 'Hackathon success.',
          explanation: 'Highlight the achievement and skills demonstrated.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I’m proud of winning 1st place at GITM Hackathon 2024, where I developed a real-time chat app using React and WebSocket. It showcased my technical skills and ability to work under pressure, delivering a functional product in 24 hours.`,
        },
      ],
    },
    {
      id: 4,
      question: 'How did you quantify your resume achievements?',
      difficulty: 'Medium',
      description: 'Explain how you used metrics to show impact.',
      tags: ['Resume', 'Achievements'],
      examples: [
        {
          input: 'Improved app performance by 30%.',
          output: 'Used metrics.',
          explanation: 'Describe the process of measuring impact.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `For my e-commerce app, I measured performance by tracking API response times before and after optimization, achieving a 30% reduction. I included such metrics to make my contributions clear and impactful.`,
        },
      ],
    },
    {
      id: 5,
      question: 'What challenges did you face in a project listed on your resume?',
      difficulty: 'Hard',
      description: 'Discuss a specific challenge and how you overcame it.',
      tags: ['Behavioral', 'Projects'],
      examples: [
        {
          input: 'Database scaling issue.',
          output: 'Resolved with indexing.',
          explanation: 'Show problem-solving skills.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In my e-commerce project, I faced slow database queries due to large datasets. I analyzed the issue, implemented indexing, and optimized queries, reducing response time by 40%. This taught me effective debugging and optimization techniques.`,
        },
      ],
    },
    {
      id: 6,
      question: 'Why is your CGPA lower than expected?',
      difficulty: 'Hard',
      description: 'Address a potential weakness in your education section.',
      tags: ['Behavioral', 'Education'],
      examples: [
        {
          input: 'CGPA of 7.5/10.',
          output: 'Balanced with projects.',
          explanation: 'Focus on strengths and learning.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `My CGPA of 7.5 reflects time spent on hands-on projects like building a full-stack app, which enhanced my practical skills. I prioritized learning technologies like React and Node.js, which are directly relevant to this role.`,
        },
      ],
    },
    {
      id: 7,
      question: 'How did you select skills to include on your resume?',
      difficulty: 'Medium',
      description: 'Explain your process for choosing relevant skills.',
      tags: ['Resume', 'Skills'],
      examples: [
        {
          input: 'Listed JavaScript, Python.',
          output: 'Job-relevant skills.',
          explanation: 'Align skills with job requirements.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I selected skills like JavaScript and Python based on the job description’s requirements for web development and data analysis. I also included soft skills like teamwork, demonstrated through my coding club leadership.`,
        },
      ],
    },
    {
      id: 8,
      question: 'Describe a resume project’s technical implementation.',
      difficulty: 'Hard',
      description: 'Dive into the technical details of a listed project.',
      tags: ['Technical', 'Projects'],
      examples: [
        {
          input: 'E-commerce app.',
          output: 'Tech stack explanation.',
          explanation: 'Detail technologies and architecture.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `My e-commerce app used Next.js for the front-end, Node.js with Express for the back-end, and MongoDB for data storage. I implemented REST APIs for product management and integrated Stripe for payments, ensuring scalability and security.`,
        },
      ],
    },
    {
      id: 9,
      question: 'How do you ensure your resume stands out?',
      difficulty: 'Medium',
      description: 'Discuss strategies to make your resume unique.',
      tags: ['Resume', 'Strategy'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'Customization and metrics.',
          explanation: 'Highlight tailoring and impact.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I tailor my resume to each job, using keywords from the description and quantifying achievements, like "reduced API response time by 15%." I also use a clean, ATS-friendly format to ensure readability and impact.`,
        },
      ],
    },
    {
      id: 10,
      question: 'What inspired your career goals listed in your summary?',
      difficulty: 'Medium',
      description: 'Explain the motivation behind your resume’s career objective.',
      tags: ['Behavioral', 'Summary'],
      examples: [
        {
          input: 'Seeking software engineering roles.',
          output: 'Passion for tech.',
          explanation: 'Connect goals to experiences.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `My passion for solving real-world problems through code, like building an e-commerce app, inspired my goal to become a software engineer. I aim to contribute to innovative tech solutions, as reflected in my projects.`,
        },
      ],
    },
    {
      id: 11,
      question: 'Why did you include extracurricular activities?',
      difficulty: 'Easy',
      description: 'Justify the inclusion of non-academic activities.',
      tags: ['Behavioral', 'Extracurricular'],
      examples: [
        {
          input: 'Coding club president.',
          output: 'Leadership skills.',
          explanation: 'Show transferable skills.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I included my role as coding club president to demonstrate leadership and teamwork. Organizing hackathons honed my ability to collaborate and manage projects, skills essential for the workplace.`,
        },
      ],
    },
    {
      id: 12,
      question: 'How did you format your resume for ATS compatibility?',
      difficulty: 'Medium',
      description: 'Explain your approach to Applicant Tracking Systems.',
      tags: ['Resume', 'Strategy'],
      examples: [
        {
          input: 'Used keywords.',
          output: 'ATS-friendly format.',
          explanation: 'Describe specific techniques.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I used standard section headings like "Education" and "Experience," incorporated job-specific keywords like "React" and "API," and avoided complex formatting like tables to ensure ATS compatibility.`,
        },
      ],
    },
    {
      id: 13,
      question: 'What feedback have you received on your resume?',
      difficulty: 'Medium',
      description: 'Discuss feedback and how you incorporated it.',
      tags: ['Behavioral', 'Resume'],
      examples: [
        {
          input: 'Mentor feedback.',
          output: 'Improved clarity.',
          explanation: 'Show adaptability.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `A mentor suggested my project descriptions were too vague. I revised them to include specific technologies and metrics, like "Built app using Next.js, reducing load time by 20%," improving clarity and impact.`,
        },
      ],
    },
    {
      id: 14,
      question: 'How does your resume reflect your technical skills?',
      difficulty: 'Medium',
      description: 'Explain how your resume showcases technical expertise.',
      tags: ['Resume', 'Skills'],
      examples: [
        {
          input: 'Listed JavaScript projects.',
          output: 'Technical proficiency.',
          explanation: 'Highlight relevant projects and skills.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `My resume lists projects like a real-time chat app built with React and WebSocket, showcasing JavaScript proficiency. The skills section includes technologies like Python and SQL, tailored to the job’s technical requirements.`,
        },
      ],
    },
    {
      id: 15,
      question: 'What makes your resume unique compared to others?',
      difficulty: 'Hard',
      description: 'Highlight what sets your resume apart.',
      tags: ['Resume', 'Strategy'],
      examples: [
        {
          input: 'Asked in a technical interview.',
          output: 'Unique projects and metrics.',
          explanation: 'Emphasize distinct achievements.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `My resume stands out with unique projects like a hackathon-winning chat app and quantified achievements, such as "improved performance by 30%." Its ATS-friendly format and tailored content align closely with job requirements.`,
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
    { title: 'What is Resume Building?', id: 'overview' },
    { title: 'Resume Components', id: 'components' },
    { title: 'Tips and Strategies', id: 'tips' },
    { title: 'Common Mistakes', id: 'mistakes' },
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Resume Building: A Comprehensive Guide</h1>
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
            aria-label="Navigate through resume building chapters"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What is Resume Building?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Resume Building</strong> is the process of creating a concise, professional document that showcases your education, skills, experience, and achievements to attract employers. A well-crafted resume is critical for securing interviews in placement drives and job applications.
            </p>
            <p>
              This guide covers essential components, strategies for ATS optimization, common pitfalls, and how to discuss your resume in interviews, tailored for companies like TCS, Infosys, and AMCAT.
            </p>
          </div>
        </section>

        <section id="components" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Resume Components</h2>
          <div className="space-y-8">
            {resumeComponents.map((component, index) => (
              <div key={index} className="border-l-4 border-[#0286a3] pl-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{component.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Explanation:</strong> {component.explanation}</p>
                <p className="text-gray-600 mb-2"><strong>Example:</strong> {component.example}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Sample Resume JSON Structure</h4>
            <div className="rounded-md overflow-hidden border border-gray-200">
              <SyntaxHighlighter
                language="json"
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
                {`{
  "contact": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone": "(123) 456-7890",
    "linkedin": "linkedin.com/in/johndoe"
  },
  "summary": "Final-year B.Tech student specializing in full-stack development...",
  "education": [
    {
      "degree": "B.Tech in Computer Science",
      "institution": "ABC University",
      "years": "2023-2027",
      "cgpa": "8.5/10"
    }
  ],
  "skills": ["JavaScript", "Python", "Communication"],
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Built a full-stack app using Next.js and MongoDB..."
    }
  ]
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        <section id="tips" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 3: Tips and Strategies</h2>
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
                          tip.category === 'Content'
                            ? 'bg-blue-100 text-blue-800'
                            : tip.category === 'Formatting'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
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
                        tips[activeTipTab].category === 'Content'
                          ? 'bg-blue-100 text-blue-800'
                          : tips[activeTipTab].category === 'Formatting'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
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

        <section id="mistakes" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: Common Mistakes</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {mistakes.map((mistake) => (
                  <div
                    key={mistake.id}
                    onClick={() => setActiveMistakeTab(mistake.id - 1)}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeMistakeTab === mistake.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <h3 className="font-medium">{mistake.title}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {mistakes.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4">{mistakes[activeMistakeTab].title}</h3>
                  <p className="text-gray-700 mb-4"><strong>Incorrect:</strong> {mistakes[activeMistakeTab].incorrect}</p>
                  <p className="text-gray-700 mb-4"><strong>Correct:</strong> {mistakes[activeMistakeTab].correct}</p>
                  <p className="text-gray-700 mb-6"><strong>Explanation:</strong> {mistakes[activeMistakeTab].explanation}</p>
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

export default ResumeBuildingBook;
