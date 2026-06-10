import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-blue-400" size={28} />
              <h2 className="text-2xl font-bold">
                IdeaHub
              </h2>
            </div>

            <p className="text-gray-400 leading-relaxed">
              A platform where developers, students and creators
              share innovative ideas, learn together and build
              amazing things.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-2 text-gray-400">
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/create"
                className="hover:text-white transition"
              >
                Create Idea
              </Link>

              <Link
                to="/profile"
                className="hover:text-white transition"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Categories
            </h3>

            <div className="flex flex-col gap-2 text-gray-400">
              <span>Coding Concepts</span>
              <span>Study Tips</span>
              <span>Business Ideas</span>
              <span>Life Hacks</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-2 text-gray-400">
              <p>📧 contact@ideahub.com</p>
              <p>🌐 www.ideahub.com</p>
              <p>📍 India</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} IdeaHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;