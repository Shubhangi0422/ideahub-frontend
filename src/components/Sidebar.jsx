import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Lightbulb,
  Bookmark,
  MessageCircle,
  Heart,
  LogOut,
  ChevronDown,
  ChevronRight,
  Layers,
} from "lucide-react";

const Sidebar = ({
  setSelectedCategory,
  setActiveSection,
}) => {
  const navigate = useNavigate();

  const [showIdeasMenu, setShowIdeasMenu] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const categories = [
    "Coding Concepts",
    "Study Tips",
    "Business Ideas",
    "Life Hacks",
  ];

  return (
    <aside className="w-72 h-screen bg-slate-950 text-white fixed left-0 top-0 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold">
          💡 IdeaHub
        </h1>

        <p className="text-slate-400">
          Creator Dashboard
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4">

        <p className="text-xs text-slate-500 uppercase mb-4">
          Main Menu
        </p>

        <div className="space-y-2">

          {/* Dashboard */}
          <button
            onClick={() =>
              setActiveSection("dashboard")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          {/* All Ideas */}
          <button
            onClick={() =>
              setShowIdeasMenu(!showIdeasMenu)
            }
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <Layers size={20} />
              All Ideas
            </div>

            {showIdeasMenu ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {/* Dropdown */}
          {showIdeasMenu && (
            <div className="ml-5 space-y-1">

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveSection("allIdeas");
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-slate-800"
                >
                  {cat}
                </button>
              ))}

            </div>
          )}

          {/* My Ideas */}
          <button
            onClick={() =>
              setActiveSection("myIdeas")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
          >
            <Lightbulb size={20} />
            My Ideas
          </button>

          {/* Saved */}
          <button
            onClick={() =>
              setActiveSection("savedIdeas")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
          >
            <Bookmark size={20} />
            Saved Ideas
          </button>

          {/* Comments */}
          <button
            onClick={() =>
              setActiveSection("comments")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
          >
            <MessageCircle size={20} />
            Comments
          </button>

          {/* Likes */}
          <button
            onClick={() =>
              setActiveSection("likes")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800"
          >
            <Heart size={20} />
            Likes
          </button>

        </div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;