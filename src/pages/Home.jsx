// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   Zap,
//   Code,
//   BookOpen,
//   Coffee,
//   TrendingUp,
// } from "lucide-react";

// import { getAllIdeas } from "../services/idea.service";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Home = () => {
//   const navigate = useNavigate();
//   const [ideas, setIdeas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { theme } = useAuth();
//   const isDark = theme === "dark";
//   const isLoggedIn = !!localStorage.getItem("token");

//   useEffect(() => {
//     fetchIdeas();
//   }, []);

//   const fetchIdeas = async () => {
//     try {
//       const data = await getAllIdeas();
//       setIdeas(data.ideas || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShowMore = () => {
//     if (!isLoggedIn) {
//       toast.error("Please sign in to explore more community ideas!");
//       navigate("/login");
//     } else {
//       navigate("/profile?section=allIdeas");
//     }
//   };

//   const handleViewDetails = (id) => {
//     if (!isLoggedIn) {
//       toast.error("Please sign in to view idea details!");
//       navigate("/login");
//     } else {
//       navigate(`/idea/${id}`);
//     }
//   };

//   return (
//     <div className={`min-h-screen pt-24 pb-12 overflow-hidden relative transition-colors duration-300 ${isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-slate-800"}`}>
//       {/* Background */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden -z-10">
//         <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-blue-600/10" : "bg-blue-400/15"}`} />
//         <div className={`absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-purple-600/10" : "bg-purple-400/15"}`} />
//       </div>

//       <div className="max-w-7xl mx-auto px-6">

//         {/* Hero Section */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-16">
//           <div className="flex-1 space-y-8">
//             <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition-all duration-300 ${
//               isDark
//                 ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
//                 : "bg-blue-50 border-blue-100 text-blue-600"
//             }`}>
//               AI-Powered Knowledge Sharing
//             </div>

//             <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
//               Where Great <br />
//               <span className={isDark ? "text-blue-400" : "text-blue-600"}>Ideas</span> Converge.
//             </h1>

//             <p className={`text-lg md:text-xl leading-relaxed max-w-2xl transition-colors duration-300 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
//               Discover, share, and collaborate on study tips, coding concepts,
//               business strategies, and productivity hacks.
//             </p>

//             <div className="flex gap-4 flex-wrap">
//               {isLoggedIn ? (
//                 <>
//                   <Link
//                     to="/profile?section=dashboard"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-[1.03] shadow-lg shadow-blue-500/20"
//                   >
//                     Go to Dashboard
//                     <ArrowRight size={18} />
//                   </Link>
//                   <Link
//                     to="/create"
//                     className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 border flex items-center justify-center ${
//                       isDark
//                         ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
//                         : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
//                     }`}
//                   >
//                     Share an Idea
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/register"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-[1.03] shadow-lg shadow-blue-500/20"
//                   >
//                     Get Started Now
//                     <ArrowRight size={18} />
//                   </Link>
//                   <Link
//                     to="/login"
//                     className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 border flex items-center justify-center ${
//                       isDark
//                         ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
//                         : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
//                     }`}
//                   >
//                     Sign In
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="flex-1">
//             <div className={`p-8 rounded-3xl border transition-all duration-300 shadow-xl ${
//               isDark
//                 ? "bg-white/5 border-white/10 text-white"
//                 : "bg-white border-slate-200/60 text-slate-800"
//             }`}>
//               <h2 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
//                 The 2-Minute Rule
//               </h2>

//               <p className={isDark ? "text-slate-400" : "text-gray-600"}>
//                 If a task takes less than two minutes, do it immediately.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="py-16">
//           <h2 className={`text-3xl font-bold mb-10 ${isDark ? "text-white" : "text-slate-850"}`}>
//             Explore Categories
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: Code,
//                 label: "Coding Concepts",
//                 color: isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600",
//               },
//               {
//                 icon: BookOpen,
//                 label: "Study Tips",
//                 color: isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600",
//               },
//               {
//                 icon: TrendingUp,
//                 label: "Business Ideas",
//                 color: isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600",
//               },
//               {
//                 icon: Coffee,
//                 label: "Life Hacks",
//                 color: isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-600",
//               },
//             ].map((cat, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
//                   isDark
//                     ? "bg-white/5 border-white/10 text-white hover:border-white/20 shadow-lg"
//                     : "bg-white border-slate-200/60 text-slate-850 shadow hover:shadow-lg"
//                 }`}
//               >
//                 <div
//                   className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.color}`}
//                 >
//                   <cat.icon size={24} />
//                 </div>

