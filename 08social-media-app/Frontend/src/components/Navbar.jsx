import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Feed</Link>
      <Link to="/create">Create Post</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
      <span>{user.username}</span>
    </nav>
  );
}
