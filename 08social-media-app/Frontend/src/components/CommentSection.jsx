import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  FaCommentDots,
  FaFemale,
  FaMale,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function CommentSection({ post, fetchPosts, currentUser }) {
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // ✅ Add Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await axiosInstance.post(`/comments/${post._id}`, { content: comment });
    setComment("");
    setShowInput(false);
    fetchPosts();
  };

  // ✅ Edit Comment
  const handleEdit = async (commentId) => {
    if (!editContent.trim()) return;
    await axiosInstance.put(`/comments/${commentId}`, { content: editContent });
    setEditCommentId(null);
    setEditContent("");
    fetchPosts();
  };

  // ✅ Delete Comment
  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await axiosInstance.delete(`/comments/${commentId}`);
      fetchPosts();
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      {/* ✅ Comments List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
        {post.comments.map((c) => (
          <div key={c._id} className="flex items-start gap-2">
            {/* ✅ Avatar */}
            {c.author.profilePic ? (
              <img
                src={`http://localhost:5000${c.author.profilePic}`}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border"
              />
            ) : c.author.gender === "Female" ? (
              <FaFemale className="w-8 h-8 text-pink-500" />
            ) : (
              <FaMale className="w-8 h-8 text-blue-500" />
            )}

            {/* ✅ Comment Bubble */}
            <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1 relative">
              {editCommentId === c._id ? (
                <div className="flex items-center gap-2">
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => handleEdit(c._id)}
                    className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditCommentId(null);
                      setEditContent("");
                    }}
                    className="px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">
                      {c.author.username}
                    </span>{" "}
                    <span className="text-gray-700">{c.content}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </>
              )}

              {String(currentUser?._id) === String(c.author._id) &&
                editCommentId !== c._id && (
                  <div className="absolute top-1 right-2 flex gap-2 text-gray-500 text-xs">
                    <button
                      onClick={() => {
                        setEditCommentId(c._id);
                        setEditContent(c.content);
                      }}
                      className="hover:text-blue-600 flex items-center gap-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="hover:text-red-600 flex items-center gap-1"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}

        {post.comments.length === 0 && (
          <p className="text-gray-400 text-sm text-center">
            No comments yet. Be the first!
          </p>
        )}
      </div>

      {/* ✅ Toggle Comment Form */}
      <div className="mt-3">
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="text-blue-500 text-sm hover:underline flex items-center gap-1"
          >
            <FaCommentDots /> Add a comment
          </button>
        ) : (
          <form
            onSubmit={handleComment}
            className="flex items-center gap-2 mt-2 w-full"
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
              Comment
            </button>
            <button
              type="button"
              onClick={() => {
                setShowInput(false);
                setComment("");
              }}
              className="px-3 py-2 text-xs bg-gray-400 hover:bg-gray-500 text-white rounded-full"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
