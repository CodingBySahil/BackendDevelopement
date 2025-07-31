import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../public/logo.svg";

const Login = () => {
  const { serverURL } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${serverURL}/api/auth/login`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Login successful!");
      resetForm();
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <img src={logo} alt="Logo" className="w-20 mb-6" />

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-[#0A66C2] mb-6">
          Join LinkedHub
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-2.5 text-sm text-gray-500 cursor-pointer"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-[#0A66C2] hover:bg-[#004182]"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Want to create an account ?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#0A66C2] hover:underline cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
