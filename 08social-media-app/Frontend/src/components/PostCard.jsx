import axiosInstance from "../api/axiosInstance";
import CommentSection from "./CommentSection";
import { useState } from "react";

export default function PostCard({ post, fetchPosts, user }) {
  const [loadingLike, setLoadingLike] = useState(false);

  const handleLike = async () => {
    try {
      setLoadingLike(true);
      await axiosInstance.put(`/posts/${post._id}/like`);
      fetchPosts();
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar (First Letter of Username) */}
        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold uppercase">
          {post.author.username[0]}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{post.author.username}</h4>
          <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 text-sm mb-3">{post.content}</p>

      {/* Post Media */}
      {post.media && (
        <div className="mb-3">
          {post.mediaType === "video" ? (
            <video
              controls
              className="w-full rounded-md max-h-80"
              src={`http://localhost:5000/uploads/${post.media}`}
            />
          ) : (
            <img
              className="w-full rounded-md max-h-80 object-cover"
              src={`http://localhost:5000/uploads/${post.media}`}
              alt="Post media"
            />
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm ${
            post.likes.includes(user._id)
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          ❤️ {loadingLike ? "..." : post.likes.length}
        </button>

        <div className="text-sm text-gray-600">
          🔄 {post.shares} shares
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection post={post} fetchPosts={fetchPosts} />
    </div>
  );
}
