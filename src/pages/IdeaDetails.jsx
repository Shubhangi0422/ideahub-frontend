import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getIdeaById } from "../services/idea.service";
import {
getComments,
addComment,
} from "../services/comment.service";
import { saveIdea } from "../services/savedIdea.service";
import { useAuth } from "../context/AuthContext";

const IdeaDetails = () => {
const { id } = useParams();
const { theme } = useAuth();
const isDark = theme === "dark";

const [idea, setIdea] = useState(null);
const [comments, setComments] = useState([]);
const [commentText, setCommentText] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchIdeaDetails();
}, [id]);

const fetchIdeaDetails = async () => {
try {
setLoading(true);

  const ideaRes = await getIdeaById(id);
  setIdea(ideaRes.idea);

  const commentsRes = await getComments(id);
  setComments(commentsRes.comments || []);
} catch (error) {
  console.log(error);
  toast.error("Failed to load idea");
} finally {
  setLoading(false);
}


};

const handleSaveIdea = async () => {
const token = localStorage.getItem("token");

if (!token) {
  toast.error("Please login first");
  return;
}

try {
  const response = await saveIdea(id, token);

  toast.success(
    response.message || "Idea saved successfully"
  );
} catch (error) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
      "Failed to save idea"
  );
}


};

const handleComment = async () => {
const token = localStorage.getItem("token");

if (!token) {
  toast.error("Please login first");
  return;
}

if (!commentText.trim()) {
  toast.error("Please enter a comment");
  return;
}

try {
  await addComment(id, commentText, token);

  toast.success("Comment added successfully");

  setCommentText("");

  fetchIdeaDetails();
} catch (error) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
      "Failed to add comment"
  );
}


};

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-300 ${isDark ? "bg-[#030712] text-slate-400" : "bg-slate-50 text-slate-600"}`}>
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" />
        <p className="text-sm">Loading details…</p>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-[#030712] text-slate-400" : "bg-slate-50 text-slate-600"}`}>
        <h2 className="text-xl font-semibold">Idea not found</h2>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 overflow-hidden relative transition-colors duration-300 ${isDark ? "bg-[#030712] text-white" : "bg-[#f8fafc] text-slate-800"}`}>
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden -z-10">
        <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-blue-600/10" : "bg-blue-400/15"}`} />
        <div className={`absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-purple-600/10" : "bg-purple-400/15"}`} />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className={`border rounded-3xl transition-all duration-300 p-8 shadow-xl ${
          isDark
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white border-slate-200/60 text-slate-800"
        }`}>
          <h1 className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-850"}`}>
            {idea.title}
          </h1>

          <p className={`leading-relaxed mb-6 transition-colors duration-300 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {idea.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
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

          <div className={`space-y-2 mb-6 text-sm border-t pt-4 ${isDark ? "border-white/5 text-slate-400" : "border-slate-100 text-slate-650"}`}>
            <p>
              <strong className={isDark ? "text-slate-200" : "text-slate-700"}>Category:</strong> {idea.category}
            </p>

            <p>
              <strong className={isDark ? "text-slate-200" : "text-slate-700"}>Created By:</strong>{" "}
              {idea.user?.name}
            </p>

            <p>
              <strong className={isDark ? "text-slate-200" : "text-slate-700"}>Email:</strong>{" "}
              {idea.user?.email}
            </p>
          </div>

          {idea.references && (
            <a
              href={idea.references}
              target="_blank"
              rel="noreferrer"
              className={`inline-block font-semibold hover:underline mb-6 transition-colors ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-750"}`}
            >
              View Reference
            </a>
          )}

          <div>
            <button
              onClick={handleSaveIdea}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] shadow-lg shadow-green-600/15"
            >
              Save Idea
            </button>
          </div>
        </div>

        <div className={`border rounded-3xl transition-all duration-300 p-8 mt-8 shadow-xl ${
          isDark
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white border-slate-200/60 text-slate-800"
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-slate-800"}`}>
            Comments ({comments.length})
          </h2>

          <div className="space-y-4 mb-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`border rounded-xl p-4 transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-slate-200"
                      : "bg-slate-50 border-slate-100 text-slate-700 shadow-sm"
                  }`}
                >
                  <p>{comment.content}</p>

                  <div className={`mt-2 text-xs font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    By {comment.user?.name}
                  </div>
                </div>
              ))
            ) : (
              <p className={isDark ? "text-slate-500" : "text-gray-500"}>
                No comments yet
              </p>
            )}
          </div>

          <div>
            <textarea
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className={`w-full border rounded-xl p-4 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-slate-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
              }`}
            />

            <button
              onClick={handleComment}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;
