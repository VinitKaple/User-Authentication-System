import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

//   "email": "officialvinitt@gmail.com",
//   "otp": "123456",
//   "newPassword": "newSecurePass123"
// }

const Login = () => {
  const [state, setState] = useState("SignUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
const handleSubmit = async (e) => {
  e.preventDefault();
  toast.success("✅ Demo-Login Successful");
  setTimeout(() => {
    navigate("/");
  }, 1500);
};


  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 to-purple-400 relative">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Auth Card */}
      <div className="bg-slate-900 p-8 sm:p-10 rounded-xl shadow-xl w-full sm:w-96 text-indigo-300 transition-all duration-500">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "SignUp" ? "Create Account 👨‍💻" : "Welcome back 🚀"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "SignUp"
            ? "Start your journey by signing up."
            : "Login to continue building!"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Field (only for SignUp) */}
          {state === "SignUp" && (
            <div className="flex items-center gap-2 bg-[#333a5c] rounded-full px-4 py-2 mb-4">
              <img src={assets.person_icon} alt="person" className="w-5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-100"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex items-center gap-2 bg-[#333a5c] rounded-full px-4 py-2">
              <img src={assets.mail_icon} alt="email" className="w-5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-100"
                required
              />
            </div>
            <p className="text-xs text-indigo-200 ml-2">
              We'll never share your email.
            </p>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex items-center gap-2 bg-[#333a5c] rounded-full px-4 py-2">
              <img src={assets.lock_icon} alt="lock" className="w-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-indigo-100"
                required
              />
            </div>
            <div className="flex justify-between px-2 text-xs text-indigo-200 mt-1">
              <span>Minimum 5 characters required</span>
              {state === "Login" && (
                <span
                  className="text-indigo-400 underline"
                >
                  Forgot Password?
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all"
          >
            {state === "SignUp" ? "Sign Up" : "Login"}
          </button>

          {/* Toggle Between Login and SignUp */}
          <p className="mt-4 text-center text-indigo-200 text-sm">
            {state === "SignUp"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              className="text-indigo-400 underline cursor-pointer"
              onClick={() => setState(state === "SignUp" ? "Login" : "SignUp")}
            >
              {state === "SignUp" ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>

        {/* Footer Note */}
        <p className="text-xs text-center text-indigo-200 mt-6">
          🔐 This demo visually explains the user authentication system.
        </p>
      </div>
    </div>
  );
};

export default Login;
