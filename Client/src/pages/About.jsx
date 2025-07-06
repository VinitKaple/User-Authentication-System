import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 bg-white text-gray-800 relative overflow-x-hidden">
      {/* Top Left Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 border border-gray-400 bg-white shadow-sm hover:shadow-md rounded-full px-5 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 transition-all absolute top-4 left-4 sm:top-6 sm:left-8 z-10"
      >
        <img src={assets.arrow_icon} alt="Back" className="w-4" />
        Back to Home
      </button>

      {/* Content */}
      <div className="max-w-3xl mx-auto mt-20 sm:mt-28 text-center animate-fade-in-up space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          About This Project 🔍
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          <strong>AuthSystem</strong> is a clean, minimal authentication demo built using the
          <span className="text-blue-600 font-semibold"> MERN Stack</span> — MongoDB, Express, React, and Node.js.
        </p>

        <div className="text-left bg-gray-50 border border-gray-200 rounded-lg shadow p-6 sm:p-8 space-y-4 text-gray-700 text-base sm:text-lg">
          <p className="font-semibold text-gray-800">✨ Features:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>🔐 Secure user registration with bcrypt hashing</li>
            <li>📥 Login with JWT token (httpOnly cookie)</li>
            <li>🛡️ Protected API routes using middleware</li>
            <li>📧 Password reset flow with OTP via email</li>
            <li>⚙️ Modular codebase, clean UI, responsive design</li>
          </ul>
        </div>

        <p className="text-base sm:text-lg text-gray-600">
          This website is created for students, developers and learners who want to master authentication in real-world MERN projects. It is professional, extensible, and beautifully styled using Tailwind CSS.
        </p>

        <div className="space-y-2">
          <p className="text-gray-700 text-base sm:text-lg">
            Developed by{" "}
            <a
              href="https://github.com/VinitKaple"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Vinit Kaple
            </a>
          </p>
          <p className="text-sm italic text-gray-500">
            “Secure code is professional code.” 🚀
          </p>
          {/* Contact Us Section */}
<div className="mt-16 max-w-xl mx-auto text-center animate-fade-in-up">
  <h2 className="text-2xl font-semibold text-gray-800 mb-2">📩 Contact Us</h2>
  <p className="text-sm text-gray-600 mb-4">
    Have suggestions or feedback? We'd love to hear from you.
  </p>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      alert("Thanks for reaching out!");
    }}
    className="flex flex-col sm:flex-row gap-3 justify-center"
  >
    <input
      type="text"
      placeholder="Your message..."
      className="px-4 py-2 w-full sm:w-auto rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      required
    />
    <button
      type="submit"
      className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all"
    >
      Send
    </button>
  </form>
</div>

        </div>
      </div>
    </div>
    
  );

};

export default About;
