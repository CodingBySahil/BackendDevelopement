import axiosInstance from "../api/axiosInstance";
import CommentSection from "./CommentSection";
import { FaHeart, FaShare } from "react-icons/fa";

export default function PostCard({ post, fetchPosts, user }) {
  const handleLike = async () => {
    await axiosInstance.put(`/posts/${post._id}/like`);
    fetchPosts();
  };

  const handleShare = async () => {
    await axiosInstance.post(`/posts/${post._id}/share`);
    fetchPosts();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold uppercase">
          {post.author.username[0]}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">
            {post.author.username}
          </h4>
          <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 text-sm mb-3">{post.content}</p>

      {/* Media */}
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

      {/* Actions */}
      <div className="flex items-center gap-6 mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm ${
            post.likes.includes(user._id)
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          <FaHeart /> {post.likes.length}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500"
        >
          <FaShare /> {post.shares}
        </button>
      </div>

      {/* Comments */}
      <CommentSection post={post} fetchPosts={fetchPosts} />
    </div>
  );
}
