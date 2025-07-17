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
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          SocialApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition text-sm font-medium"
          >
            Feed
          </Link>
          <Link
            to="/create"
            className="text-gray-700 hover:text-blue-600 transition text-sm font-medium"
          >
            Create Post
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 transition text-sm font-medium"
          >
            Profile
          </Link>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          {/* User Avatar (First Letter Placeholder) */}
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold uppercase">
            {user.username[0]}
          </div>
          <span className="text-gray-700 text-sm font-medium">
            {user.username}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
