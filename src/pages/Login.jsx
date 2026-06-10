import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Sun,
  Moon,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, theme, toggleTheme } = useAuth();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

      login(response.data.token);

      toast.success("Login Successful");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen overflow-hidden relative flex items-center justify-center bg-cover bg-center bg-no-repeat transition-colors duration-500"
      style={{ backgroundImage: "url('/images/ideas.jpg')" }}
    >
      {/* Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-2xl transition-all duration-300 border backdrop-blur-md hover:scale-105 ${
          isDark
            ? "bg-[#030712]/40 border-white/10 text-yellow-400 hover:bg-white/5"
            : "bg-white/60 border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
        }`}
        title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Glassmorphic overlay to ensure text readability and maintain premium feel */}
      <div className={`absolute inset-0 transition-colors duration-500 backdrop-blur-[2px] ${
        isDark ? "bg-[#030712]/80" : "bg-[#f8fafc]/80"
      }`}></div>

      {/* Background Stars (dark mode only) */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(70)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* LEFT SECTION */}
        <div className="relative flex flex-col items-center justify-center min-h-[700px]">

          {/* Background Words */}
          <div className="bg-word text-[160px] top-0 -left-20" style={{ color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
            IDEA
          </div>

          <div className="bg-word text-[130px] top-40 right-0" style={{ color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
            BUILD
          </div>

          <div className="bg-word text-[180px] bottom-0 left-10" style={{ color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
            INNOVATE
          </div>

          <div className="bg-word text-[120px] bottom-40 right-10" style={{ color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
            CREATE
          </div>

          {/* Golden Rays */}
          <div className="absolute w-[650px] h-[650px]">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%,-50%) rotate(${index * 30}deg)`
                }}
              >
                <div className={`w-[3px] h-[280px] bg-gradient-to-t to-transparent ${
                  isDark ? "from-yellow-400/40" : "from-yellow-500/20"
                }`} />
              </div>
            ))}
          </div>

          {/* Bulb Glow */}
          <div className={`absolute w-[450px] h-[450px] rounded-full blur-[140px] ${
            isDark ? "bg-yellow-400/10" : "bg-yellow-500/8"
          }`} />

          {/* Orbit Center */}
          <div className="absolute w-[500px] h-[500px]">
            <div className="absolute left-1/2 top-1/2 orbit-1">
              <div className="bg-cyan-500 text-white px-5 py-2 rounded-xl font-bold shadow-md">
                SHARE
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 orbit-2">
              <div className="bg-violet-500 text-white px-5 py-2 rounded-xl font-bold shadow-md">
                IDEA
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 orbit-3">
              <div className="bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold shadow-md">
                CODE
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 orbit-4">
              <div className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold shadow-md">
                STARTUP
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 orbit-5">
              <div className="bg-pink-500 text-white px-5 py-2 rounded-xl font-bold shadow-md">
                AI
              </div>
            </div>
          </div>

          {/* Bulb */}
          <div className="relative z-20 glow-bulb idea-float">
            <div className="text-[260px]">
              💡
            </div>
          </div>

          {/* Text */}
          <div className="text-center mt-4 relative z-20">
            <h1 className={`text-7xl font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
              IdeaHub
            </h1>

            <p className={`text-2xl mt-5 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
              Every revolutionary product started with a single idea.
            </p>

            <p className={`text-2xl mt-4 font-semibold ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
              ✨ Turn your thoughts into impact.
            </p>

            <p className={`mt-4 tracking-widest uppercase text-sm font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Share • Learn • Build • Innovate
            </p>
          </div>

        </div>

        {/* LOGIN CARD */}
        <div className="flex justify-center">
          <div className={`w-full max-w-md backdrop-blur-xl border rounded-3xl p-8 shadow-2xl transition-all duration-300 ${
            isDark
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/90 border-slate-200/80 text-slate-800"
          }`}>

            <h2 className="text-4xl font-bold text-center">
              Sign In to IdeaHub
            </h2>

            <p className={`text-center mt-3 mb-8 ${isDark ? "text-slate-350" : "text-slate-550"}`}>
              Sign in to continue your journey
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className={`block mb-2 font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className={`w-full p-4 rounded-xl border outline-none transition-all ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block mb-2 font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`w-full p-4 rounded-xl border outline-none transition-all ${
                      isDark
                        ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm"
                    }`}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-4 transition-colors ${isDark ? "text-slate-300 hover:text-white" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition duration-300 shadow-lg shadow-violet-500/25"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <p className={`text-center mt-6 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`font-semibold transition-colors ${
                  isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"
                }`}
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;