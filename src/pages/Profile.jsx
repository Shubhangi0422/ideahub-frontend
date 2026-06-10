import { useEffect, useState } from "react";
import {
  Lightbulb,
  Bookmark,
  MessageCircle,
  TrendingUp,
  PlusCircle,
  ChevronRight,
  User,
  Clock,
  Sparkles,
  ArrowUpRight,
  Home,
  Settings,
  Sun,
  Moon,
  Edit,
  Heart,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import { LogOut } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getAllIdeas } from "../services/idea.service";
import {
  getMyIdeas,
  getMyComments,
  getMySavedIdeas,
  updateUserProfile,
  changeUserPassword,
  getMyLikes,
} from "../services/user.service";
import { saveIdea, unsaveIdea } from "../services/savedIdea.service";
import { likeIdea, unlikeIdea, getLikesCount } from "../services/like.service";
import { getComments, addComment } from "../services/comment.service";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";




/* ─── Stars background (matches Login) ───────────────────────── */
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
const GlassCard = ({ children, className = "", onClick, ...props }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white/70 border-slate-200/60 shadow-sm"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/* ─── Stat card ──────────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, color }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  const colorMap = {
    violet: { bg: "bg-violet-500/15", text: "text-violet-400", bar: "bg-violet-500", glow: "shadow-violet-500/20" },
    cyan: { bg: "bg-cyan-400/15", text: "text-cyan-400", bar: "bg-cyan-400", glow: "shadow-cyan-400/20" },
    emerald: { bg: "bg-emerald-400/15", text: "text-emerald-400", bar: "bg-emerald-400", glow: "shadow-emerald-400/20" },
    orange: { bg: "bg-orange-400/15", text: "text-orange-400", bar: "bg-orange-400", glow: "shadow-orange-400/20" },
  };
  const c = colorMap[color] || colorMap.violet;
  return (
    <GlassCard className={`p-5 relative overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer shadow-lg ${isDark ? c.glow : ""}`}>
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${c.bar}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[.12em] mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
          <p className={`text-4xl font-bold tabular-nums ${isDark ? "text-white" : "text-slate-800"}`}>{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${isDark ? c.text : "text-violet-600"}`}>
          <Icon size={20} />
        </div>
      </div>
    </GlassCard>
  );
};

/* ─── Badge ──────────────────────────────────────────────────── */
const Badge = ({ children, color = "violet" }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  const map = {
    violet: isDark ? "bg-violet-500/20 text-violet-300" : "bg-violet-50 text-violet-600 border border-violet-100",
    cyan: isDark ? "bg-cyan-400/20 text-cyan-300" : "bg-cyan-50 text-cyan-600 border border-cyan-100",
    emerald: isDark ? "bg-emerald-400/20 text-emerald-300" : "bg-emerald-50 text-emerald-600 border border-emerald-100",
    pink: isDark ? "bg-pink-500/20 text-pink-300" : "bg-pink-50 text-pink-600 border border-pink-100",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[.1em] uppercase ${map[color] || map.violet}`}>
      {children}
    </span>
  );
};

/* ─── Idea card ──────────────────────────────────────────────── */
const IdeaCard = ({ idea, accent = "violet", onEdit, onClick }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  return (
    <GlassCard 
      onClick={onClick || (() => navigate(`/idea/${idea.id}`))}
      className={`p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 cursor-pointer group ${isDark ? "hover:border-white/20" : "hover:border-slate-300 hover:shadow-md"}`}
    >
      <div className="flex items-start justify-between">
        <Badge color={accent}>{idea.category || "General"}</Badge>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {onEdit && (
            <button
              onClick={() => onEdit(idea.id)}
              className={`p-1.5 rounded-lg transition-all ${
                isDark 
                  ? "hover:bg-white/10 text-slate-400 hover:text-violet-400" 
                  : "hover:bg-slate-100 text-slate-500 hover:text-violet-600"
              }`}
              title="Edit Idea"
            >
              <Edit size={14} />
            </button>
          )}
          <ArrowUpRight size={14} className={`transition-colors ${isDark ? "text-slate-600 group-hover:text-violet-400" : "text-slate-400 group-hover:text-violet-600"}`} />
        </div>
      </div>
      <h3 className={`text-sm font-semibold leading-snug line-clamp-2 ${isDark ? "text-white" : "text-slate-800"}`}>{idea.title}</h3>
      {idea.description && (
        <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-655"}`}>{idea.description}</p>
      )}
      <div className={`flex items-center gap-1.5 text-[11px] pt-2 border-t ${isDark ? "text-slate-600 border-white/5" : "text-slate-400 border-slate-100"}`}>
        <Clock size={11} />
        <span>Just now</span>
      </div>
    </GlassCard>
  );
};

