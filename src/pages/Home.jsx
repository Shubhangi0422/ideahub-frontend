import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Code,
  BookOpen,
  Coffee,
  TrendingUp,
} from "lucide-react";

import { getAllIdeas } from "../services/idea.service";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useAuth();
  const isDark = theme === "dark";
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const data = await getAllIdeas();
      setIdeas(data.ideas || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to explore more community ideas!");
      navigate("/login");
    } else {
      navigate("/profile?section=allIdeas");
    }
  };

  const handleViewDetails = (id) => {
    if (!isLoggedIn) {
      toast.error("Please sign in to view idea details!");
      navigate("/login");
    } else {
      navigate(`/idea/${id}`);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 overflow-hidden relative transition-colors duration-300 ${isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-slate-800"}`}>
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden -z-10">
        <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-blue-600/10" : "bg-blue-400/15"}`} />
        <div className={`absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-purple-600/10" : "bg-purple-400/15"}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-16">
          <div className="flex-1 space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition-all duration-300 ${
              isDark
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                : "bg-blue-50 border-blue-100 text-blue-600"
            }`}>
              AI-Powered Knowledge Sharing
            </div>

            <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
              Where Great <br />
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>Ideas</span> Converge.
            </h1>

            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl transition-colors duration-300 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              Discover, share, and collaborate on study tips, coding concepts,
              business strategies, and productivity hacks.
            </p>

            <div className="flex gap-4 flex-wrap">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile?section=dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-[1.03] shadow-lg shadow-blue-500/20"
                  >
                    Go to Dashboard
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/create"
                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 border flex items-center justify-center ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    Share an Idea
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-[1.03] shadow-lg shadow-blue-500/20"
                  >
                    Get Started Now
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/login"
                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 border flex items-center justify-center ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className={`p-8 rounded-3xl border transition-all duration-300 shadow-xl ${
              isDark
                ? "bg-white/5 border-white/10 text-white"
                : "bg-white border-slate-200/60 text-slate-800"
            }`}>
              <h2 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                The 2-Minute Rule
              </h2>

              <p className={isDark ? "text-slate-400" : "text-gray-600"}>
                If a task takes less than two minutes, do it immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-16">
          <h2 className={`text-3xl font-bold mb-10 ${isDark ? "text-white" : "text-slate-850"}`}>
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                label: "Coding Concepts",
                color: isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600",
              },
              {
                icon: BookOpen,
                label: "Study Tips",
                color: isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600",
              },
              {
                icon: TrendingUp,
                label: "Business Ideas",
                color: isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600",
              },
              {
                icon: Coffee,
                label: "Life Hacks",
                color: isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-600",
              },
            ].map((cat, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white hover:border-white/20 shadow-lg"
                    : "bg-white border-slate-200/60 text-slate-850 shadow hover:shadow-lg"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.color}`}
                >
                  <cat.icon size={24} />
                </div>

                <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}`}>{cat.label}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Ideas Section */}
        <div className="py-16">
          <h2 className={`text-3xl font-bold mb-10 ${isDark ? "text-white" : "text-slate-850"}`}>
            Latest Ideas
          </h2>

          {loading ? (
            <div className={`text-center ${isDark ? "text-slate-500" : "text-gray-500"}`}>
              Loading ideas...
            </div>
          ) : ideas.length === 0 ? (
            <div className={`text-center ${isDark ? "text-slate-500" : "text-gray-500"}`}>
              No ideas found
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.slice(0, 3).map((idea) => (
                  <div
                    key={idea.id}
                    className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white hover:border-white/20 shadow-lg"
                        : "bg-white border-slate-200/60 text-slate-850 shadow hover:shadow-lg"
                    }`}
                  >
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {idea.title}
                    </h3>

                    <p className={`mb-4 transition-colors duration-300 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                      {idea.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                            isDark
                              ? "bg-blue-500/15 text-blue-300 border border-blue-500/10"
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between mb-4 items-center">
                      <span className={`text-sm ${isDark ? "text-slate-550" : "text-gray-500"}`}>
                        {idea.category}
                      </span>

                      <span className={`text-sm font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        {idea.user?.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewDetails(idea.id)}
                      className={`font-semibold transition-colors duration-200 cursor-pointer ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                    >
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
              {ideas.length > 3 && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleShowMore}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-200 cursor-pointer"
                  >
                    Show More Ideas
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Trending Card */}
        <div className={`mt-16 border rounded-3xl p-8 transition-all duration-300 shadow-xl ${
          isDark
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white border-slate-200/60 text-slate-850"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl ${isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-600"}`}>
              <Zap />
            </div>

            <div>
              <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}`}>
                Trending Ideas
              </h3>

              <p className={isDark ? "text-slate-400" : "text-gray-500"}>
                Most viewed ideas this week
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;