import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ViewCodes from "./pages/ViewCodes";     // ✅ Import this
import About from "./pages/About";             // ✅ Import this
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Add this if not already

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/view-codes" element={<ViewCodes />} />  {/* ✅ New Route */}
        <Route path="/about" element={<About />} />            {/* ✅ New Route */}
      </Routes>
    </div>
  );
};

export default App;

