import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/register", form);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Username"
            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
