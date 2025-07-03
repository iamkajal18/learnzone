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

type GDTopic = {
  id: number;
  title: string;
  category: 'Social' | 'Technology' | 'Business' | 'Current Affairs';
  description: string;
  keyPoints: string;
  strategy: string;
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

const GroupDiscussionBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('text');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeTopicTab, setActiveTopicTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const subtopics: Subtopic[] = [
    {
      name: 'Initiating the Discussion',
      explanation: 'Starting a group discussion with a clear, concise introduction sets the tone and demonstrates leadership.',
      useCases: 'Leading GDs in interviews, establishing discussion focus.',
    },
    {
      name: 'Contributing Effectively',
      explanation: 'Sharing relevant, well-reasoned points with evidence strengthens your position and adds value.',
      useCases: 'Demonstrating knowledge, influencing group opinions.',
    },
    {
      name: 'Handling Conflicts',
      explanation: 'Resolving disagreements constructively through active listening and diplomacy maintains group harmony.',
      useCases: 'Mediating disputes, fostering collaboration.',
    },
    {
      name: 'Time Management',
      explanation: 'Balancing speaking time and allowing others to contribute ensures a productive discussion within time limits.',
      useCases: 'Keeping GDs on track, meeting deadlines.',
    },
    {
      name: 'Summarizing Points',
      explanation: 'Concluding with a summary of key points demonstrates clarity and leadership.',
      useCases: 'Closing GDs, reinforcing group consensus.',
    },
    {
      name: 'Active Participation',
      explanation: 'Engaging consistently with relevant inputs and responses shows involvement and enthusiasm.',
      useCases: 'Standing out in interviews, building rapport.',
    },
    {
      name: 'Listening Skills',
      explanation: 'Actively listening to others’ views and responding thoughtfully builds consensus and respect.',
      useCases: 'Understanding perspectives, collaborative discussions.',
    },
    {
      name: 'Persuasion Techniques',
      explanation: 'Using logical arguments and emotional appeals to influence opinions effectively.',
      useCases: 'Leading discussions, convincing stakeholders.',
    },
    {
      name: 'Body Language',
      explanation: 'Using confident posture, eye contact, and gestures to reinforce your points non-verbally.',
      useCases: 'Projecting confidence, engaging the group.',
    },
    {
      name: 'Virtual GD Etiquette',
      explanation: 'Adapting communication for online platforms, including clear audio, camera use, and digital professionalism.',
      useCases: 'Remote interviews, virtual team discussions.',
    },
  ];

  const practiceProblems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Initiate a Group Discussion',
      difficulty: 'Easy',
      description: 'Start a group discussion on the topic: “Impact of Social Media on Society.”',
      tags: ['Initiation', 'Group Discussion'],
      examples: [
        {
          input: 'Topic: Impact of Social Media on Society',
          output: 'A clear, concise opening statement.',
          explanation: 'Introduce the topic, provide context, and invite opinions.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Good morning, everyone. Today, we’re discussing the impact of social media on society. It’s a double-edged sword, connecting people globally while raising concerns about privacy and mental health. I believe it amplifies voices but can also spread misinformation. What are your thoughts?`,
        },
      ],
    },
    {
      id: 2,
      title: 'Conflict Resolution in GD',
      difficulty: 'Hard',
      description: 'Mediate a disagreement between two participants on prioritizing AI vs. traditional skills.',
      tags: ['Conflict Resolution', 'Mediation'],
      examples: [
        {
          input: 'One participant prioritizes AI skills; another emphasizes traditional skills.',
          output: 'A mediated solution finding common ground.',
          explanation: 'Acknowledge both views and propose a balanced perspective.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I understand both perspectives: AI skills are crucial for innovation, while traditional skills provide a strong foundation. Perhaps we can agree that a hybrid approach, blending both, prepares us for diverse roles. Can we discuss how to integrate them effectively?`,
        },
      ],
    },
    {
      id: 3,
      title: 'Summarize a GD',
      difficulty: 'Medium',
      description: 'Summarize key points from a discussion on “Work-from-Home vs. Office Work.”',
      tags: ['Summarization', 'Group Discussion'],
      examples: [
        {
          input: 'Topic: Work-from-Home vs. Office Work',
          output: 'A concise summary of group consensus.',
          explanation: 'Highlight key arguments and conclusions.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `To summarize, our discussion highlighted that work-from-home offers flexibility and cost savings but may hinder collaboration. Office work fosters teamwork but involves commuting. The group agrees a hybrid model balances both, leveraging technology for efficiency. Any final thoughts?`,
        },
      ],
    },
    {
      id: 4,
      title: 'Handle Interruptions',
      difficulty: 'Medium',
      description: 'Respond to a participant interrupting your point during a GD on climate change.',
      tags: ['Communication', 'Professionalism'],
      examples: [
        {
          input: 'You’re discussing climate policies, and someone interrupts.',
          output: 'A polite redirection to continue your point.',
          explanation: 'Acknowledge the interruption and regain control tactfully.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Thank you for your input. If I may continue, I was suggesting that stricter emission policies could drive sustainable innovation. I’d love to hear your thoughts once I finish this point.`,
        },
      ],
    },
    {
      id: 5,
      title: 'Persuade in a GD',
      difficulty: 'Hard',
      description: 'Convince the group to support renewable energy over fossil fuels.',
      tags: ['Persuasion', 'Group Discussion'],
      examples: [
        {
          input: 'Topic: Renewable Energy vs. Fossil Fuels',
          output: 'A persuasive argument with data and logic.',
          explanation: 'Use facts and emotional appeals to sway opinions.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Renewable energy is the future, as it reduces carbon emissions by up to 80% compared to fossil fuels, per recent studies. It also creates sustainable jobs—solar employment grew 20% last year. While fossil fuels are reliable now, their environmental cost is unsustainable. Can we prioritize long-term benefits?`,
        },
      ],
    },
    {
      id: 6,
      title: 'Virtual GD Etiquette',
      difficulty: 'Medium',
      description: 'Participate effectively in a virtual GD on digital education.',
      tags: ['Virtual Communication', 'Professionalism'],
      examples: [
        {
          input: 'Topic: Digital Education in the Future',
          output: 'A professional virtual contribution.',
          explanation: 'Use clear audio, camera, and concise points.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In this virtual discussion, I believe digital education enhances accessibility, with platforms like LearnLive reaching 10 million users globally. However, it requires robust infrastructure to bridge the digital divide. Ensuring clear communication and active engagement, like we’re doing now, is key. Your views?`,
        },
      ],
    },
    {
      id: 7,
      title: 'Balance Speaking and Listening',
      difficulty: 'Medium',
      description: 'Contribute to a GD on globalization while allowing others to speak.',
      tags: ['Active Listening', 'Participation'],
      examples: [
        {
          input: 'Topic: Globalization’s Impact',
          output: 'A balanced contribution inviting others.',
          explanation: 'Share a point and encourage group input.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Globalization boosts economic growth, with global trade increasing GDP by 10% in some nations. However, it can erode local cultures. I’d like to hear others’ perspectives on balancing economic benefits with cultural preservation.`,
        },
      ],
    },
  ];

  const gdTopics: GDTopic[] = [
    {
      id: 1,
      title: 'Impact of Artificial Intelligence on Jobs',
      category: 'Technology',
      description: 'Discuss whether AI will create or destroy job opportunities in the future.',
      keyPoints: 'Automation vs. job creation, reskilling needs, economic impacts.',
      strategy: 'Balance pros (new tech roles) and cons (job displacement), use data like “AI could automate 30% of jobs by 2030.”',
    },
    {
      id: 2,
      title: 'Work-from-Home vs. Office Work',
      category: 'Business',
      description: 'Evaluate the effectiveness of remote work compared to traditional office setups.',
      keyPoints: 'Productivity, collaboration, work-life balance, infrastructure costs.',
      strategy: 'Acknowledge flexibility of remote work and collaboration benefits of offices, propose hybrid models.',
    },
    {
      id: 3,
      title: 'Climate Change and Sustainable Development',
      category: 'Current Affairs',
      description: 'Discuss strategies for balancing economic growth with environmental sustainability.',
      keyPoints: 'Renewable energy, carbon emissions, green policies, economic trade-offs.',
      strategy: 'Use stats like “global emissions must drop 50% by 2030” and advocate for sustainable innovation.',
    },
    {
      id: 4,
      title: 'Social Media’s Role in Society',
      category: 'Social',
      description: 'Explore the positive and negative impacts of social media on communication and culture.',
      keyPoints: 'Connectivity, misinformation, mental health, privacy concerns.',
      strategy: 'Highlight connectivity benefits and address misinformation with examples like fake news spread.',
    },
    {
      id: 5,
      title: 'Digital Education: Future of Learning',
      category: 'Technology',
      description: 'Assess the potential of digital platforms in transforming education globally.',
      keyPoints: 'Accessibility, digital divide, engagement, quality of content.',
      strategy: 'Emphasize accessibility (e.g., “online courses reach 100 million users”) while addressing infrastructure gaps.',
    },
    {
      id: 6,
      title: 'Globalization vs. Localization',
      category: 'Business',
      description: 'Debate the merits of global integration versus preserving local economies and cultures.',
      keyPoints: 'Economic growth, cultural erosion, trade benefits, local job protection.',
      strategy: 'Balance global trade benefits with cultural preservation, cite examples like local business impacts.',
    },
    {
      id: 7,
      title: 'Universal Basic Income',
      category: 'Social',
      description: 'Discuss the feasibility and impact of implementing universal basic income.',
      keyPoints: 'Economic stability, automation impact, funding challenges, social equity.',
      strategy: 'Use pilot study results (e.g., Finland’s UBI trial) to support or critique feasibility.',
    },
    {
      id: 8,
      title: 'Ethics in Artificial Intelligence',
      category: 'Technology',
      description: 'Examine ethical considerations in AI development and deployment.',
      keyPoints: 'Bias in algorithms, privacy, accountability, job displacement.',
      strategy: 'Discuss real cases like biased hiring algorithms and propose ethical frameworks.',
    },
    {
      id: 9,
      title: 'Impact of 5G Technology',
      category: 'Technology',
      description: 'Evaluate how 5G will transform industries and connectivity.',
      keyPoints: 'Speed, IoT applications, infrastructure costs, privacy concerns.',
      strategy: 'Highlight benefits like IoT growth while addressing concerns like data security.',
    },
    {
      id: 10,
      title: 'Gender Equality in the Workplace',
      category: 'Social',
      description: 'Discuss measures to achieve gender equality in professional settings.',
      keyPoints: 'Pay gap, representation, policies, cultural barriers.',
      strategy: 'Cite stats like “women earn 82 cents for every dollar” and propose inclusive policies.',
    },
    {
      id: 11,
      title: 'Space Exploration vs. Earth’s Problems',
      category: 'Current Affairs',
      description: 'Debate prioritizing space exploration versus addressing terrestrial issues.',
      keyPoints: 'Scientific advancement, cost, climate change, resource allocation.',
      strategy: 'Balance innovation (e.g., Mars missions) with urgent needs like poverty alleviation.',
    },
    {
      id: 12,
      title: 'Cryptocurrency: Future of Finance',
      category: 'Business',
      description: 'Explore whether cryptocurrencies will replace traditional financial systems.',
      keyPoints: 'Decentralization, volatility, regulation, adoption rates.',
      strategy: 'Discuss adoption trends (e.g., Bitcoin’s market cap) and regulatory challenges.',
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'How do you prepare for a group discussion?',
      difficulty: 'Easy',
      description: 'Explain your approach to researching and practicing for a GD.',
      tags: ['Preparation', 'Group Discussion'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A structured preparation strategy.',
          explanation: 'Highlight research and practice techniques.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I prepare by researching the topic, gathering key facts, and anticipating counterarguments. For example, for a GD on AI, I’d study its impact on jobs, citing stats like “30% of jobs may be automated by 2030.” I practice speaking concisely and participate in mock GDs to build confidence.`,
        },
      ],
    },
    {
      id: 2,
      question: 'Describe a time you led a group discussion.',
      difficulty: 'Medium',
      description: 'Share a specific instance using the STAR method.',
      tags: ['Leadership', 'Behavioral'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A STAR-based response.',
          explanation: 'Focus on leadership and outcome.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In a college GD on renewable energy (Situation), I was tasked with leading the discussion (Task). I initiated with a clear overview, encouraged quieter members to speak, and summarized key points (Action). The group reached a consensus on hybrid energy solutions, earning positive feedback (Result).`,
        },
      ],
    },
    {
      id: 3,
      question: 'How do you handle a dominating participant in a GD?',
      difficulty: 'Medium',
      description: 'Explain your strategy for managing overbearing group members.',
      tags: ['Conflict Resolution', 'Professionalism'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A diplomatic approach.',
          explanation: 'Emphasize tact and group balance.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I politely acknowledge their input and redirect the discussion to include others, saying, “That’s a great point; let’s hear other perspectives to build on it.” In a recent GD, this approach ensured everyone contributed, maintaining a balanced discussion.`,
        },
      ],
    },
    {
      id: 4,
      question: 'What makes a good group discussion participant?',
      difficulty: 'Easy',
      description: 'Describe the qualities of an effective GD participant.',
      tags: ['Group Discussion', 'Soft Skills'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A list of key qualities.',
          explanation: 'Highlight communication and teamwork.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `A good GD participant listens actively, contributes relevant points, and respects others’ views. They maintain clarity, use evidence, and manage time effectively. For example, summarizing key points and encouraging quieter members fosters collaboration and drives productive discussions.`,
        },
      ],
    },
    {
      id: 5,
      question: 'How do you balance speaking and listening in a GD?',
      difficulty: 'Medium',
      description: 'Explain how you ensure active participation without dominating.',
      tags: ['Active Listening', 'Participation'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A balanced approach.',
          explanation: 'Show time management and empathy.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I contribute concise, relevant points and actively listen to others, responding to their ideas. For instance, in a GD on globalization, I shared data on trade benefits and then invited others’ views, ensuring I spoke for 20–30% of the time while encouraging quieter participants.`,
        },
      ],
    },
    {
      id: 6,
      question: 'Describe a time you resolved a conflict in a GD.',
      difficulty: 'Hard',
      description: 'Share a specific conflict resolution experience using STAR.',
      tags: ['Conflict Resolution', 'Behavioral'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A STAR-based response.',
          explanation: 'Highlight diplomacy and outcome.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `During a GD on AI ethics (Situation), two participants clashed over privacy concerns (Task). I mediated by acknowledging both views and proposing a focus on regulatory solutions (Action). The group agreed on a balanced approach, leading to a productive discussion (Result).`,
        },
      ],
    },
    {
      id: 7,
      question: 'How do you initiate a GD on a controversial topic?',
      difficulty: 'Medium',
      description: 'Explain your approach to starting a sensitive discussion.',
      tags: ['Initiation', 'Professionalism'],
      examples: [
        {
          input: 'Topic: Universal Basic Income',
          output: 'A neutral, engaging opening.',
          explanation: 'Set a constructive tone.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I start with a neutral, fact-based introduction: “Universal Basic Income aims to ensure economic stability but raises funding concerns. Studies like Finland’s trial show mixed results. Let’s explore its pros and cons.” This sets a constructive tone and invites diverse views.`,
        },
      ],
    },
    {
      id: 8,
      question: 'What strategies do you use to persuade in a GD?',
      difficulty: 'Hard',
      description: 'Describe how you influence group opinions effectively.',
      tags: ['Persuasion', 'Leadership'],
      examples: [
        {
          input: 'Topic: Renewable Energy',
          output: 'A persuasive strategy.',
          explanation: 'Use logic and emotional appeals.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I use data and emotional appeals to persuade. For example, in a GD on renewable energy, I cited that “solar power reduced emissions by 20% in 2024” and highlighted job creation, appealing to economic and environmental values. I also addressed counterarguments to build consensus.`,
        },
      ],
    },
    {
      id: 9,
      question: 'How do you summarize a GD effectively?',
      difficulty: 'Medium',
      description: 'Explain your approach to concluding a group discussion.',
      tags: ['Summarization', 'Leadership'],
      examples: [
        {
          input: 'Topic: Digital Education',
          output: 'A concise summary.',
          explanation: 'Capture key points and consensus.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I summarize by highlighting key arguments and the group’s consensus. For a GD on digital education, I’d say, “We discussed how digital platforms enhance accessibility but face infrastructure challenges. The group favors hybrid models to balance reach and quality.” This reinforces clarity and closure.`,
        },
      ],
    },
    {
      id: 10,
      question: 'How do you handle a GD where you lack topic knowledge?',
      difficulty: 'Hard',
      description: 'Describe your approach to contributing with limited knowledge.',
      tags: ['Adaptability', 'Problem-Solving'],
      examples: [
        {
          input: 'Topic: Cryptocurrency',
          output: 'A strategy for limited knowledge.',
          explanation: 'Focus on general insights and listening.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I listen actively to gather insights and contribute general points. For a cryptocurrency GD, I’d say, “While I’m learning about this topic, I understand it offers decentralization but faces volatility. What specific benefits do others see?” This shows engagement and invites input.`,
        },
      ],
    },
    {
      id: 11,
      question: 'How do you ensure clarity in a virtual GD?',
      difficulty: 'Medium',
      description: 'Explain your approach to effective communication in online GDs.',
      tags: ['Virtual Communication', 'Professionalism'],
      examples: [
        {
          input: 'Asked in a remote job interview.',
          output: 'A strategy for virtual GDs.',
          explanation: 'Highlight technical and communication skills.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I ensure clear audio, use a webcam, and speak concisely. In a virtual GD, I mute when not speaking, use visual cues like nodding, and summarize points clearly. For example, I led a virtual GD on 5G, ensuring all voices were heard via structured turn-taking.`,
        },
      ],
    },
    {
      id: 12,
      question: 'Describe a time you turned a chaotic GD into a productive one.',
      difficulty: 'Hard',
      description: 'Share an experience of managing a disorganized discussion.',
      tags: ['Leadership', 'Problem-Solving'],
      examples: [
        {
          input: 'Asked in a behavioral interview.',
          output: 'A STAR-based response.',
          explanation: 'Show leadership and structure.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `In a GD on social media (Situation), participants spoke over each other (Task). I suggested a turn-taking structure and summarized key points to refocus the group (Action). This led to a productive discussion with clear consensus on privacy concerns (Result).`,
        },
      ],
    },
    {
      id: 13,
      question: 'How do you handle disagreements without escalating tension?',
      difficulty: 'Medium',
      description: 'Explain your approach to managing conflicts calmly.',
      tags: ['Conflict Resolution', 'Emotional Intelligence'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A diplomatic conflict resolution strategy.',
          explanation: 'Emphasize calmness and collaboration.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I acknowledge differing views and find common ground. For example, in a GD, I said, “I see your point about cost; let’s explore how efficiency can address it.” This approach de-escalates tension and keeps the discussion collaborative and focused.`,
        },
      ],
    },
    {
      id: 14,
      question: 'What role does body language play in a GD?',
      difficulty: 'Easy',
      description: 'Discuss the importance of non-verbal communication in GDs.',
      tags: ['Body Language', 'Communication'],
      examples: [
        {
          input: 'Asked in an HR interview.',
          output: 'A response on non-verbal impact.',
          explanation: 'Highlight confidence and engagement.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Body language, like maintaining eye contact and confident posture, reinforces your points and shows engagement. In a GD, I used nodding and open gestures to encourage others, which improved group dynamics and made my contributions more impactful.`,
        },
      ],
    },
    {
      id: 15,
      question: 'How do you encourage quieter participants in a GD?',
      difficulty: 'Medium',
      description: 'Explain your strategy for involving less vocal group members.',
      tags: ['Leadership', 'Inclusivity'],
      examples: [
        {
          input: 'Asked in a leadership-focused interview.',
          output: 'A strategy for inclusivity.',
          explanation: 'Show empathy and facilitation skills.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `I actively invite quieter members by saying, “I’d love to hear [Name]’s thoughts on this.” In a GD on education, I noticed a quiet participant and asked for their view, which led to a valuable perspective on digital learning, enriching the discussion.`,
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
    { title: 'What is Group Discussion?', id: 'overview' },
    { title: 'Key GD Skills', id: 'subtopics' },
    { title: 'Practice Problems', id: 'problems' },
    { title: 'GD Topics', id: 'topics' },
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
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-100 min-h-screen">
      <header className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Group Discussion: A Comprehensive Guide</h1>
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
            aria-label="Navigate through group discussion chapters"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What is Group Discussion?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Group Discussion (GD)</strong> is a collaborative exercise where participants discuss a given topic, showcasing communication, leadership, and teamwork skills. It is widely used in placement interviews to assess candidates’ ability to articulate ideas and engage with others.
            </p>
            <p>
              GDs test critical thinking, conflict resolution, and the ability to contribute meaningfully under time constraints, making them a key component of professional evaluations.
            </p>
          </div>
        </section>

        <section id="subtopics" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Key GD Skills</h2>
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

        <section id="topics" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: GD Topics</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {gdTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setActiveTopicTab(topic.id - 1)}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeTopicTab === topic.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{topic.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          topic.category === 'Social'
                            ? 'bg-blue-100 text-blue-800'
                            : topic.category === 'Technology'
                            ? 'bg-green-100 text-green-800'
                            : topic.category === 'Business'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {topic.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {topic.keyPoints.split(', ').map((point, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {gdTopics.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{gdTopics[activeTopicTab].title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        gdTopics[activeTopicTab].category === 'Social'
                          ? 'bg-blue-100 text-blue-800'
                          : gdTopics[activeTopicTab].category === 'Technology'
                          ? 'bg-green-100 text-green-800'
                          : gdTopics[activeTopicTab].category === 'Business'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {gdTopics[activeTopicTab].category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{gdTopics[activeTopicTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Key Points:</h4>
                    <p className="text-gray-600">{gdTopics[activeTopicTab].keyPoints}</p>
                    <h4 className="font-medium text-lg">Strategy:</h4>
                    <p className="text-gray-600">{gdTopics[activeTopicTab].strategy}</p>
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

export default GroupDiscussionBook;