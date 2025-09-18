"use client";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Content Dashboard</h1>
      <div className="flex items-center gap-4">
        {/* Theme control placeholder (removed dark mode) */}
        <span className="text-gray-500 text-sm">Theme: Light</span>
        {/* Profile icon */}
        <FaUserCircle className="text-3xl text-gray-400" />
      </div>
    </nav>
  );
};

export default Navbar;