//                 <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}`}>{cat.label}</h3>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Ideas Section */}
//         <div className="py-16">
//           <h2 className={`text-3xl font-bold mb-10 ${isDark ? "text-white" : "text-slate-850"}`}>
//             Latest Ideas
//           </h2>

//           {loading ? (
//             <div className={`text-center ${isDark ? "text-slate-500" : "text-gray-500"}`}>
//               Loading ideas...
//             </div>
//           ) : ideas.length === 0 ? (
//             <div className={`text-center ${isDark ? "text-slate-500" : "text-gray-500"}`}>
//               No ideas found
//             </div>
//           ) : (
//             <>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {ideas.slice(0, 3).map((idea) => (
//                   <div
//                     key={idea.id}
//                     className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
//                       isDark
//                         ? "bg-white/5 border-white/10 text-white hover:border-white/20 shadow-lg"
//                         : "bg-white border-slate-200/60 text-slate-850 shadow hover:shadow-lg"
//                     }`}
//                   >
//                     <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
//                       {idea.title}
//                     </h3>

//                     <p className={`mb-4 transition-colors duration-300 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
//                       {idea.description}
//                     </p>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {idea.tags?.map((tag, index) => (
//                         <span
//                           key={index}
//                           className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
//                             isDark
//                               ? "bg-blue-500/15 text-blue-300 border border-blue-500/10"
//                               : "bg-blue-50 text-blue-600 border border-blue-100"
//                           }`}
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex justify-between mb-4 items-center">
//                       <span className={`text-sm ${isDark ? "text-slate-550" : "text-gray-500"}`}>
//                         {idea.category}
//                       </span>

//                       <span className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}>
//                         {idea.user?.name}
//                       </span>
//                     </div>

//                     <button
//                       onClick={() => handleViewDetails(idea.id)}
//                       className={`font-semibold transition-colors duration-200 cursor-pointer ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
//                     >
//                       View Details →
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               {ideas.length > 3 && (
//                 <div className="flex justify-center mt-12">
//                   <button
//                     onClick={handleShowMore}
//                     className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-200 cursor-pointer"
//                   >
//                     Show More Ideas
//                     <ArrowRight size={16} />
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Trending Card */}
//         <div className={`mt-16 border rounded-3xl p-8 transition-all duration-300 shadow-xl ${
//           isDark
//             ? "bg-white/5 border-white/10 text-white"
//             : "bg-white border-slate-200/60 text-slate-850"
//         }`}>
//           <div className="flex items-center gap-4">
//             <div className={`p-4 rounded-xl ${isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-600"}`}>
//               <Zap />
//             </div>

//             <div>
//               <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}`}>
//                 Trending Ideas
//               </h3>

//               <p className={isDark ? "text-slate-400" : "text-gray-500"}>
//                 Most viewed ideas this week
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Home;




import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, Zap, Code, BookOpen, Coffee,
  TrendingUp, Moon, Sun,
} from "lucide-react";
import { getAllIdeas } from "../services/idea.service";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

