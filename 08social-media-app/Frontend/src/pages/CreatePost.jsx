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
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}
