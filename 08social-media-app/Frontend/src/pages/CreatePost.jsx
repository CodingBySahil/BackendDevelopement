import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) return alert("Write something or upload media!");

    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("media", media);

    await axiosInstance.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textarea */}
        <textarea
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* File Input */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setMedia(file);
            setPreview(URL.createObjectURL(file));
          }}
          className="w-full text-sm text-gray-600"
        />

        {/* Media Preview */}
        {preview && (
          <div className="mt-2">
            {media?.type.startsWith("video") ? (
              <video
                src={preview}
                controls
                className="rounded-md w-full max-h-64"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="rounded-md w-full max-h-64 object-cover"
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
