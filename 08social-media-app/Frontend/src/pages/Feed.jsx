import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PostCard from "../components/PostCard";
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  const fetchPosts = async () => {
    const res = await axiosInstance.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) return alert("Write something or add media!");

    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("media", media);

    await axiosInstance.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setContent("");
    setMedia(null);
    fetchPosts();
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 px-2 sm:px-0">
      {/* ✅ Create Post Box */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold uppercase">
            {user.username[0]}
          </div>
          <form onSubmit={handlePostSubmit} className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind, ${user.username}?`}
              className="w-full border rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
            />
            {media && (
              <div className="mt-2 relative">
                <p className="text-xs text-gray-500">{media.name}</p>
                <button
                  type="button"
                  onClick={() => setMedia(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-blue-600">
                <FaImage className="text-green-500" /> Photo
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-blue-600">
                <FaVideo className="text-purple-500" /> Video
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </label>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Posts List */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            fetchPosts={fetchPosts}
            user={user}
          />
        ))
      )}
    </div>
  );
}
