import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const codeSnippets = [
  {
    title: "📝 1. Signup Controller",
    code: `// controllers/authController.js
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  generateToken(newUser._id, res);
  res.status(201).json({ success: true, name: newUser.name });
};`,
  },
  {
    title: "🔐 2. Login Controller",
    code: `// controllers/authController.js
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  generateToken(user._id, res);
  res.status(200).json({ success: true, name: user.name });
};`,
  },
  {
    title: "🚪 3. Logout Controller",
    code: `// controllers/authController.js
export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};`,
  },
  {
    title: "🛡️ 4. Protect Route (Middleware)",
    code: `// middleware/authMiddle.js
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};`,
  },
  {
    title: "📁 5. Auth Routes (Express Router)",
    code: `// routes/authRoutes.js
import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddle.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protected", protectRoute, (req, res) => {
  res.json({ message: "This is protected" });
});

export default router;`,
  },
  {
    title: "🧠 6. Token Generator",
    code: `// config/utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};`,
  },
];

const ViewCodes = () => {
  const navigate = useNavigate();

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("📋 Code copied!");
    } catch (error) {
      toast.error("❌ Failed to copy");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-16 py-6 bg-white text-gray-800">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🔐 Auth System Code Snippets</h1>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          🔙Home
        </button>
        
      </div>

      {/* Code Snippets */}
      <div className="space-y-10">
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-md animate-fade-in-up"
          >
            <h2 className="text-lg font-semibold mb-3 text-blue-700">
              {snippet.title}
            </h2>

            <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto text-sm leading-relaxed font-mono whitespace-pre-wrap text-black">
              {snippet.code}
            </pre>

            <div className="mt-4 text-right">
              <button
                onClick={() => handleCopy(snippet.code)}
                className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
              >
                📋 Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-gray-500">
        Built with 💻 Node.js, Express, MongoDB, and JWT. Keep learning!
      </p>
    </div>
  );
};

export default ViewCodes;
