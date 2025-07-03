'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';
import { useTheme } from './ThemeContext'; // Assuming ThemeContext is set up
import { Moon, Sun, ChevronDown, Menu, X, User, LogOut, Home, BookOpen, Video, MessageSquare, BarChart } from 'lucide-react';

// Types for NavItem props
interface NavItemProps {
  href: string;
  theme: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll for navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.mobile-menu-toggle')
      ) {
        setNavOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle sign-out with toast notification
  const handleSignOut = async () => {
    toast.success('Signed out successfully', { duration: 2000 });
    await signOut({ callbackUrl: '/' });
    localStorage.setItem('isFirstVisit', 'true');
  };

  return (
    <>
      <Toaster position="top-right" />
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          theme === 'light'
            ? 'bg-white/80 backdrop-blur-md border-gray-100'
            : 'bg-gray-900/80 backdrop-blur-md border-gray-800'
        } ${scrolled ? 'shadow-lg' : 'shadow-none'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="LearnLive Logo"
                  className="h-10 w-10 rounded-lg transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
              </div>
             <span
  className="text-transparent bg-clip-text font-bold text-2xl"
  style={{ backgroundImage: 'linear-gradient(to right, #00cfd1, #0286a3)' }}
>
  LearnLive
</span>



            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <ul className="flex flex-row space-x-1 list-none">
                <NavItem href="/" theme={theme} icon={<Home size={18} />}>
                  Home
                </NavItem>
                <NavItem href="/studyplan" theme={theme} icon={<BookOpen size={18} />}>
                  Success Guide
                </NavItem>
                <NavItem href="/roadmap" theme={theme} icon={<BookOpen size={18} />}>
                  Courses
                </NavItem>
                <NavItem href="/quizform" theme={theme} icon={<Video size={18} />}>
                  AI Interview
                </NavItem>
                <NavItem href="/placementpre" theme={theme} icon={<MessageSquare size={18} />}>
                  Placement Prep
                </NavItem>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </ul>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {status === 'authenticated' ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 ${
                      theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
                    }`}
                    aria-expanded={isDropdownOpen}
                    aria-label="User menu"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user?.image}
                        alt="User photo"
                        className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-white transition-all"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
                        }`}
                      >
                        <User size={18} className={theme === 'light' ? 'text-blue-600' : 'text-blue-300'} />
                      </div>
                    )}
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl overflow-hidden transform origin-top-right transition-all duration-300 animate-slide-in ${
                        theme === 'light' ? 'bg-white' : 'bg-gray-800'
                      }`}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p
                          className={`font-semibold text-base truncate ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}
                        >
                          {session.user?.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                      <ul className="py-2 list-none">
                        <li>
                          <Link
                            href="/admin-dashboard"
                            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white ${
                              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                            }`}
                          >
                            <BarChart size={16} className="mr-2" />
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/profile/${session.user?.email}`}
                            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white ${
                              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                            }`}
                          >
                            <User size={16} className="mr-2" />
                            Profile Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-red-500 hover:text-white ${
                              theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                            }`}
                          >
                            <LogOut size={16} className="mr-2" />
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/signin"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105`}
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setNavOpen(!isNavOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 mobile-menu-toggle ${
                  theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700'
                }`}
                aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
              >
                {isNavOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            ref={navRef}
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isNavOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden mobile-menu`}
          >
            <ul
              className={`flex flex-col p-4 rounded-xl list-none ${
                theme === 'light' ? 'bg-white' : 'bg-gray-900'
              }`}
            >
              <NavItem href="/" theme={theme} icon={<Home size={18} />}>
                Home
              </NavItem>
              <NavItem href="/studyplan" theme={theme} icon={<BookOpen size={18} />}>
                Success Guide
              </NavItem>
              <NavItem href="/roadmap" theme={theme} icon={<BookOpen size={18} />}>
                Courses
              </NavItem>
              <NavItem href="/quizform" theme={theme} icon={<Video size={18} />}>
                AI Interview
              </NavItem>
              <NavItem href="/placementpre" theme={theme} icon={<MessageSquare size={18} />}>
                Placement Prep
              </NavItem>
              <li>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Inline CSS for Animations and Gradient Hover */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        .gradient-hover {
          position: relative;
          overflow: hidden;
        }
        .gradient-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .gradient-hover:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </>
  );
};

// NavItem Component
const NavItem: React.FC<NavItemProps> = ({ href, theme, icon, children }) => (
  <li>
    <Link
      href={href}
      className={`relative flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 group gradient-hover ${
        theme === 'light'
          ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          : 'text-gray-200 hover:bg-gray-800 hover:text-blue-400'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  </li>
);

// ThemeToggle Component
const ThemeToggle: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <li>
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-start w-full lg:w-auto px-3 py-2 rounded-lg transition-all duration-300 group text-sm font-medium ${
        theme === 'light'
          ? 'text-gray-700 hover:bg-blue-50'
          : 'text-gray-200 hover:bg-gray-800'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="relative w-6 h-6 flex items-center justify-center mr-2">
        <Moon
          size={20}
          className={`absolute transition-opacity duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
        />
        <Sun
          size={20}
          className={`absolute transition-opacity duration-300 ${theme === 'light' ? 'opacity-0' : 'opacity-100'}`}
        />
      </span>
      <span className="lg:hidden">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      <span
        className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block ${
          theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  </li>
);

export default Navbar;