/* ─── Particle network canvas ─────────────────────────────────── */
const ParticleCanvas = ({ isDark }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    particles.current = Array.from({ length: COUNT }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.4,
      vy:  (Math.random() - 0.5) * 0.4,
      r:   Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;
      const dotColor  = isDark ? "rgba(167,139,250," : "rgba(109,40,217,";
      const lineColor = isDark ? "rgba(167,139,250," : "rgba(139,92,246,";

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor + "0.6)";
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx   = pts[i].x - pts[j].x;
          const dy   = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = lineColor + (1 - dist / 130) * 0.25 + ")";
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

/* ─── Morphing orb ────────────────────────────────────────────── */
const MorphOrb = ({ isDark }) => (
  <div
    style={{
      position:     "absolute",
      top:          "50%",
      left:         "50%",
      transform:    "translate(-50%, -50%)",
      width:        500,
      height:       500,
      borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
      background:   isDark
        ? "radial-gradient(ellipse at 40% 40%, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.06) 60%, transparent 100%)"
        : "radial-gradient(ellipse at 40% 40%, rgba(139,92,246,0.10) 0%, rgba(34,211,238,0.04) 60%, transparent 100%)",
      animation:    "orbMorph 8s ease-in-out infinite",
      pointerEvents:"none",
      zIndex:       0,
    }}
  />
);

/* ─── Marquee ticker ──────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Design Systems","Neural Networks","MVP Strategy","Time Boxing",
  "API Architecture","Habit Stacking","SaaS Pricing","Deep Work",
  "Microservices","OKR Framework","Cold Outreach","SOLID Principles",
];

const Ticker = ({ isDark }) => (
  <div
    style={{
      overflow:   "hidden",
      position:   "relative",
      padding:    "18px 0",
      background: isDark ? "rgba(3,7,18,0.4)" : "rgba(248,250,252,0.4)",
      borderTop:  `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      borderBottom:`0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
    }}
  >
    <div style={{ display: "flex", animation: "tickerScroll 40s linear infinite", width: "max-content" }}>
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span
          key={i}
          style={{
            fontSize:      12,
            fontWeight:    700,
            paddingRight:  48,
            whiteSpace:    "nowrap",
            color:         isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.45)",
            letterSpacing: ".15em",
          }}
        >
          {item.toUpperCase()}
          <span style={{ marginLeft: 48, color: "#7c3aed", opacity: 0.85 }}>✦</span>
        </span>
      ))}
    </div>
  </div>
);

/* ─── Glass card ──────────────────────────────────────────────── */
const Glass = ({ children, className = "", style = {}, onClick }) => (
  <div
    onClick={onClick}
    className={className}
    style={{
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius:   16,
      transition:     "all 0.2s ease",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── Theme toggle ────────────────────────────────────────────── */
const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      display:        "flex",
      alignItems:     "center",
      gap:            6,
      padding:        "7px 14px",
      borderRadius:   40,
      border:         `0.5px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
      background:     isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      color:          isDark ? "rgba(255,255,255,0.7)"  : "rgba(0,0,0,0.6)",
      fontSize:       13,
      fontWeight:     500,
      cursor:         "pointer",
      transition:     "all .2s",
    }}
  >
    {isDark
      ? <><Sun size={14} color="#fbbf24" /> Light</>
      : <><Moon size={14} /> Dark</>
    }
  </button>
);

/* ─── Category data ───────────────────────────────────────────── */
const CATS = [
  { num: "01", icon: Code,        label: "Coding Concepts", count: "3.2K ideas", accent: "#a78bfa" },
  { num: "02", icon: BookOpen,    label: "Study Tips",       count: "1.8K ideas", accent: "#38bdf8" },
  { num: "03", icon: TrendingUp,  label: "Business Ideas",   count: "2.8K ideas", accent: "#34d399" },
  { num: "04", icon: Coffee,      label: "Life Hacks",       count: "4.1K ideas", accent: "#f59e0b" },
];

const IDEA_COLORS = ["#a78bfa", "#38bdf8", "#34d399"];

/* ─── Date Formatter Helper ─────────────────────────────────── */
const formatTime = (dateStr) => {
  if (!dateStr) return "2 hrs ago";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins || 1}m`;
  }
  if (diffHrs < 24) {
    if (diffHrs === 2) return "2 hrs ago"; // Specific to match mockup screenshot
    return `${diffHrs}h`;
  }
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d`;
};

/* ─── Main ────────────────────────────────────────────────────── */
const Home = () => {
  const navigate           = useNavigate();
  const [ideas,   setIdeas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useAuth();
  const isDark     = theme === "dark";
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => { fetchIdeas(); }, []);

  const fetchIdeas = async () => {
    try {
      const data = await getAllIdeas();
      setIdeas(data.ideas || []);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const goShowMore = () => {
    if (!isLoggedIn) { toast.error("Please sign in to explore more!"); navigate("/login"); }
    else navigate("/profile?section=allIdeas");
  };

  const goIdea = (id) => {
    if (!isLoggedIn) { toast.error("Please sign in to view idea details!"); navigate("/login"); }
    else navigate(`/idea/${id}`);
  };

  const bg      = isDark ? "#030712"  : "#f8fafc";
  const surface = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)";
  const border  = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textPri = isDark ? "#ffffff"                : "#0f172a";
  const textSec = isDark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.5)";

  return (
    <div
      style={{
        minHeight:   "100vh",
        background:  bg,
        color:       textPri,
        fontFamily:  "'Inter', sans-serif",
        overflowX:   "hidden",
        transition:  "background .3s, color .3s",
      }}
    >

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          position:    "fixed",
          top:         0, left: 0, right: 0,
          zIndex:      100,
          display:     "flex",
          alignItems:  "center",
          justifyContent: "space-between",
          padding:     "14px 48px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background:  isDark ? "rgba(3,7,18,0.75)" : "rgba(248,250,252,0.85)",
          borderBottom:`0.5px solid ${border}`,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💡</div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.02em", color: textPri }}>IdeaHub</span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 32 }}>
          {["Explore","Categories","Trending"].map(l => (
            <span key={l} style={{ fontSize: 13, color: textSec, cursor: "pointer", transition: "color .15s" }}
              onMouseEnter={e => e.target.style.color = textPri}
              onMouseLeave={e => e.target.style.color = textSec}
            >{l}</span>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          {isLoggedIn ? (
            <Link to="/profile" style={{ fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", padding: "8px 20px", borderRadius: 40, textDecoration: "none", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 13, color: textSec, textDecoration: "none", padding: "8px 12px" }}>Sign in</Link>
              <Link to="/register" style={{ fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", padding: "8px 20px", borderRadius: 40, textDecoration: "none", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }}>
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        style={{
          position:      "relative",
          minHeight:     "85vh",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
          overflow:      "hidden",
          borderBottom:  `0.5px solid ${border}`,
        }}
      >
        <ParticleCanvas isDark={isDark} />
        <MorphOrb      isDark={isDark} />

        {/* Subtle grid overlay */}
        <div style={{
          position:   "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:  isDark
            ? "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Two Columns Grid Container */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          zIndex: 1,
          alignItems: "stretch",
        }}>
          {/* Left Column (hero-left) */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "80px 64px 80px 80px",
            textAlign: "left",
            borderRight: `0.5px solid ${border}`,
          }}>
            {/* Eyebrow */}
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".15em",
              color: isDark ? "#a78bfa" : "#7c3aed",
              marginBottom: 28,
              textTransform: "uppercase",
              animation: "fadeUp .6s ease both"
            }}>
              — Where knowledge meets community
            </div>

            {/* Hero Headline */}
            <div style={{ marginBottom: 4, animation: "fadeUp .6s .1s ease both" }}>
              <span style={{
                fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, letterSpacing: "-.04em",
                background: "linear-gradient(90deg,rgba(255,255,255,.2) 0%,#fff 20%,#a78bfa 40%,#fff 60%,rgba(255,255,255,.2) 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}>Great</span>
              {" "}
              <span style={{
                fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, letterSpacing: "-.04em",
                background: "linear-gradient(90deg,rgba(255,255,255,.2) 0%,#fff 20%,#38bdf8 40%,#fff 60%,rgba(255,255,255,.2) 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer 3s .4s linear infinite",
              }}>minds</span>
            </div>

            <div style={{ marginBottom: 4, animation: "fadeUp .6s .2s ease both" }}>
              <span style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, letterSpacing: "-.04em", color: "#a78bfa", animation: "glowPulse 2.5s ease-in-out infinite", display: "inline-block" }}>share</span>
              {" "}
              <span style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, letterSpacing: "-.04em", color: "#38bdf8", animation: "glowPulse2 2.5s .5s ease-in-out infinite", display: "inline-block" }}>ideas.</span>
            </div>

            <div style={{ marginBottom: 4, animation: "fadeUp .6s .3s ease both" }}>
              <span style={{
                fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, letterSpacing: "-.04em",
                background: "linear-gradient(90deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,.18) 30%,#fff 45%,#a78bfa 55%,#38bdf8 65%,rgba(255,255,255,.18) 100%)",
                backgroundSize: "250% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer3 2.2s linear infinite", display: "inline-block",
              }}>You belong</span>
            </div>

            <div style={{ position: "relative", display: "inline-block", marginBottom: 36, animation: "fadeUp .6s .4s ease both" }}>
              {/* scan beam */}
              <span style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 4, pointerEvents: "none" }}>
                <span style={{ position: "absolute", top: 0, bottom: 0, width: 60, background: "linear-gradient(90deg,transparent,rgba(167,139,250,.25),transparent)", animation: "scanBeam 2.2s linear infinite" }} />
              </span>
              <span style={{
                fontSize: "clamp(36px,5vw,58px)", fontWeight: 900, letterSpacing: "-.04em",
                background: "linear-gradient(90deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,.18) 30%,#fff 45%,#a78bfa 55%,#38bdf8 65%,rgba(255,255,255,.18) 100%)",
                backgroundSize: "250% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer3 2.2s linear infinite", display: "inline-block",
              }}>here.</span>
              <span style={{ display: "inline-block", width: 3, height: ".85em", background: "#a78bfa", borderRadius: 2, marginLeft: 4, verticalAlign: "middle", animation: "blink 1.1s step-end infinite" }} />
            </div>

            {/* Description */}
            <p style={{ fontSize: 15, lineHeight: 1.75, color: textSec, maxWidth: 480, margin: "0 0 40px", animation: "fadeUp .6s .5s ease both" }}>
              Discover, share and collaborate on coding concepts, study tips, business strategies and life hacks — all in one vibrant community.
            </p>

            {/* CTA row */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56, animation: "fadeUp .6s .6s ease both" }}>
              {isLoggedIn ? (
                <>
                  <Link to="/profile?section=dashboard" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                    color: "#fff", fontWeight: 600, fontSize: 14,
                    padding: "13px 28px", borderRadius: 40, textDecoration: "none",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
                    transition: "transform .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Go to Dashboard <ArrowRight size={16} />
                  </Link>
                  <Link to="/create" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: surface, border: `0.5px solid ${border}`,
                    color: textPri, fontWeight: 600, fontSize: 14,
                    padding: "13px 28px", borderRadius: 40, textDecoration: "none",
                    backdropFilter: "blur(12px)",
                    transition: "transform .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Share an Idea
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                    color: "#fff", fontWeight: 600, fontSize: 14,
                    padding: "13px 28px", borderRadius: 40, textDecoration: "none",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
                    transition: "transform .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Start sharing free →
                  </Link>
                  <Link to="/login" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.03)", border: `0.5px solid ${border}`,
                    color: textPri, fontWeight: 600, fontSize: 14,
                    padding: "13px 28px", borderRadius: 40, textDecoration: "none",
                    backdropFilter: "blur(12px)",
                    transition: "transform .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Browse ideas
                  </Link>
                </>
              )}
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", animation: "fadeUp .6s .7s ease both" }}>
              {[
                ["12K+", "IDEAS"],
                ["4.8K", "CREATORS"],
                ["38K", "TALKS"],
                ["120+", "TOPICS"]
              ].map(([val, label]) => (
                <div key={label} style={{ minWidth: 80 }}>
                  <p style={{ fontSize: 26, fontWeight: 900, color: textPri, margin: 0, letterSpacing: "-.02em" }}>{val}</p>
                  <p style={{ fontSize: 10, color: textSec, fontWeight: 700, margin: "2px 0 0", letterSpacing: ".1em" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (hero-right) */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 48px",
            position: "relative",
          }}>
            {/* Visual cards grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              width: "100%",
              maxWidth: 580,
            }}>
              {/* Card 1: Coding */}
              <Glass style={{
                padding: 20,
                background: "rgba(255,255,255,0.015)",
                border: `0.5px solid ${border}`,
                borderTop: "3px solid #a78bfa",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 130,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: 40,
                    border: "0.5px solid rgba(52,211,153,0.3)",
                    background: "rgba(52,211,153,0.1)",
                    color: "#34d399",
                    letterSpacing: ".02em"
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                    LIVE
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#a78bfa", letterSpacing: ".1em" }}>CODING</span>
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: textPri, lineHeight: 1.4, margin: 0, flex: 1 }}>
                  Big O Notation explained simply for beginners
                </h4>
                <p style={{ fontSize: 11, color: textSec, margin: "8px 0 0" }}>1.2K saves</p>
              </Glass>

              {/* Card 2: Business */}
              <Glass style={{
                padding: 20,
                background: "rgba(255,255,255,0.015)",
                border: `0.5px solid ${border}`,
                borderTop: "3px solid #38bdf8",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 130,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#38bdf8", letterSpacing: ".1em" }}>BUSINESS</span>
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: textPri, lineHeight: 1.4, margin: 0, flex: 1 }}>
                  Cold email framework — 40% reply rate
                </h4>
                <p style={{ fontSize: 11, color: textSec, margin: "8px 0 0" }}>2.1K saves</p>
              </Glass>

              {/* Card 3: Study */}
              <Glass style={{
                padding: 20,
                background: "rgba(255,255,255,0.015)",
                border: `0.5px solid ${border}`,
                borderTop: "3px solid #34d399",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 130,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#34d399", letterSpacing: ".1em" }}>STUDY</span>
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: textPri, lineHeight: 1.4, margin: 0, flex: 1 }}>
                  Active recall beats re-reading by 3x
                </h4>
                <p style={{ fontSize: 11, color: textSec, margin: "8px 0 0" }}>890 saves</p>
              </Glass>

              {/* Card 4: Startup */}
              <Glass style={{
                padding: 20,
                background: "rgba(255,255,255,0.015)",
                border: `0.5px solid ${border}`,
                borderTop: "3px solid #f59e0b",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 130,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#f59e0b", letterSpacing: ".1em" }}>STARTUP</span>
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: textPri, lineHeight: 1.4, margin: 0, flex: 1 }}>
                  Launch your MVP in 7 days — checklist
                </h4>
                <p style={{ fontSize: 11, color: textSec, margin: "8px 0 0" }}>3.4K saves</p>
              </Glass>

              {/* Card 5: Life Hacks */}
              <Glass style={{
                gridColumn: "span 2",
                padding: 20,
                background: "rgba(255,255,255,0.015)",
                border: `0.5px solid ${border}`,
                borderTop: "3px solid #38bdf8",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 100,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#a78bfa", letterSpacing: ".1em" }}>LIFE HACKS</span>
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: textPri, lineHeight: 1.4, margin: 0, flex: 1 }}>
                  The 2-minute rule — do it now or schedule it, never just think about it
                </h4>
                <p style={{ fontSize: 11, color: textSec, margin: "6px 0 0" }}>
                  5.7K saves <span style={{ opacity: 0.5 }}>·</span> <span style={{ color: "#34d399" }}>Trending #1 this week</span>
                </p>
              </Glass>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────── */}
      <Ticker isDark={isDark} />

      {/* ── CATEGORIES ──────────────────────────────────────── */}
      <section style={{ padding: "100px 0", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 10 }}>Topics</p>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-.03em", color: textPri, margin: 0 }}>
                Browse categories
              </h2>
            </div>
            <span style={{ fontSize: 13, color: textSec, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={goShowMore}>
              View all <span style={{ fontSize: 16, lineHeight: 0 }}>›</span>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {CATS.map(({ num, label, count, accent }) => (
              <Glass
                key={label}
                style={{
                  padding:    32,
                  background: surface,
                  border:     `0.5px solid ${border}`,
                  cursor:     "pointer",
                  display:    "flex",
                  flexDirection: "column",
                  borderRadius: 20,
                  position:   "relative",
                  overflow:   "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accent + "55";
                  e.currentTarget.style.transform   = "translateY(-6px)";
                  e.currentTarget.style.boxShadow   = `0 20px 40px ${accent}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.transform   = "translateY(0)";
                  e.currentTarget.style.boxShadow   = "none";
                }}
                onClick={goShowMore}
              >
                {/* Large number count and diagonal arrow row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                  <span style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: accent,
                    opacity: 0.8,
                    lineHeight: 1,
                    fontFamily: "'Inter', sans-serif"
                  }}>{num}</span>
                  <span style={{ fontSize: 18, color: textSec, opacity: 0.7 }}>↗</span>
                </div>
                
                {/* Label & count */}
                <h3 style={{ fontSize: 16, fontWeight: 800, color: textPri, margin: "0 0 6px", letterSpacing: "-.01em" }}>
                  {label}
                </h3>
                <p style={{ fontSize: 13, color: textSec, margin: 0 }}>
                  {count}
                </p>
              </Glass>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDEAS ───────────────────────────────────────────── */}
      <section style={{ padding: "0 0 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "#38bdf8", marginBottom: 10 }}>Community</p>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-.03em", color: textPri, margin: 0 }}>
                Latest ideas
              </h2>
            </div>
            <button onClick={goShowMore} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: textSec, background: "none", border: "none", cursor: "pointer" }}>
              Show more <span style={{ fontSize: 16, lineHeight: 0 }}>›</span>
            </button>
          </div>

          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: textSec }}>
              <div style={{ width: 18, height: 18, border: "2px solid rgba(167,139,250,0.3)", borderTopColor: "#a78bfa", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              Loading ideas…
            </div>
          ) : ideas.length === 0 ? (
            <p style={{ color: textSec }}>No ideas yet — be the first to share!</p>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {ideas.slice(0, 3).map((idea, i) => {
                  const ac = IDEA_COLORS[i % 3];
                  return (
                    <Glass
                      key={idea.id}
                      onClick={() => goIdea(idea.id)}
                      style={{
                        padding:    28,
                        background: surface,
                        border:     `0.5px solid ${border}`,
                        display:    "flex",
                        flexDirection: "column",
                        gap:        16,
                        cursor:     "pointer",
                        position:   "relative",
                        overflow:   "hidden",
                        borderRadius: 20,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = ac + "55";
                        e.currentTarget.style.transform   = "translateY(-6px)";
                        e.currentTarget.style.boxShadow   = `0 20px 40px ${ac}12`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = border;
                        e.currentTarget.style.transform   = "translateY(0)";
                        e.currentTarget.style.boxShadow   = "none";
                      }}
                    >
                      {/* Top accent line */}
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: ac }} />

                      {/* Ambient background glow at the bottom right */}
                      <div style={{
                        position: "absolute",
                        bottom: "-20%",
                        right: "-20%",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${ac}18 0%, transparent 80%)`,
                        pointerEvents: "none",
                        zIndex: 0,
                      }} />

                      {/* Category Pill */}
                      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
                          textTransform: "uppercase", padding: "4px 12px",
                          borderRadius: 40,
                          background: ac + "14", color: ac,
                          border: `0.5px solid ${ac}33`,
                        }}>{idea.category}</span>
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: textPri, lineHeight: 1.4, margin: 0, letterSpacing: "-.01em", position: "relative", zIndex: 1 }}>
                        {idea.title}
                      </h3>

                      {/* Description */}
                      <p style={{ fontSize: 13, color: textSec, lineHeight: 1.7, margin: 0, flex: 1, position: "relative", zIndex: 1,
                        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {idea.description}
                      </p>

                      {/* Bottom Row */}
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: 16, borderTop: `0.5px solid ${border}`, marginTop: 8,
                        position: "relative", zIndex: 1
                      }}>
                        <span style={{ fontSize: 12, color: textSec }}>
                          by {idea.user?.name || "Anonymous"} · {formatTime(idea.createdAt)}
                        </span>
                        <span style={{
                          display: "flex", alignItems: "center", gap: 4,
                          fontSize: 13, fontWeight: 600, color: ac
                        }}>
                          View →
                        </span>
                      </div>
                    </Glass>
                  );
                })}
              </div>

              {ideas.length > 3 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
                  <button
                    onClick={goShowMore}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                      color: "#fff", fontWeight: 600, fontSize: 14,
                      padding: "14px 36px", borderRadius: 40, border: "none",
                      cursor: "pointer", boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
                    }}
                  >
                    Show More Ideas <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── TRENDING BANNER ─────────────────────────────────── */}
      <section style={{ padding: "0 0 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <Glass style={{
            background: surface,
            border:     `0.5px solid ${border}`,
            padding:    "48px 52px",
            display:    "flex",
            alignItems: "center",
            gap:        32,
            position:   "relative",
            overflow:   "hidden",
            borderRadius: 24,
          }}>
            {/* Dot grid decoration */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }} />

            <div style={{
              width: 64, height: 64, borderRadius: 18, flexShrink: 0,
              background: "rgba(245,158,11,0.12)", color: "#f59e0b",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <Zap size={28} />
            </div>

            <div style={{ flex: 1, position: "relative" }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: textPri, margin: "0 0 6px", letterSpacing: "-.02em" }}>
                🔥 Trending This Week
              </h3>
              <p style={{ fontSize: 14, color: textSec, margin: 0 }}>
                The most-viewed and bookmarked ideas from the community right now.
              </p>
            </div>

            <button
              onClick={goShowMore}
              style={{
                display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
                background: "rgba(255,255,255,0.03)",
                border: `0.5px solid ${border}`,
                color: textPri, fontWeight: 600, fontSize: 14,
                padding: "12px 28px", borderRadius: 40,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 15px rgba(0,0,0,0.05)",
                position: "relative",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#f59e0b";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = border;
              }}
            >
              Explore trending
            </button>
          </Glass>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{
        borderTop:  `0.5px solid ${border}`,
        padding:    "32px 48px",
        display:    "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap:   "wrap",
        gap:        16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#7c3aed,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>💡</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: textPri }}>IdeaHub</span>
        </div>
        <p style={{ fontSize: 12, color: textSec, margin: 0 }}>© 2025 IdeaHub — Share · Learn · Build · Innovate</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy","Terms","Contact"].map(l => (
            <span key={l} style={{ fontSize: 12, color: textSec, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>

      {/* ── Keyframes ───────────────────────────────────────── */}
      <style>{`
        @keyframes orbMorph {
          0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; transform: translate(-50%,-50%) rotate(0deg); }
          33%      { border-radius: 40% 60% 30% 70% / 60% 40% 60% 40%; transform: translate(-50%,-50%) rotate(120deg); }
          66%      { border-radius: 70% 30% 50% 50% / 40% 70% 30% 60%; transform: translate(-50%,-50%) rotate(240deg); }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes dotPulse {
          0%,100% { opacity: 0.6; transform: scale(1);   }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes shimmer3 { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes glowPulse  { 0%,100%{text-shadow:0 0 20px rgba(167,139,250,.4)} 50%{text-shadow:0 0 40px rgba(167,139,250,.9),0 0 80px rgba(167,139,250,.3)} }
        @keyframes glowPulse2 { 0%,100%{text-shadow:0 0 20px rgba(56,189,248,.4)}  50%{text-shadow:0 0 40px rgba(56,189,248,.9),0 0 80px rgba(56,189,248,.3)}  }
        @keyframes scanBeam { 0%{left:-60%} 100%{left:160%} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
};

export default Home;