/* ─── Section header ─────────────────────────────────────────── */
const SectionHeader = ({ icon: Icon, title, subtitle, color = "violet" }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  const map = {
    violet: "bg-violet-500/15 text-violet-400",
    cyan: "bg-cyan-400/15 text-cyan-400",
    emerald: "bg-emerald-400/15 text-emerald-400",
    pink: "bg-pink-500/15 text-pink-400",
  };
  const lightMap = {
    violet: "bg-violet-50 text-violet-600",
    cyan: "bg-cyan-50 text-cyan-600",
    emerald: "bg-emerald-50 text-emerald-600",
    pink: "bg-pink-50 text-pink-600",
  };
  return (
    <div className={`flex items-center gap-3 mb-8 pb-5 border-b ${isDark ? "border-white/8" : "border-slate-200"}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? map[color] : lightMap[color]}`}>
        <Icon size={18} />
      </div>
      <div>
        <h2 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>{title}</h2>
        {subtitle && <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>}
      </div>
    </div>
  );
};

/* ─── Empty state ────────────────────────────────────────────── */
const EmptyState = ({ icon: Icon, title, body, cta }) => {
  const { theme } = useAuth();
  const isDark = theme === "dark";
  return (
    <div className={`text-center py-16 border border-dashed rounded-2xl ${isDark ? "border-white/10" : "border-slate-200 bg-slate-50/50"}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-white/5 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
        <Icon size={26} />
      </div>
      <h3 className={`text-base font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-755"}`}>{title}</h3>
      <p className={`text-sm max-w-xs mx-auto mb-5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{body}</p>
      {cta}
    </div>
  );
};

/* ─── Main component ─────────────────────────────────────────── */
const Profile = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAuth();
  const isDark = theme === "dark";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const location = useLocation();
  const [ideas, setIdeas] = useState([]);
  const [allIdeas, setAllIdeas] = useState([]);
  const [comments, setComments] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  /* ── Modal & Interaction States ────────────────────────────────── */
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [modalComments, setModalComments] = useState([]);
  const [modalLikesCount, setModalLikesCount] = useState(0);
  const [myLikes, setMyLikes] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => { fetchDashboard(); }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sec = params.get("section");
    if (sec) {
      setActiveSection(sec);
    }
  }, [location.search]);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const [ideasRes, commentsRes, savedRes, allIdeasRes, profileRes, likesRes] = await Promise.all([
        getMyIdeas(token),
        getMyComments(token),
        getMySavedIdeas(token),
        getAllIdeas(),
        api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        getMyLikes(token),
      ]);
      setIdeas(ideasRes.ideas || []);
      setComments(commentsRes.comments || []);
      setSavedIdeas(savedRes.savedIdeas || []);
      setAllIdeas(allIdeasRes.ideas || []);
      setUserProfile(profileRes.data.user || null);
      setMyLikes(likesRes.likes || []);
      setProfileForm({
        name: profileRes.data.user?.name || "",
        email: profileRes.data.user?.email || "",
      });
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardSilent = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const [ideasRes, commentsRes, savedRes, allIdeasRes, likesRes] = await Promise.all([
        getMyIdeas(token),
        getMyComments(token),
        getMySavedIdeas(token),
        getAllIdeas(),
        getMyLikes(token),
      ]);
      setIdeas(ideasRes.ideas || []);
      setComments(commentsRes.comments || []);
      setSavedIdeas(savedRes.savedIdeas || []);
      setAllIdeas(allIdeasRes.ideas || []);
      setMyLikes(likesRes.likes || []);
    } catch (error) {
      console.error("Failed silent refresh:", error);
    }
  };

  const handleOpenIdeaModal = async (idea) => {
    const activeIdea = idea.idea || idea;
    setSelectedIdea(activeIdea);
    setModalComments([]);
    setModalLikesCount(0);
    setNewCommentText("");

    try {
      const [commentsRes, likesRes] = await Promise.all([
        getComments(activeIdea.id),
        getLikesCount(activeIdea.id),
      ]);
      setModalComments(commentsRes.comments || []);
      setModalLikesCount(likesRes.likesCount || 0);
    } catch (error) {
      console.error("Error fetching modal details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedIdea(null);
  };

  const handleToggleLike = async () => {
    if (!selectedIdea) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const hasLiked = myLikes.some((l) => l.ideaId === selectedIdea.id);
    setIsLiking(true);

    try {
      if (hasLiked) {
        await unlikeIdea(selectedIdea.id, token);
        toast.success("Like removed");
        setMyLikes(myLikes.filter((l) => l.ideaId !== selectedIdea.id));
        setModalLikesCount((prev) => Math.max(0, prev - 1));
      } else {
        await likeIdea(selectedIdea.id, token);
        toast.success("Idea liked!");
        setMyLikes([...myLikes, { ideaId: selectedIdea.id }]);
        setModalLikesCount((prev) => prev + 1);
      }
      fetchDashboardSilent();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update like status");
    } finally {
      setIsLiking(false);
    }
  };

  const handleToggleSave = async () => {
    if (!selectedIdea) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const hasSaved = savedIdeas.some((s) => s.ideaId === selectedIdea.id);
    setIsSaving(true);

    try {
      if (hasSaved) {
        await unsaveIdea(selectedIdea.id, token);
        toast.success("Idea removed from saved list");
        setSavedIdeas(savedIdeas.filter((s) => s.ideaId !== selectedIdea.id));
      } else {
        await saveIdea(selectedIdea.id, token);
        toast.success("Idea saved successfully!");
        setSavedIdeas([...savedIdeas, { ideaId: selectedIdea.id, idea: selectedIdea }]);
      }
      fetchDashboardSilent();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update save status");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePostCommentModal = async (e) => {
    e.preventDefault();
    if (!selectedIdea) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!newCommentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmittingComment(true);
    try {
      await addComment(selectedIdea.id, newCommentText, token);
      toast.success("Comment added successfully");
      setNewCommentText("");

      const commentsRes = await getComments(selectedIdea.id);
      setModalComments(commentsRes.comments || []);
      fetchDashboardSilent();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setUpdatingProfile(true);
      const res = await updateUserProfile(profileForm, token);
      toast.success(res.message || "Profile updated successfully");
      setUserProfile(res.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      setUpdatingPassword(true);
      const res = await changeUserPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }, token);
      toast.success(res.message || "Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  const filteredIdeas = selectedCategory
    ? allIdeas.filter((i) => i.category === selectedCategory)
    : allIdeas;

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredIdeas.length / ITEMS_PER_PAGE);
  const paginatedIdeas = filteredIdeas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-300 ${isDark ? "bg-[#030712] text-slate-400" : "bg-slate-50 text-slate-600"}`}>
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" />
        <p className="text-sm">Loading workspace…</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-slate-800"}`} style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Stars ──────────────────────────────────────────────── */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <StarField />
        </div>
      )}

      {/* ── Background glow blobs (matches Login) ──────────────── */}
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
          <NavItem icon={Home} label="Dashboard" active={activeSection === "dashboard"} onClick={() => setActiveSection("dashboard")} />
          <NavItem icon={Lightbulb} label="My Ideas" active={activeSection === "myIdeas"} onClick={() => setActiveSection("myIdeas")} />
          <NavItem icon={Bookmark} label="Saved" active={activeSection === "savedIdeas"} onClick={() => setActiveSection("savedIdeas")} />

          <p className={`px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[.12em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>Activity</p>
          <NavItem icon={MessageCircle} label="Comments" active={activeSection === "comments"} onClick={() => setActiveSection("comments")} />
          <NavItem icon={TrendingUp} label="Explore Ideas" active={activeSection === "allIdeas"} onClick={() => setActiveSection("allIdeas")} />
          <NavItem icon={Settings} label="Settings" active={activeSection === "settings"} onClick={() => setActiveSection("settings")} />
          
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
        <div className="w-full px-8 py-10">

          {/* ── DASHBOARD ──────────────────────────────────────── */}
          {activeSection === "dashboard" && (
            <div>

              {/* Greeting */}
              <div className="mb-8">
                <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-850"}`}>
                  {greeting}, <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? "from-violet-400 to-cyan-400" : "from-violet-600 to-cyan-600"}`}>{userProfile?.name || "Creator"}</span>
                </h1>
                <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Here's what's happening in your creative space.</p>
              </div>

              {/* Hero CTA banner */}
              <div className={`relative overflow-hidden rounded-2xl border p-6 mb-8 flex items-center justify-between gap-6 transition-all duration-300 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                {/* Golden rays (mini, matches Login) */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%,-50%) rotate(${i * 45}deg)` }}>
                      <div className={`w-[2px] h-[100px] bg-gradient-to-t from-yellow-400/30 to-transparent`} />
                    </div>
                  ))}
                </div>
                <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full blur-[50px] pointer-events-none ${isDark ? "bg-yellow-400/6" : "bg-yellow-400/4"}`} />

                <div className="relative z-10">
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] mb-1.5 ${isDark ? "text-violet-400" : "text-violet-600"}`}>Share knowledge</p>
                  <p className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-850"}`}>Got a fresh idea? The community is waiting.</p>
                  <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Turn your thoughts into posts that inspire others.</p>
                </div>
                <Link
                  to="/create"
                  className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-xl whitespace-nowrap hover:scale-[1.03] transition-transform duration-200 shadow-lg shadow-violet-500/25 flex-shrink-0"
                >
                  <PlusCircle size={16} /> Post Idea
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="My Ideas" value={ideas.length} icon={Lightbulb} color="violet" />
                <StatCard label="Saved" value={savedIdeas.length} icon={Bookmark} color="cyan" />
                <StatCard label="Comments" value={comments.length} icon={MessageCircle} color="emerald" />
                <StatCard label="Total Activity" value={ideas.length + savedIdeas.length + comments.length} icon={TrendingUp} color="orange" />
              </div>

              {/* Quick nav */}
              <p className={`text-[10px] font-bold uppercase tracking-[.12em] mb-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Quick navigation</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Create Idea", sub: "Share something new", icon: PlusCircle, color: "violet", href: "/create", action: null },
                  { label: "Saved Ideas", sub: `${savedIdeas.length} bookmarked`, icon: Bookmark, color: "cyan", href: null, action: () => setActiveSection("savedIdeas") },
                  { label: "My Comments", sub: `${comments.length} contributions`, icon: MessageCircle, color: "emerald", href: null, action: () => setActiveSection("comments") },
                ].map(({ label, sub, icon: Icon, color, href, action }) => {
                  const cmap = {
                    violet: { bg: "bg-violet-500/15", text: "text-violet-400" },
                    cyan: { bg: "bg-cyan-400/15", text: "text-cyan-400" },
                    emerald: { bg: "bg-emerald-400/15", text: "text-emerald-400" },
                  };
                  const c = cmap[color];
                  const inner = (
                    <GlassCard className={`p-4 flex items-center gap-3 hover:-translate-y-1 transition-all duration-200 cursor-pointer group ${isDark ? "hover:border-white/20" : "hover:border-slate-300 hover:shadow-md"}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.bg} ${c.text} flex-shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{label}</p>
                        <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{sub}</p>
                      </div>
                      <ChevronRight size={14} className={`transition-colors ${isDark ? "text-slate-600 group-hover:text-slate-300" : "text-slate-400 group-hover:text-slate-700"}`} />
                    </GlassCard>
                  );
                  return href ? (
                    <Link to={href} key={label} className="no-underline">{inner}</Link>
                  ) : (
                    <div key={label} onClick={action} className="no-underline">{inner}</div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── MY IDEAS ───────────────────────────────────────── */}
          {activeSection === "myIdeas" && (
            <GlassCard className="p-8">
              <SectionHeader icon={Lightbulb} color="violet" title="My Ideas" subtitle="All the ideas you've contributed to the community." />
              {ideas.length === 0 ? (
                <EmptyState
                  icon={Lightbulb}
                  title="No ideas yet"
                  body="Start sharing your knowledge with the community."
                  cta={
                    <Link to="/create" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] transition-transform">
                      <PlusCircle size={14} /> Create your first idea
                    </Link>
                  }
                />
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {ideas.map((idea) => (
                    <IdeaCard 
                      key={idea.id} 
                      idea={idea} 
                      accent="violet" 
                      onEdit={(id) => navigate(`/edit/${id}`)}
                      onClick={() => handleOpenIdeaModal(idea)}
                    />
                  ))}
                </div>
              )}
            </GlassCard>
          )}

          {/* ── SAVED IDEAS ────────────────────────────────────── */}
          {activeSection === "savedIdeas" && (
            <GlassCard className="p-8">
              <SectionHeader icon={Bookmark} color="cyan" title="Saved Ideas" subtitle="Your personal reading list of bookmarked ideas." />
              {savedIdeas.length === 0 ? (
                <EmptyState icon={Bookmark} title="Nothing saved yet" body="Explore the community and bookmark ideas that inspire you." />
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {savedIdeas.map((item) => (
                    <IdeaCard 
                      key={item.id} 
                      idea={item.idea || {}} 
                      accent="cyan" 
                      onClick={() => handleOpenIdeaModal(item.idea || {})}
                    />
                  ))}
                </div>
              )}
            </GlassCard>
          )}

          {/* ── COMMENTS ───────────────────────────────────────── */}
          {activeSection === "comments" && (
            <GlassCard className="p-8">
              <SectionHeader icon={MessageCircle} color="emerald" title="My Comments" subtitle="Discussions and insights you've contributed." />
              {comments.length === 0 ? (
                <EmptyState icon={MessageCircle} title="No comments yet" body="Join the conversation by commenting on ideas." />
              ) : (
                <div className={`flex flex-col divide-y ${isDark ? "divide-white/5" : "divide-slate-200/60"}`}>
                  {comments.map((comment) => (
                    <div key={comment.id} className="py-5 first:pt-0 last:pb-0 flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isDark ? "bg-emerald-400/15 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}>
                        <User size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-relaxed rounded-xl px-4 py-3 ${isDark ? "bg-white/5 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
                          {comment.content}
                        </p>
                        <div className={`flex items-center gap-1.5 mt-2 text-xs ${isDark ? "text-slate-600" : "text-slate-500"}`}>
                          <span>On:</span>
                          <span 
                            onClick={() => comment.idea && handleOpenIdeaModal(comment.idea)}
                            className={`hover:underline cursor-pointer truncate font-medium ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
                          >
                            {comment.idea?.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          )}

          {/* ── ALL IDEAS ──────────────────────────────────────── */}
          {activeSection === "allIdeas" && (
            <GlassCard className="p-8">
              <SectionHeader
                icon={Sparkles}
                color="violet"
                title={selectedCategory || "Browse by Category"}
                subtitle="Ideas shared by the community."
              />

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["All", "Coding Concepts", "Study Tips", "Business Ideas", "Life Hacks"].map((cat) => {
                  const isActive = (cat === "All" && !selectedCategory) || selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                        isActive
                          ? "bg-violet-500 text-white border border-violet-400 shadow-lg shadow-violet-500/25"
                          : isDark
                            ? "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10"
                            : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200/60"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {filteredIdeas.length === 0 ? (
                <EmptyState
                  icon={Lightbulb}
                  title="Nothing here yet"
                  body="Be the first to share an idea in this category."
                  cta={
                    <Link to="/create" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] transition-transform">
                      <PlusCircle size={14} /> Post an idea
                    </Link>
                  }
                />
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    {paginatedIdeas.map((idea) => (
                      <GlassCard 
                        key={idea.id} 
                        onClick={() => handleOpenIdeaModal(idea)}
                        className={`p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 cursor-pointer group ${isDark ? "hover:border-white/20" : "hover:border-slate-300 hover:shadow-md"}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold">
                            {idea.user?.name?.charAt(0) || "U"}
                          </div>
                          <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>{idea.user?.name || "Anonymous"}</span>
                        </div>
                        <h3 className={`text-sm font-semibold leading-snug line-clamp-2 ${isDark ? "text-white" : "text-slate-850"}`}>{idea.title}</h3>
                        {idea.description && (
                          <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{idea.description}</p>
                        )}
                        <div className={`flex items-center justify-between pt-2 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}>
                          <Badge color="violet">{idea.category}</Badge>
                          <span className={`text-xs flex items-center gap-0.5 transition-colors cursor-pointer ${isDark ? "text-slate-600 group-hover:text-violet-400" : "text-slate-400 group-hover:text-violet-600"}`}>
                            Read <ChevronRight size={12} />
                          </span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8 pt-5 border-t border-dashed border-white/5">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                          currentPage === 1
                            ? isDark
                              ? "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
                              : "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
                            : isDark
                              ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        const isActive = pageNum === currentPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all duration-200 ${
                              isActive
                                ? "bg-violet-500 text-white border border-violet-400 shadow-lg shadow-violet-500/25"
                                : isDark
                                  ? "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10"
                                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                          currentPage === totalPages
                            ? isDark
                              ? "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
                              : "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed"
                            : isDark
                              ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </GlassCard>
          )}

          {activeSection === "settings" && (
            <GlassCard className="p-8">

              <SectionHeader
                icon={Settings}
                color="violet"
                title="Account Settings"
                subtitle="Manage your profile and account preferences."
              />

              <div className="grid lg:grid-cols-2 gap-6">

                {/* Profile */}
                <form onSubmit={handleUpdateProfile} className={`border rounded-2xl p-6 transition-all duration-300 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>
                    Profile Information
                  </h3>

                  <div className="space-y-4">

                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-3 outline-none transition-colors duration-200 ${
                        isDark
                          ? "bg-slate-900 border-slate-700 text-white focus:border-violet-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      required
                    />

                    <input
                      type="email"
                      value={profileForm.email}
                      disabled
                      className={`w-full border rounded-xl px-4 py-3 select-none cursor-not-allowed outline-none ${
                        isDark
                          ? "bg-slate-950/40 border-slate-800 text-slate-500"
                          : "bg-slate-100/85 border-slate-200 text-slate-400"
                      }`}
                      required
                    />

                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium disabled:opacity-50 transition-colors"
                    >
                      {updatingProfile ? "Saving..." : "Save Changes"}
                    </button>

                  </div>
                </form>

                {/* Security */}
                <form onSubmit={handleUpdatePassword} className={`border rounded-2xl p-6 transition-all duration-300 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>
                    Security
                  </h3>

                  <div className="space-y-4">

                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-3 outline-none transition-colors duration-200 ${
                        isDark
                          ? "bg-slate-900 border-slate-700 text-white focus:border-violet-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      required
                    />

                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-3 outline-none transition-colors duration-200 ${
                        isDark
                          ? "bg-slate-900 border-slate-700 text-white focus:border-violet-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      required
                    />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-3 outline-none transition-colors duration-200 ${
                        isDark
                          ? "bg-slate-900 border-slate-700 text-white focus:border-violet-500"
                          : "bg-white border-slate-200 text-slate-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      required
                    />

                    <button
                      type="submit"
                      disabled={updatingPassword}
                      className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl text-white font-medium disabled:opacity-50"
                    >
                      {updatingPassword ? "Updating..." : "Update Password"}
                    </button>

                  </div>
                </form>

              </div>

            </GlassCard>
          )}
        </div>
      </main>

      {/* ─── IDEA DETAIL MODAL ─────────────────────────────────── */}
      {selectedIdea && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
            onClick={handleCloseModal}
          />
          
          {/* Modal Container */}
          <div 
            className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border backdrop-blur-2xl p-6 md:p-8 transition-all duration-300 shadow-2xl ${
              isDark 
                ? "bg-slate-900/90 border-white/10 text-white" 
                : "bg-white/95 border-slate-200 text-slate-800"
            }`}
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            {/* Close button */}
            <button 
              onClick={handleCloseModal}
              className={`absolute top-5 right-5 p-2 rounded-xl transition-all duration-200 ${
                isDark ? "hover:bg-white/10 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              }`}
            >
              <X size={20} />
            </button>

            {/* Category badge */}
            <div className="mb-4">
              <Badge color="violet">{selectedIdea.category || "General"}</Badge>
            </div>

            {/* Title */}
            <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-850"}`}>
              {selectedIdea.title}
            </h2>

            {/* Author info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base uppercase">
                {(selectedIdea.user?.name || selectedIdea.idea?.user?.name || "U").charAt(0)}
              </div>
              <div>
                <p className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  {selectedIdea.user?.name || selectedIdea.idea?.user?.name || "Anonymous"}
                </p>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {selectedIdea.user?.email || selectedIdea.idea?.user?.email || "No email"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {selectedIdea.description}
              </p>
            </div>

            {/* References */}
            {selectedIdea.references && (
              <div className="mb-6">
                <a
                  href={selectedIdea.references}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold hover:underline transition-colors ${
                    isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"
                  }`}
                >
                  View Reference Resources <ArrowUpRight size={12} />
                </a>
              </div>
            )}

            {/* Actions: Likes & Bookmark */}
            <div className={`flex items-center gap-4 py-4 mb-6 border-t border-b ${isDark ? "border-white/5" : "border-slate-100"}`}>
              {/* Like Button */}
              <button
                onClick={handleToggleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-[1.03] ${
                  myLikes.some((l) => l.ideaId === selectedIdea.id)
                    ? isDark 
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-red-50 text-red-600 border border-red-100"
                    : isDark
                      ? "bg-white/5 text-slate-400 hover:text-red-400 border border-white/5"
                      : "bg-slate-50 text-slate-600 hover:text-red-600 border border-slate-200"
                }`}
              >
                <Heart size={14} className={myLikes.some((l) => l.ideaId === selectedIdea.id) ? "fill-current" : ""} />
                <span>{modalLikesCount} Likes</span>
              </button>

              {/* Save Button */}
              <button
                onClick={handleToggleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-[1.03] ${
                  savedIdeas.some((s) => s.ideaId === selectedIdea.id)
                    ? isDark
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-cyan-50 text-cyan-600 border border-cyan-100"
                    : isDark
                      ? "bg-white/5 text-slate-400 hover:text-cyan-400 border border-white/5"
                      : "bg-slate-50 text-slate-600 hover:text-cyan-600 border border-slate-200"
                }`}
              >
                <Bookmark size={14} className={savedIdeas.some((s) => s.ideaId === selectedIdea.id) ? "fill-current" : ""} />
                <span>{savedIdeas.some((s) => s.ideaId === selectedIdea.id) ? "Saved" : "Save Idea"}</span>
              </button>
            </div>

            {/* Comments header */}
            <div className="mb-4">
              <h3 className={`text-base font-bold tracking-tight flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-800"}`}>
                <MessageCircle size={16} /> Comments ({modalComments.length})
              </h3>
            </div>

            {/* Comments List */}
            <div className={`space-y-4 mb-6 max-h-52 overflow-y-auto pr-1 flex flex-col ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              {modalComments.length > 0 ? (
                modalComments.map((comment) => (
                  <div 
                    key={comment.id}
                    className={`rounded-xl p-3 border text-xs leading-relaxed transition-all duration-200 ${
                      isDark ? "bg-white/5 border-white/5 text-slate-300" : "bg-slate-50 border-slate-100 shadow-sm text-slate-650"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-violet-400">{comment.user?.name}</span>
                      <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className={`text-xs py-4 text-center ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handlePostCommentModal} className="flex gap-2">
              <textarea
                rows="1"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your comment..."
                className={`flex-1 border rounded-xl px-4 py-2.5 text-xs outline-none transition-all resize-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white placeholder-slate-500"
                    : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                }`}
                required
              />
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmittingComment ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: var(--tw-shadow-color, 0.3); }
          50% { opacity: 0.9; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Profile;