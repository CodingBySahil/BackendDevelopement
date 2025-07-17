import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("media", media);

    await axiosInstance.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          className="border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
