import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContent); // ✅ use isLoggedin only

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-36 px-4">
      {/* Robot Image */}
      <img
        src={assets.header_img}
        alt="Robot"
        className="w-40 sm:w-56 mb-6 animate-bounce"
      />

      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        Hello Developer!
        <img
          src={assets.hand_wave}
          alt="Waving Hand"
          className="w-8 sm:w-10 inline-block"
        />
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-base sm:text-lg max-w-xl mb-6">
        Welcome to{" "}
        <span className="font-semibold text-gray-800">AuthSystem</span> — your
        go-to place to understand how authentication works in web development!
      </p>

      {/* Conditional Buttons */}
      {!isLoggedin ? (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Get Started <img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => handleNavigate("/view-codes")}
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            View Codes <img src={assets.arrow_icon} alt="Arrow Icon" />
          </button>
          <button
            onClick={() => handleNavigate("/about")}
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            About <img src={assets.arrow_icon} alt="Arrow Icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;


