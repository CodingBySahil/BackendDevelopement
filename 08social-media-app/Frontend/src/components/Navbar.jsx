import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaFemale,
  FaMale,
} from "react-icons/fa";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  const goToProfile = () => navigate("/profile");

  const renderProfileIcon = () => {
    if (user.profilePic) {
      return (
        <img
          src={`http://localhost:5000${user.profilePic}`}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border"
        />
      );
    }
    return user.gender === "Female" ? (
      <FaFemale className="w-8 h-8 text-pink-500" />
    ) : (
      <FaMale className="w-8 h-8 text-blue-500" />
    );
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* ✅ Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          FaceClone
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium transition"
          >
            <FaHome className="text-lg" /> Feed
          </Link>
        </div>

        {/* ✅ User Profile & Logout */}
        {user && (
          <div className="hidden md:flex items-center gap-3">
            <div
              onClick={goToProfile}
              className="cursor-pointer hover:opacity-90"
            >
              {renderProfileIcon()}
            </div>
            <span
              onClick={goToProfile}
              className="text-gray-700 text-sm font-medium cursor-pointer hover:text-blue-600"
            >
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

        {/* ✅ Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            <FaHome /> Feed
          </Link>
          {user && (
            <>
              <div
                onClick={() => {
                  goToProfile();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600"
              >
                {renderProfileIcon()} {user.username}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm w-full"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
