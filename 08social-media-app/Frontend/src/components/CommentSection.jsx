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
      {post.comments.map((c) => (
        <div
          key={c._id}
          className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg mb-2"
        >
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold uppercase">
            {c.author.username[0]}
          </div>
          <div>
            <p className="text-sm">
              <span className="font-semibold">{c.author.username}</span> {c.content}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}

      <form onSubmit={handleComment} className="flex items-center gap-2 mt-3">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center gap-1"
        >
          <FaCommentDots /> Comment
        </button>
      </form>
    </div>
  );
}
