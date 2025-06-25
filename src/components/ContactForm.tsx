'use client';

import { useState } from 'react';
import { useTheme } from './ThemeContext';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function ContactForm() {
  const { data: session } = useSession();
  const { theme } = useTheme();

  const userName = session?.user?.name ?? '';
  const userEmail = session?.user?.email ?? '';

  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    message: 'Hi there, I love LearnLive!...',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: userName, email: userEmail, message: '' });
        setStatus('Message sent successfully!');
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-850 rounded-3xl shadow-xl border border-indigo-100 dark:border-gray-700 overflow-hidden">
        {/* Left side info block */}
        <div className="p-12 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-900 flex flex-col justify-center text-center lg:text-left space-y-6">
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-indigo-700 dark:text-indigo-300">Connect with LearnLive</h3>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">We’re Here to Help</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Got a question about our courses, need technical support, or want to collaborate? Reach out, and our team will respond promptly.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Support Hours:</p>
            <p className="font-medium text-gray-800 dark:text-white">Monday – Friday, 9 AM – 6 PM IST</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email: <a href="mailto:support@learnlive.com" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">support@learnlive.com</a></p>
          </div>
        </div>

        {/* Right side form */}
        <div className="p-12">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1.5 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1.5 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="you@learnlive.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="mt-1.5 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                placeholder="Tell us how we can assist you..."
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Send Message
            </button>

            {status && (
              <div
                className={`text-center text-sm font-medium ${
                  status === 'Sending...' ? 'text-yellow-600' : status.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}