import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PostCard from "../components/PostCard";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axiosInstance.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-20 px-3">
      <h2 className="text-xl font-bold text-gray-700 mb-4">News Feed</h2>
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
