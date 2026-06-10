import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Search,
  Sparkles,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { logoutUser } from "../services/auth.service";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useAuth();
  const isDark = theme === "dark";

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await logoutUser(token);

      localStorage.removeItem("token");

      toast.success("Logged out successfully");

      navigate("/");

      window.location.reload();
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");

      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "bg-[#030712]/85 border-b border-white/10 backdrop-blur-xl py-3 shadow-lg"
            : "bg-white/85 border-b border-slate-200/80 backdrop-blur-xl py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <Lightbulb size={24} className="animate-pulse" />
          </div>

          <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
            Idea
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Hub
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="Discover ideas..."
              className={`pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/10 text-white placeholder-slate-500"
                  : "bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400"
              }`}
            />
            <Search
              size={18}
              className={`absolute left-3.5 top-2.5 transition-colors duration-300 ${isDark ? "text-slate-500" : "text-gray-400"}`}
            />
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-300 ${
              isDark ? "text-yellow-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className={`flex items-center gap-2 font-medium transition-colors duration-300 ${
                  isDark ? "text-slate-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <User size={18} />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-colors duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className={`font-medium transition-colors duration-300 ${
                  isDark ? "text-slate-300 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Log in
              </Link>

              <Link
                to="/register"
                className={`px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                  isDark
                    ? "bg-white hover:bg-slate-100 text-slate-900"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                <Sparkles size={16} />
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
