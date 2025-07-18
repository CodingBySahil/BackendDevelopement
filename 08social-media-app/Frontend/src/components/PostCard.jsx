import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  FaHeart,
  FaShare,
  FaCommentDots,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";

export default function PostCard({ post, fetchPosts, user }) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [shares, setShares] = useState(post.shares);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const isLiked = likes.includes(user._id);

  const handleLike = async () => {
    if (loadingLike) return; // prevent spam clicks
    setLoadingLike(true);

    // ✅ Optimistic Update
    setLikes((prev) =>
      isLiked ? prev.filter((id) => id !== user._id) : [...prev, user._id]
    );

    try {
      await axiosInstance.put(`/posts/${post._id}/like`);
    } catch (err) {
      console.error("Failed to like/unlike post", err);
      // ❌ Revert on failure
      setLikes(post.likes);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleShare = async () => {
    if (loadingShare) return;
    setLoadingShare(true);

    // ✅ Optimistic Update
    setShares((prev) => prev + 1);

    try {
      await axiosInstance.post(`/posts/${post._id}/share`);
    } catch (err) {
      console.error("Failed to share post", err);
      setShares(post.shares); // ❌ Revert on failure
    } finally {
      setLoadingShare(false);
    }
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const renderAvatar = () => {
    if (post.author.profilePic) {
      return (
        <img
          src={`http://localhost:5000${post.author.profilePic}`}
          alt="Profile"
          className="w-11 h-11 rounded-full object-cover border"
        />
      );
    }
    return post.author.gender === "Female" ? (
      <FaFemale className="w-10 h-10 text-pink-500" />
    ) : (
      <FaMale className="w-10 h-10 text-blue-500" />
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 border border-gray-200">
      {/* ✅ Author Section */}
      <div className="flex items-center gap-3 bg-gray-50 p-4 border-b">
        <div
          onClick={goToProfile}
          className="cursor-pointer hover:opacity-90 transition"
        >
          {renderAvatar()}
        </div>
        <div onClick={goToProfile} className="cursor-pointer">
          <h4 className="font-semibold text-gray-800 hover:text-blue-600">
            {post.author.username}
          </h4>
          <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* ✅ Post Content */}
      {post.content && (
        <div className="p-4">
          <p className="text-gray-800 text-sm leading-relaxed">
            {post.content}
          </p>
        </div>
      )}

      {/* ✅ Media Section */}
      {post.media && (
        <div className="bg-black">
          {post.mediaType === "video" ? (
            <video
              controls
              className="w-full h-96 object-center"
              src={`http://localhost:5000/uploads/${post.media}`}
            />
          ) : (
            <img
              className="w-full h-96 object-center"
              src={`http://localhost:5000/uploads/${post.media}`}
              alt="Post media"
            />
          )}
        </div>
      )}

      {/* ✅ Action Buttons */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className={`flex items-center gap-2 text-sm font-medium transition ${
            isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <FaHeart />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500 transition"
        >
          <FaCommentDots /> {post.comments.length} Comments
        </button>

        <button
          onClick={handleShare}
          disabled={loadingShare}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-500 transition"
        >
          <FaShare /> {shares} Shares
        </button>
      </div>

      {/* ✅ Comments */}
      {showComments && (
        <div className="bg-gray-50 px-4 pb-4">
          <CommentSection
            post={post}
            fetchPosts={fetchPosts} // still useful for refreshing comments
            currentUser={user}
          />
        </div>
      )}
    </div>
  );
}
