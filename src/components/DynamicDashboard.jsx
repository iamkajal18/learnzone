
'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bell, Home, BookOpen, TrendingUp, Edit, Users, User, Settings, 
  Target, Briefcase, Palette, Shield, LogOut, Camera, Award, Clock, 
  BarChart3, Zap, Star, ChevronRight, Activity, Trophy 
} from 'lucide-react';

const DynamicDashboard = () => {
  const [stats, setStats] = useState({
    skillsProgress: 0,
    coursesCompleted: 0,
    studyTime: 0,
    achievements: 0,
    totalCourses: 12,
    badges: 15,
    weeklyGoal: 30,
    currentStreak: 7
  });
  const [notifications, setNotifications] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [liveProgress, setLiveProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const progressRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        skillsProgress: Math.min(prev.skillsProgress + Math.random() * 2, 100),
        studyTime: prev.studyTime + Math.random() * 0.5,
        coursesCompleted: prev.coursesCompleted + (Math.random() > 0.98 ? 1 : 0)
      }));
      setLiveProgress(prev => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activityTypes = [
      { icon: BookOpen, text: 'Completed JavaScript module', time: '2 min ago' },
      { icon: Trophy, text: 'Earned React Badge', time: '1 hour ago' },
      { icon: Target, text: 'Reached daily goal', time: '3 hours ago' },
      { icon: Award, text: 'New achievement unlocked', time: '1 day ago' }
    ];
    const interval = setInterval(() => {
      const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      setActivities(prev => [
        { ...randomActivity, id: Date.now(), time: 'Just now' },
        ...prev.slice(0, 4)
      ]);
    }, 10000);
    setActivities(activityTypes.map((activity, index) => ({
      ...activity,
      id: index,
      time: activity.time
    })));
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setNotifications(prev => prev + 1);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const dashboardCards = [
    {
      icon: BarChart3,
      title: 'Skills Progress',
      subtitle: 'Track your learning journey',
      value: Math.round(stats.skillsProgress),
      suffix: '%',
      secondaryValue: stats.totalCourses,
      secondaryLabel: 'Skills',
      color: 'from-[#0286a3] to-[#03a9c7]',
      progress: stats.skillsProgress
    },
    {
      icon: BookOpen,
      title: 'Active Courses',
      subtitle: 'Continue your learning',
      value: stats.coursesCompleted,
      suffix: '',
      secondaryValue: stats.totalCourses,
      secondaryLabel: 'Enrolled',
      color: 'from-[#0286a3] to-[#03a9c7]',
      progress: (stats.coursesCompleted / stats.totalCourses) * 100
    },
    {
      icon: Award,
      title: 'Achievements',
      subtitle: 'Your milestones',
      value: stats.badges,
      suffix: '',
      secondaryValue: stats.achievements,
      secondaryLabel: 'Certificates',
      color: 'from-[#0286a3] to-[#03a9c7]',
      progress: 85
    },
    {
      icon: Clock,
      title: 'Study Time',
      subtitle: 'This week\'s progress',
      value: Math.round(stats.studyTime),
      suffix: 'h',
      secondaryValue: stats.weeklyGoal,
      secondaryLabel: 'Goal',
      color: 'from-[#0286a3] to-[#03a9c7]',
      progress: (stats.studyTime / stats.weeklyGoal) * 100
    }
  ];

  const liveStats = [
    { label: 'Online Users', value: '1,234', change: '+12%', color: 'text-[#0286a3]' },
    { label: 'Active Sessions', value: '856', change: '+5%', color: 'text-[#0286a3]' },
    { label: 'Completion Rate', value: '94%', change: '+2%', color: 'text-[#0286a3]' },
    { label: 'Avg. Score', value: '87', change: '+8%', color: 'text-[#0286a3]' }
  ];

  const navItems = [
    { name: 'Home', icon: Home, active: activeTab === 'home' },
    { name: 'Courses', icon: BookOpen, active: activeTab === 'courses' },
    { name: 'Success Guide', icon: TrendingUp, active: activeTab === 'guide' },
    { name: 'Blog', icon: Edit, active: activeTab === 'blog' },
    { name: 'Placement Prep', icon: Users, active: activeTab === 'placement' }
  ];

  const profileMenuItems = [
    { icon: User, label: 'Profile Settings', action: () => console.log('Profile') },
    { icon: Target, label: 'Learning Goals', action: () => console.log('Goals') },
    { icon: BookOpen, label: 'My Courses', action: () => console.log('Courses') },
    { icon: Briefcase, label: 'Career Path', action: () => console.log('Career') },
    { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
    { icon: Palette, label: 'Preferences', action: () => console.log('Preferences') },
    { icon: Shield, label: 'Privacy & Security', action: () => console.log('Privacy') },
    { icon: LogOut, label: 'Sign Out', action: () => console.log('Sign Out') }
  ];

  const handleCardClick = (cardIndex) => {
    if (cardRefs.current[cardIndex]) {
      cardRefs.current[cardIndex].style.transform = 'scale(0.95)';
      setTimeout(() => {
        cardRefs.current[cardIndex].style.transform = 'scale(1)';
      }, 150);
    }
  };

  const FloatingShapes = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#0286a3]/10 animate-pulse"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 4 + 3}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0286a3] via-[#035a6d] to-[#013a4e] relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 max-w-7xl mx-auto p-5">
        <header className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse opacity-50" />
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0286a3] to-[#03a9c7] rounded-xl flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform cursor-pointer">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-white text-2xl font-bold">LearnLive</span>
            </div>
            <nav className="flex gap-6">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name.toLowerCase())}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    item.active
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.name}</span>
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="w-5 h-5 text-white" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#0286a3] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-white font-semibold">Kajal Kasaudhan</div>
                    <div className="text-white/70 text-sm">kasaudhankajal51@gmail.com</div>
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0286a3] to-[#03a9c7] rounded-full flex items-center justify-center text-white font-bold">
                      KK
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      isOnline ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {liveStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                  <div className={`text-xs ${stat.color} font-semibold`}>{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {dashboardCards.map((card, index) => (
                <div
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  onClick={() => handleCardClick(index)}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{card.subtitle}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-3xl font-bold text-white">
                          {card.value}{card.suffix}
                        </div>
                        <div className="text-white/70 text-sm uppercase tracking-wider">
                          {card.secondaryValue} {card.secondaryLabel}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 bg-gradient-to-r ${card.color} rounded-full transition-all duration-1000 relative overflow-hidden`}
                        style={{ width: `${Math.min(card.progress, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Live Activity Feed
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white/70 text-sm">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#0286a3] to-[#03a9c7] rounded-full flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{activity.text}</div>
                      <div className="text-white/60 text-sm">{activity.time}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 sticky top-5">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0286a3] to-[#03a9c7] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    KK
                  </div>
                  <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Kajal Kasaudhan</h3>
                  <p className="text-white/70 text-sm">Premium Member</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white/70 text-xs">Level 7</span>
                  </div>
                </div>
              </div>
              <div className="mb-6 p-4 bg-white/5 rounded-xl">
                <div className="text-white/70 text-sm mb-1">Current Time</div>
                <div className="text-white font-mono text-lg">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 hover:translate-x-1 group"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Recent Achievements
                </h4>
                <div className="space-y-3">
                  {[
                    { title: 'JavaScript Master', desc: 'Completed advanced JS course', time: '2h ago' },
                    { title: 'Week Streak', desc: '7 days continuous learning', time: '1d ago' },
                    { title: 'Quiz Champion', desc: 'Perfect score on React quiz', time: '3d ago' }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#0286a3] to-[#03a9c7] rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{achievement.title}</div>
                        <div className="text-white/60 text-xs">{achievement.desc}</div>
                      </div>
                      <div className="text-white/50 text-xs">{achievement.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDashboard;
