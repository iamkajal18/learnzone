"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testimonial, setTestimonial] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, testimonial });

    try {
      const response = await axios.post("/api/feed-back", {
        name,
        email,
        testimonial,
      });

      if (response.data.success) {
        alert("Thank you for your feedback!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    
    <div className="bg-gray-50 py-14 px-4 md:px-8">
      <div className="text-center mb-6 my-8">
        <h1 className="text-2xl md:text-2xl font-bold text-black">
          <span className="text-yellow-600">Share</span> Your Experience
        </h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl text-center border border-gray-200 w-full text-black"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Testimonial"
              className="w-full p-3 border rounded-lg h-32"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-600 text-black py-2 px-6 rounded-lg hover:bg-yellow-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
