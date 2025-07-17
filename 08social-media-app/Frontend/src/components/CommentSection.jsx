import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function CommentSection({ post, fetchPosts }) {
  const [comment, setComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    await axiosInstance.post(`/comments/${post._id}`, { content: comment });
    setComment("");
    fetchPosts();
  };

  return (
    <div>
      {post.comments.map((c) => (
        <div key={c._id}>
          <strong>{c.author.username}</strong>: {c.content}
        </div>
      ))}
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
