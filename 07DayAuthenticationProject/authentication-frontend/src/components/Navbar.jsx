import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-blue-600">MyDashboard</h1>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
