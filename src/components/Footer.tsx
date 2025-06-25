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
      className={`py-16 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-gray-200"
          : "bg-white text-black"
      }`}
      style={{
        backgroundImage: theme === "dark" ? "url('/image.png')" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2   md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-4 group">
              {theme === "dark" ? (
                <img
                  src="/logo.png" // Dark theme logo
                  className="h-12 w-12 rounded-full p-1 bg-gray-800 border border-gray-700"
                  alt="LearnLive Logo Dark"
                />
              ) : (
                <img
                  src="/logo.png"
                  className="h-12 w-12 rounded-full p-1 bg-white border border-gray-300"
                  alt="LearnLive Logo"
                />
              )}
              <span
                className={`self-center text-transparent bg-clip-text bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-blue-500 to-purple-600"
                    : "from-blue-500 to-purple-600"
                } lg:text-2xl text-xl font-bold whitespace-nowrap`}
              >
                LearnLive
              </span>
            </Link>
            <p
              className={`text-sm leading-relaxed max-w-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Empowering ideas through cutting-edge content and innovative
              solutions for a global audience.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3
              className={`text-xl font-semibold mb-6 tracking-wide ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Explore
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Our Services" },
                { href: "/testimonial", label: "Testimonials" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
         <div>
  <h3
    className={`text-xl font-semibold mb-6 tracking-wide ${
      theme === "dark" ? "text-white" : "text-black"
    }`}
  >
    Get in Touch
  </h3>
  <ul
    className={`space-y-4 text-sm  ${
      theme === "dark" ? "text-gray-400" : "text-gray-600"
    }`}
  >
    <li>
      Email:{" "}
      <Link
        href="mailto:kasaudhankajal51@gmail.com"
        className={`transition-colors duration-200 ${
          theme === "dark" ? "hover:text-white" : "hover:text-black"
        }`}
      >
        kasaudhankajal51@gmail.com
      </Link>
    </li>
    <li>
      Phone:{" "}
      <Link
        href="/"
        className={`transition-colors duration-200 ${
          theme === "dark" ? "hover:text-white" : "hover:text-black"
        }`}
      >
        6387486751
      </Link>
    </li>
    <li>Near BBD</li>
  </ul>
</div>

          {/* Social Media */}
          <div>
            <h3
              className={`text-xl font-semibold mb-6 tracking-wide ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Connect
            </h3>
            <div className="flex space-x-6 mb-6">
              {[
                {
                  href: "https://x.com/KajalKasau51",
                  icon: (
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/iamkajalkasaudhan/",
                  icon: (
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                },
                {
                  href: "https://github.com/iamkajal18",
                  icon: (
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.726-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.089-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492 0.997 0.108-0.775 0.418-1.305 0.76-1.605-2.665-0.305-5.466-1.332-5.466-5.931 0-1.31 0.469-2.381 1.236-3.221-0.123-0.303-0.535-1.524 0.117-3.176 0 0 1.008-0.322 3.3 1.23 0.957-0.266 1.98-0.399 3-0.404 1.02 0.005 2.043 0.138 3 0.404 2.289-1.552 3.294-1.23 3.294-1.23 0.654 1.653 0.243 2.874 0.12 3.176 0.77 0.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.625-5.479 5.922 0.429 0.369 0.823 1.096 0.823 2.211 0 1.596-0.015 2.883-0.015 3.276 0 0.321 0.216 0.694 0.825 0.576 4.765-1.589 8.2-6.086 8.2-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transform hover:scale-110 transition-all duration-200 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            {/* Newsletter Signup */}
           <form onSubmit={handleSubscribe} className="mt-4">
  <h4
    className={`text-sm font-semibold mb-2 ${
      theme === "dark" ? "text-gray-300" : "text-gray-700"
    }`}
  >
    Subscribe to our newsletter
  </h4>
  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200 border-gray-700"
          : "bg-white text-gray-900 border-gray-300"
      } border`}
    />
    <button
      type="submit"
      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
    >
      Subscribe
    </button>
  </div>
  {message && (
    <p
      className={`mt-2 text-sm ${
        message.includes("success")
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {message}
    </p>
  )}
</form>
          </div>
        </div>

        <hr
          className={`my-10 ${
            theme === "dark" ? "border-gray-800" : "border-gray-300"
          }`}
        />

        <div
          className={`flex flex-col md:flex-row justify-between items-center text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span className="text-center md:text-left">
            © {currentYear}{" "}
            <Link
              href="/"
              className={`transition-colors duration-200 ${
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              }`}
            >
              LearnLive
            </Link>
            . All Rights Reserved.
            <p
              className={`transition-colors duration-200 ${
                theme === "dark" ? "hover:text-white" : "hover:text-black"
              }`}
            >
              Designed with ❤ by Kajal Kasaudhan
            </p>
          </span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
