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
    <div>
      <h2>Feed</h2>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          fetchPosts={fetchPosts}
          user={user}
        />
      ))}
    </div>
  );
}
