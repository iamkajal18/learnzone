"use client";

import React from "react";
import { CheckCircle, Video, Users, MessageCircle, BarChart2, ToggleLeft } from "lucide-react";

const services = [
  {
    icon: <Video className="w-8 h-8 text-purple-700" />,
    title: "Live Video Streaming",
    description: "Peer-to-peer video with WebRTC ensuring real-time, high-quality video for instructors and students."
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-purple-700" />,
    title: "Real-Time Chat",
    description: "Chat instantly with Socket.IO—grouped per session—enhancing communication in class."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-purple-700" />,
    title: "Authentication & Role Access",
    description: "JWT or NextAuth-based secure login with role-specific dashboard (student, instructor, admin)."
  },
  {
    icon: <Users className="w-8 h-8 text-purple-700" />,
    title: "Course Creation & Enrollment",
    description: "Instructors upload, manage, and publish courses. Students enroll and access learning materials."
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-purple-700" />,
    title: "Progress Analytics",
    description: "Students can track completed videos, quizzes, and live session attendance visually."
  },
  {
    icon: <ToggleLeft className="w-8 h-8 text-purple-700" />,
    title: "Stream Toggle & Session Control",
    description: "Instructor controls: start/stop stream, mute/unmute audio, end class for all."
  },
];

const OurServices = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
        <p className="text-gray-600 text-lg mb-10">
          Everything you need to deliver world-class virtual learning experiences, all in one place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
