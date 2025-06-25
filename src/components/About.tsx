"use client";

import React from "react";

const AboutSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-purple-700 to-indigo-900 text-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Empowering Education for the Future</h2>
        <p className="text-lg md:text-xl mb-10 leading-relaxed">
          Our platform bridges the gap between learners and educators through real-time, interactive classes using cutting-edge technologies like <span className="font-semibold">WebRTC</span>, <span className="font-semibold">Socket.IO</span>, and a powerful <span className="font-semibold">Next.js</span> front-end. We offer role-based access, enabling students, instructors, and admins to collaborate effectively in a modern learning ecosystem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold mb-2">🚀 Fast & Secure</h3>
            <p>Backed by PostgreSQL and JWT/NextAuth authentication, our system ensures speed and safety.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold mb-2">📡 Real-Time Interaction</h3>
            <p>Live video, chat, and signaling with WebRTC + Socket.IO for a seamless experience.</p>
          </div>
          <div className="bg-white text-black p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold mb-2">🎓 Personalized Learning</h3>
            <p>Progress tracking, course management, and advanced analytics for success-driven learning.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;