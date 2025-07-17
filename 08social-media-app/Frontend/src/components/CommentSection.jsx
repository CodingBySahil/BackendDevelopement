import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

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
    <div className="mt-4 border-t border-gray-200 pt-4">
      {/* Comments List */}
      <div className="space-y-3">
        {post.comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
        )}
        {post.comments.map((c) => (
          <div
            key={c._id}
            className="flex items-start gap-3 bg-gray-50 p-2 rounded-lg shadow-sm"
          >
            {/* Avatar (use first letter of username if no image) */}
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold uppercase">
              {c.author.username[0]}
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold text-gray-800">
                  {c.author.username}
                </span>{" "}
                <span className="text-gray-700">{c.content}</span>
              </p>
              <p className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <form
        onSubmit={handleComment}
        className="flex items-center gap-2 mt-4"
      >
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
