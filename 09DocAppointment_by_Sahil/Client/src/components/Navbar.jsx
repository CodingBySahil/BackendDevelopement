import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.logo} alt="logo" className="h-8" />
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-8 font-medium text-gray-900">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-black font-bold " : "hover:text-primary"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to={"/doctors"}
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "hover:text-primary"
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "hover:text-primary"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "hover:text-primary"
            }
          >
            CONTACT
          </NavLink>
        </ul>

        {/* Profile / Login */}
        {token ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={assets.profile_pic}
                alt="profile"
                className="w-8 h-8 rounded-full border"
              />
              <img
                src={assets.dropdown_icon}
                alt="dropdown"
                className="w-2.5"
              />
            </div>

            {/* Dropdown (Visible on Hover) */}
            <div className="absolute right-0 top-6 mt-2 w-48 bg-gray-50 shadow-md rounded-md py-2 hidden group-hover:block">
              <p
                onClick={() => navigate("/my-profile")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointments")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => setToken(false)}
                className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
