'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer'; // Adjust the import path as needed

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Welcome to the Chatbot! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Prevent auto-scrolling
  useEffect(() => {
    // Commented out to prevent auto-scrolling
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message to the chat
    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      const botMessage = { role: 'model', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-blue-600 shadow-md border-b border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-700 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">AI Chatbot</h1>
            <p className="text-sm text-blue-100">Always here to help</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-100">Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-400">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => {
            if (index === 0 && msg.role === 'model') {
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex flex-col max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl items-start">
                    
                    <span className="text-xs text-gray-500 mt-1 px-2">AI Assistant</span>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700'
                }`}>
                  {msg.role === 'user' ? 
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : 
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  }
                </div>

                {/* Message Bubble with Markdown */}
                <div className={`flex flex-col max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`px-4 py-3 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-400/30 rounded-br-md'
                      : 'bg-white text-gray-800 border-gray-200 rounded-bl-md'
                  }`}>
                    <MarkdownRenderer 
                      content={msg.text}
                      className={`${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}
                    />
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 px-2 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white shadow-md border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-3 sm:p-4 pr-12 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 resize-none transition-all duration-200 hover:border-gray-400 min-h-[50px] max-h-32 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-400"
                placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                disabled={isLoading}
                rows={1}
                style={{ 
                  height: 'auto',
                  minHeight: '50px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              {input.trim() && !isLoading && (
                <button
                  onClick={handleSend}
                  className="absolute right-2 bottom-2 p-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span>{input.length}/1000</span>
          </div>
        </div>
      </div>
    </div>
  );
}