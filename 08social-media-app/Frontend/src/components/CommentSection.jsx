import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { FaCommentDots } from "react-icons/fa";

export default function CommentSection({ post, fetchPosts }) {
  const [comment, setComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await axiosInstance.post(`/comments/${post._id}`, { content: comment });
    setComment("");
    fetchPosts();
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      {/* ✅ Comments List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
        {post.comments.map((c) => (
          <div
            key={c._id}
            className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {/* ✅ Avatar */}
            <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold uppercase">
              {c.author.username[0]}
            </div>

            {/* ✅ Comment Content */}
            <div className="flex-1">
              <p className="text-sm leading-tight">
                <span className="font-semibold text-gray-800">
                  {c.author.username}
                </span>{" "}
                <span className="text-gray-700">{c.content}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        {post.comments.length === 0 && (
          <p className="text-gray-400 text-sm text-center">No comments yet.</p>
        )}
      </div>

      {/* ✅ Add Comment Form */}
      <form
        onSubmit={handleComment}
        className="flex items-center gap-2 mt-3 w-full"
      >
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center gap-1 transition"
        >
          <FaCommentDots className="text-sm" />
          <span className="hidden sm:inline">Comment</span>
        </button>
      </form>
    </div>
  );
}
