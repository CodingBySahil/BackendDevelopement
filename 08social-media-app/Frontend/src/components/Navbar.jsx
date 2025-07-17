import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  FaHome,
  FaPlusCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

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
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-700"
        >
          FaceClone
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            <FaHome /> Feed
          </Link>
          <Link
            to="/create"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            <FaPlusCircle /> Create
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            <FaUserCircle /> Profile
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold uppercase">
              {user.username[0]}
            </div>
            <span className="text-gray-700 text-sm font-medium">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
