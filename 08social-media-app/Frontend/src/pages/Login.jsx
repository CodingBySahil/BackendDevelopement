import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const navigate = useNavigate();

  const motivationalTexts = [
    "Welcome back! We missed you! 👋",
    "Let's make today awesome together! 🚀",
    "Your friends are waiting for your updates! 💬",
    "Ready to explore something amazing? 🌟",
  ];

  useEffect(() => {
    setWelcomeText(
      motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)]
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", form);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {welcomeText}
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign in to continue to your world
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
