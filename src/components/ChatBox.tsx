// components/Chatbot.tsx (fixed typing animation: clears previous interval before new send, slower typing speed for natural feel)
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Send, Bot, User, Pause } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useTheme } from "next-themes";
import { debounce } from 'lodash';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Welcome to the Chatbot! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const { theme } = useTheme();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const SKIP_ANIMATION_THRESHOLD = 50;
  const TYPING_SPEED_MS = 30; // Slower for natural typing (adjust as needed)

  // Cleanup function to stop typing
  const stopTyping = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTyping(false);
    setTypedText('');
  }, []);

  useEffect(() => {
    if (!isTyping || messages.length === 0) return;

    const botMessageIndex = messages.length - 1;
    const botMessage = messages[botMessageIndex];
    if (botMessage.role !== 'model') return;

    // Skip for short messages
    if (botMessage.text.length <= SKIP_ANIMATION_THRESHOLD) {
      setTypedText(botMessage.text);
      stopTyping();
      return;
    }

    let currentIndex = 0;
    setTypedText('');

    intervalRef.current = setInterval(() => {
      if (Date.now() - lastInteraction > 30000) {
        stopTyping();
        return;
      }

      setTypedText((prev) => prev + botMessage.text[currentIndex]);
      currentIndex++;
      if (currentIndex === botMessage.text.length) {
        stopTyping();
      }
    }, TYPING_SPEED_MS);

    return () => {
      stopTyping();
    };
  }, [isTyping, lastInteraction, messages.length, stopTyping]); // Add messages.length to re-run only on new bot message

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Stop any ongoing typing before new send
    stopTyping();

    setLastInteraction(Date.now());
    const userMessage = { role: 'user', text: input };

    // Prepare history from conversation (exclude initial welcome)
    const chatHistory = messages
      .slice(1)  // Skip welcome
      .filter((msg) => msg.role !== 'model' || messages.indexOf(msg) < messages.length - 1)
      .map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: chatHistory }),
      });

      // Always parse JSON, even on error status
      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [...prev, { role: 'model', text: data.error }]);
      } else {
        const botMessage = { role: 'model', text: data.response };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(true);
      }
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

  const debouncedSetInput = useCallback(
    debounce((value: string) => {
      setInput(value);
    }, 100),
    []
  );

  const handleInputChange = (e: any) => {
    debouncedSetInput(e.target.value);
    setLastInteraction(Date.now());
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    setLastInteraction(Date.now());
  };

  const handleStop = () => {
    stopTyping();
    setLastInteraction(Date.now());
  };

  const handleNewChat = () => {
    stopTyping();
    setMessages([{ role: 'model', text: 'Welcome to the Chatbot! How can I assist you today?' }]);
    setInput('');
    setIsLoading(false);
    setLastInteraction(Date.now());
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-blue-600 dark:bg-blue-800 shadow-md border-b border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-700 dark:bg-blue-900 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">AI Chatbot</h1>
            <p className="text-sm text-blue-100 dark:text-blue-200">Always here to help</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-100">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50 dark:bg-gray-800 scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </div>
              <div
                className={`flex flex-col max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-400/30 rounded-br-md'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-600 rounded-bl-md'
                  }`}
                >
                  <MarkdownRenderer
                    content={
                      msg.role === 'model' && isTyping && index === messages.length - 1
                        ? typedText || msg.text
                        : msg.text
                    }
                    className={msg.role === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-100'}
                  />
                </div>
                <span
                  className={`text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg">
                <TypingAnimation>...</TypingAnimation>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full p-3 sm:p-4 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200 hover:border-gray-400 min-h-[50px] max-h-32 scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600"
                placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                disabled={isLoading}
                rows={1}
                style={{ height: 'auto', minHeight: '50px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              {input.trim() && !isLoading && (
                <button
                  onClick={handleSend}
                  className="absolute right-2 bottom-2 p-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
            {isTyping && (
              <button
                onClick={handleStop}
                className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-105"
              >
                <Pause className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleNewChat}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-105"
            >
              New Chat
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span>{input.length}/1000</span>
          </div>
        </div>
      </div>
    </div>
  );
}