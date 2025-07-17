import axiosInstance from "../api/axiosInstance";
import CommentSection from "./CommentSection";

export default function PostCard({ post, fetchPosts, user }) {
  const handleLike = async () => {
    await axiosInstance.put(`/posts/${post._id}/like`);
    fetchPosts();
  };

  return (
    <div>
      <h4>{post.author.username}</h4>
      <p>{post.content}</p>
      {post.media && (
        <img src={`http://localhost:5000/uploads/${post.media}`} alt="media" />
      )}
      <button onClick={handleLike}>Like ({post.likes.length})</button>
      <CommentSection post={post} fetchPosts={fetchPosts} />
    </div>
  );
}
