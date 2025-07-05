"use client";
import React, { useState } from "react";
import { useTheme } from "./ThemeContext"; // Assuming ThemeContext is set up
import Link from "next/link";

function Footer() {
  const { theme } = useTheme(); // Get theme from context
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email format.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.message || "Subscription failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative py-20 overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#00cfd1] to-[#0286a3] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#0286a3] to-[#00cfd1] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className={`absolute inset-0 ${theme === "dark" ? "opacity-5" : "opacity-3"}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 207, 209, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 207, 209, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section - Enhanced */}
          <div className="space-y-8 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <img
                  src="/logo.png"
                  className={`relative h-14 w-14 rounded-full p-2 transition-all duration-300 group-hover:scale-110 ${
                    theme === "dark"
                      ? "bg-gray-800/80 border-2 border-gray-700 group-hover:border-[#00cfd1]"
                      : "bg-white/80 border-2 border-gray-200 group-hover:border-[#0286a3]"
                  }`}
                  alt="LearnLive Logo"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00cfd1] to-[#0286a3] text-2xl lg:text-3xl font-bold tracking-tight">
                  LearnLive
                </span>
                <span className={`text-xs font-medium tracking-widest ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  INNOVATE • LEARN • GROW
                </span>
              </div>
            </Link>
            <p className={`text-sm leading-relaxed max-w-xs ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Empowering minds through cutting-edge technology and innovative solutions. 
              Join our community of learners and creators building the future.
            </p>
            
            {/* Stats Section */}
            <div className="flex space-x-6">
              {[
                { number: "10K+", label: "Learners" },
                { number: "500+", label: "Courses" },
                { number: "50+", label: "Countries" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00cfd1] to-[#0286a3]">
                    {stat.number}
                  </div>
                  <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links - Enhanced */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold tracking-wide relative ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Explore
              <div className="absolute bottom-0 left-0 h-0.5 w-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/about", label: "About Us", icon: "👥" },
                { href: "/services", label: "Our Services", icon: "🚀" },
                { href: "/testimonial", label: "Testimonials", icon: "💬" },
                { href: "/contact", label: "Contact Us", icon: "📞" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center space-x-3 text-sm transition-all duration-300 hover:translate-x-2 ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Enhanced */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold tracking-wide relative ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Get in Touch
              <div className="absolute bottom-0 left-0 h-0.5 w-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className={`flex items-center space-x-3 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📧</span>
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <Link
                    href="mailto:kasaudhankajal51@gmail.com"
                    className={`hover:text-[#00cfd1] transition-colors duration-300`}
                  >
                    kasaudhankajal51@gmail.com
                  </Link>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📱</span>
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <Link
                    href="tel:6387486751"
                    className={`hover:text-[#00cfd1] transition-colors duration-300`}
                  >
                    6387486751
                  </Link>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📍</span>
                </div>
                <div>
                  <div className="font-medium">Location</div>
                  <div>Near BBD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter - Enhanced */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold tracking-wide relative ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Stay Connected
              <div className="absolute bottom-0 left-0 h-0.5 w-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full"></div>
            </h3>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                {
                  href: "https://x.com/KajalKasau51",
                  icon: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  label: "Twitter"
                },
                {
                  href: "https://www.linkedin.com/in/iamkajalkasaudhan/",
                  icon: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                  label: "LinkedIn"
                },
                {
                  href: "https://github.com/iamkajal18",
                  icon: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.726-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.089-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492 0.997 0.108-0.775 0.418-1.305 0.76-1.605-2.665-0.305-5.466-1.332-5.466-5.931 0-1.31 0.469-2.381 1.236-3.221-0.123-0.303-0.535-1.524 0.117-3.176 0 0 1.008-0.322 3.3 1.23 0.957-0.266 1.98-0.399 3-0.404 1.02 0.005 2.043 0.138 3 0.404 2.289-1.552 3.294-1.23 3.294-1.23 0.654 1.653 0.243 2.874 0.12 3.176 0.77 0.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.625-5.479 5.922 0.429 0.369 0.823 1.096 0.823 2.211 0 1.596-0.015 2.883-0.015 3.276 0 0.321 0.216 0.694 0.825 0.576 4.765-1.589 8.2-6.086 8.2-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                  label: "GitHub"
                },
              ].map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    theme === "dark"
                      ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white"
                      : "bg-white/50 hover:bg-white/80 text-gray-600 hover:text-gray-900"
                  }`}
                  title={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter Signup - Enhanced */}
            <div className="space-y-4">
              <h4 className={`text-sm font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                💌 Subscribe to our newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#00cfd1] focus:border-transparent transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gray-800/50 text-gray-200 border-gray-700 placeholder-gray-500"
                        : "bg-white/80 text-gray-900 border-gray-200 placeholder-gray-400"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00cfd1]/10 to-[#0286a3]/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00cfd1]/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00cfd1] focus:ring-offset-2"
                >
                  Subscribe Now ✨
                </button>
                {message && (
                  <div className={`text-sm px-3 py-2 rounded-lg ${
                    message.includes("success")
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative my-12">
          <div className={`absolute inset-0 flex items-center ${
            theme === "dark" ? "opacity-20" : "opacity-30"
          }`}>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00cfd1] to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className={`px-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
              <div className="w-8 h-8 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Enhanced */}
        <div className={`flex flex-col lg:flex-row justify-between items-center text-sm space-y-4 lg:space-y-0 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <span>© {currentYear}</span>
              <Link
                href="/"
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00cfd1] to-[#0286a3] hover:from-[#0286a3] hover:to-[#00cfd1] transition-all duration-300"
              >
                LearnLive
              </Link>
              <span>• All Rights Reserved</span>
            </div>
            <div className="mt-2 flex items-center justify-center lg:justify-start space-x-2">
              <span>Designed with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>by</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00cfd1] to-[#0286a3]">
                Kajal Kasaudhan
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm transition-all duration-300 hover:text-[#00cfd1] ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#00cfd1] to-[#0286a3] transition-all duration-300 hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;