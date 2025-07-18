import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PostCard from "../components/PostCard";
import { FaImage, FaVideo, FaFemale, FaMale } from "react-icons/fa";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Posts (Shuffled Randomly Every Time)
  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");
      const shuffledPosts = res.data.sort(() => Math.random() - 0.5);
      setPosts(shuffledPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ Handle Post Submit
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media)
      return alert("Write something or add media!");

    setLoading(true);

    // ✅ Optimistic Post Creation (UI Updates Instantly)
    const tempPost = {
      _id: `temp-${Date.now()}`,
      author: {
        _id: user._id,
        username: user.username,
        profilePic: user.profilePic,
        gender: user.gender,
      },
      content,
      media: media ? URL.createObjectURL(media) : "",
      mediaType: media
        ? media.type.startsWith("video")
          ? "video"
          : "image"
        : "none",
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [tempPost, ...prev]);
    setContent("");
    setMedia(null);

    try {
      const formData = new FormData();
      formData.append("content", tempPost.content);
      if (media) formData.append("media", media);

      const { data } = await axiosInstance.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Replace temp post with real post from server
      setPosts((prev) => prev.map((p) => (p._id === tempPost._id ? data : p)));
    } catch (err) {
      console.error("Failed to create post", err);
      // ❌ Remove temp post if failed
      setPosts((prev) => prev.filter((p) => p._id !== tempPost._id));
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 px-2 sm:px-0">
      {/* ✅ Create Post Box */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          {user.profilePic ? (
            <img
              src={`http://localhost:5000${user.profilePic}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : user.gender === "Female" ? (
            <FaFemale className="w-9 h-9 text-pink-500" />
          ) : (
            <FaMale className="w-9 h-9 text-blue-500" />
          )}

          <form onSubmit={handlePostSubmit} className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind, ${user.username}?`}
              className="w-full border rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
              disabled={loading}
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
                disabled={loading}
                className={`px-4 py-1 rounded-md text-sm transition ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {loading ? "Posting..." : "Post"}
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
            fetchPosts={fetchPosts} // kept for likes/comments refresh
            user={user}
          />
        ))
      )}
    </div>
  );
}
