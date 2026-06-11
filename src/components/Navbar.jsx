import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Search,
  Sparkles,
  User,
  LogOut,
  Sun,
  Moon,
  Bell,
} from "lucide-react";
import { logoutUser } from "../services/auth.service";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme, notifications, unreadCount, markAllAsRead, markAsRead } = useAuth();
  const isDark = theme === "dark";

  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error("Error marking all read:", error);
    }
  };

  const handleNotificationClick = async (ideaId, notifIds) => {
    if (notifIds.length > 0) {
      try {
        await Promise.all(notifIds.map(id => markAsRead(id)));
      } catch (error) {
        console.error("Error marking read:", error);
      }
    }
    setShowNotifications(false);
    navigate(`/idea/${ideaId}`);
  };

  const groupNotificationsByPost = (notifications) => {
    const groups = {};
    notifications.forEach(n => {
      const ideaId = n.ideaId;
      if (!groups[ideaId]) {
        groups[ideaId] = {
          ideaId,
          title: n.idea?.title || "Unknown Idea",
          items: [],
          notifIds: [],
          hasUnread: false,
        };
      }
      groups[ideaId].items.push(n);
      groups[ideaId].notifIds.push(n.id);
      if (!n.isRead) {
        groups[ideaId].hasUnread = true;
      }
    });
    return Object.values(groups);
  };

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
              {/* Notification Bell */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-xl transition-all duration-300 relative ${
                    isDark ? "text-slate-300 hover:text-blue-400 hover:bg-white/5" : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                  }`}
                  title="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-3 w-80 max-h-[400px] overflow-y-auto rounded-2xl border backdrop-blur-xl z-50 shadow-2xl flex flex-col transition-all duration-300 ${
                    isDark ? "bg-[#030712]/95 border-white/10 text-white" : "bg-white/95 border-slate-200 text-slate-800"
                  }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-inherit">
                      <span className="text-sm font-bold">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className={`text-xs font-semibold hover:underline ${isDark ? "text-violet-400" : "text-violet-600"}`}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Notification list */}
                    <div className="flex-1 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className={`p-8 text-center text-sm ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                          No notifications yet
                        </div>
                      ) : (
                        groupNotificationsByPost(notifications).map((group) => (
                          <div
                            key={group.ideaId}
                            onClick={() => handleNotificationClick(group.ideaId, group.notifIds)}
                            className={`p-4 border-b border-inherit last:border-b-0 cursor-pointer transition-colors ${
                              group.hasUnread
                                ? isDark ? "bg-violet-500/5 hover:bg-violet-500/10" : "bg-violet-50/50 hover:bg-violet-100/50"
                                : "hover:bg-slate-100/50 dark:hover:bg-white/5"
                            }`}
                          >
                            <div className={`text-[10px] font-extrabold tracking-wider uppercase mb-1.5 ${
                              isDark ? "text-violet-400" : "text-violet-600"
                            }`}>
                              Post: {group.title}
                            </div>
                            <div className="flex flex-col gap-2">
                              {group.items.map((item) => (
                                <div key={item.id} className="flex items-start gap-2.5 text-xs">
                                  <span className="mt-0.5 text-sm leading-none flex-shrink-0">
                                    {item.type === "LIKE" ? "❤️" : "💬"}
                                  </span>
                                  <div>
                                    <span className="font-semibold">{item.actor?.name}</span>{" "}
                                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>
                                      {item.type === "LIKE" ? "liked your post" : `commented: "${item.comment?.content || ""}"`}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

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
