import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createIdea, getIdeaById, updateIdea } from "../services/idea.service";
import api from "../services/api";
import {
  Lightbulb,
  Bookmark,
  MessageCircle,
  TrendingUp,
  PlusCircle,
  Settings,
  LogOut,
  Home,
  ArrowLeft,
  Sparkles,
  Sun,
  Moon,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* ─── Stars background (matches Profile/Login) ───────────────── */
const StarField = () =>
  [...Array(70)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full animate-pulse"
      style={{
        width: `${Math.random() * 3}px`,
        height: `${Math.random() * 3}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.1,
      }}
    />
  ));

/* ─── Sidebar nav item ───────────────────────────────────────── */
const NavItem = ({ icon: Icon, label, active, onClick }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-all duration-150 border-l-2 ${
        active
          ? isDark
            ? "bg-violet-500/15 text-white border-violet-400"
            : "bg-violet-500/10 text-violet-600 border-violet-500 font-semibold"
          : isDark
            ? "text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5"
            : "text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

/* ─── Glassmorphism card wrapper ─────────────────────────────── */
const GlassCard = ({ children, className = "" }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  return (
    <div
      className={`backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white/70 border-slate-200/60 shadow-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CreateIdea = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const { theme, toggleTheme, notifications, unreadCount, markAllAsRead, markAsRead } = useAuth();
  const isDark = theme === "dark";

  const [showNotifications, setShowNotifications] = useState(false);
  const notifDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    references: "",
  });

  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data.user || null);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }

      if (isEditMode) {
        try {
          setLoading(true);
          const ideaRes = await getIdeaById(id);
          const idea = ideaRes.idea;
          if (idea) {
            setFormData({
              title: idea.title || "",
              description: idea.description || "",
              category: idea.category || "",
              tags: idea.tags ? idea.tags.join(", ") : "",
              references: idea.references || "",
            });
          }
        } catch (error) {
          console.error("Idea fetch error:", error);
          toast.error("Failed to load idea details for editing");
          navigate("/profile?section=myIdeas");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchInitialData();
  }, [navigate, id, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        references: formData.references || null,
      };

      if (isEditMode) {
        await updateIdea(id, payload, token);
        toast.success("Idea updated successfully");
      } else {
        await createIdea(payload, token);
        toast.success("Idea created successfully");
      }

      navigate("/profile?section=myIdeas");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || `Failed to ${isEditMode ? "update" : "create"} idea`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-slate-800"}`} style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Stars ──────────────────────────────────────────────── */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <StarField />
        </div>
      )}

      {/* ── Background glow blobs (matches Login/Profile) ──────────────── */}
      <div className={`fixed top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none z-0 transition-colors duration-500 ${isDark ? "bg-yellow-400/5" : "bg-yellow-500/3"}`} />
      <div className={`fixed bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none z-0 transition-colors duration-500 ${isDark ? "bg-violet-600/8" : "bg-violet-500/4"}`} />

      {/* ── SIDEBAR ────────────────────────────────────────────── */}
      <aside className={`fixed top-0 left-0 h-screen w-56 z-50 flex flex-col backdrop-blur-xl border-r transition-all duration-300 ${isDark ? "bg-[#030712]/80 border-white/8 text-white" : "bg-white/80 border-slate-200 text-slate-700"}`}>

        {/* Logo */}
        <div className={`flex items-center gap-3 px-5 py-5 border-b ${isDark ? "border-white/8" : "border-slate-200"}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-base">
            💡
          </div>
          <span className={`font-bold text-[15px] tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>IdeaHub</span>
        </div>

        {/* Nav */}
        <div className="mt-3 flex flex-col gap-0.5">
          <p className={`px-5 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[.12em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>Main</p>
          <NavItem icon={Home} label="Dashboard" active={false} onClick={() => navigate("/profile?section=dashboard")} />
          <NavItem icon={Lightbulb} label="My Ideas" active={false} onClick={() => navigate("/profile?section=myIdeas")} />
          <NavItem icon={Bookmark} label="Saved" active={false} onClick={() => navigate("/profile?section=savedIdeas")} />

          <p className={`px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[.12em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>Activity</p>
          <NavItem icon={MessageCircle} label="Comments" active={false} onClick={() => navigate("/profile?section=comments")} />
          <NavItem icon={TrendingUp} label="Explore Ideas" active={false} onClick={() => navigate("/profile?section=allIdeas")} />
          <NavItem icon={Settings} label="Settings" active={false} onClick={() => navigate("/profile?section=settings")} />
          
          <p className={`px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[.12em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>Preferences</p>
          <NavItem
            icon={isDark ? Sun : Moon}
            label={isDark ? "Light Theme" : "Dark Theme"}
            active={false}
            onClick={toggleTheme}
          />
        </div>

        {/* Footer */}
        <div className={`mt-auto p-5 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg uppercase shadow-sm">
              {userProfile?.name?.charAt(0) || "U"}
            </div>

            <div>
              <h4 className={`font-semibold truncate max-w-[120px] ${isDark ? "text-white" : "text-slate-800"}`}>
                {userProfile?.name || "User"}
              </h4>

              <p className={`text-xs truncate max-w-[120px] ${isDark ? "text-slate-400" : "text-slate-500"}`} title={userProfile?.email}>
                {userProfile?.email || "Idea Creator"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <main className="flex-1 ml-56 relative z-10 min-h-screen">
        <div className="w-full px-8 py-10 max-w-4xl mx-auto">

          {/* Top Header bar for notifications */}
          <div className="flex justify-between items-center mb-6 relative z-[90]">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors group ${
                isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifDropdownRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2.5 rounded-xl transition-all duration-300 relative border backdrop-blur-md hover:scale-105 ${
                  isDark
                    ? "bg-[#030712]/40 border-white/10 text-slate-300 hover:text-blue-400 hover:bg-white/5"
                    : "bg-white/60 border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm"
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
                        onClick={markAllAsRead}
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
                          className={`p-4 border-b border-inherit last:border-b-0 cursor-pointer transition-colors text-left hover:bg-slate-100/50 dark:hover:bg-white/5 ${
                            group.hasUnread
                              ? isDark ? "bg-violet-500/5" : "bg-violet-50/50"
                              : ""
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
                                  <span className={isDark ? "text-slate-400" : "text-slate-655"}>
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
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className={`text-3xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-slate-850"}`}>
              {isEditMode ? "Update Idea" : "Create New Idea"} <Sparkles size={20} className="text-yellow-400" />
            </h1>
            <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {isEditMode ? "Modify your shared concept or project details." : "Share your innovative thoughts and insights with the world."}
            </p>
          </div>

          {/* Form Card */}
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-[.12em] mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a descriptive title..."
                  className={`w-full border rounded-xl p-4 outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-slate-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                  }`}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-[.12em] mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Description
                </label>
                <textarea
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your idea, concept, or project in detail..."
                  className={`w-full border rounded-xl p-4 outline-none transition-all resize-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-slate-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                  }`}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-[.12em] mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full border rounded-xl p-4 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all cursor-pointer ${
                    isDark
                      ? "bg-[#0d1527] border-white/10 text-white"
                      : "bg-white border-slate-200 text-slate-900 shadow-sm"
                  }`}
                  required
                >
                  <option value="" className={isDark ? "bg-[#0d1527] text-slate-500" : "bg-white text-slate-400"}>Select Category</option>
                  <option value="Coding Concepts" className={isDark ? "bg-[#0d1527] text-white" : "bg-white text-slate-900"}>Coding Concepts</option>
                  <option value="Study Tips" className={isDark ? "bg-[#0d1527] text-white" : "bg-white text-slate-900"}>Study Tips</option>
                  <option value="Business Ideas" className={isDark ? "bg-[#0d1527] text-white" : "bg-white text-slate-900"}>Business Ideas</option>
                  <option value="Life Hacks" className={isDark ? "bg-[#0d1527] text-white" : "bg-white text-slate-900"}>Life Hacks</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-[.12em] mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="React, Tailwind, Node.js"
                  className={`w-full border rounded-xl p-4 outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-slate-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                  }`}
                />
              </div>

              {/* References */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-[.12em] mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Reference Link
                </label>
                <input
                  type="url"
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  placeholder="https://example.com/project-resource"
                  className={`w-full border rounded-xl p-4 outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-slate-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-[1.01] active:scale-[0.99] text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  isDark ? "shadow-violet-500/25" : "shadow-md shadow-violet-500/15"
                }`}
              >
                <PlusCircle size={18} />
                {loading 
                  ? isEditMode ? "Updating..." : "Publishing..."
                  : isEditMode ? "Update Idea" : "Publish Idea"}
              </button>

            </form>
          </GlassCard>

        </div>
      </main>

    </div>
  );
};

export default CreateIdea;