import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PostCard from "../components/PostCard";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/posts");
    setPosts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Feed</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet. Be the first to post!</p>
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
