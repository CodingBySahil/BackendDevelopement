import logo2 from "../assets/logo2.png";
import emptyDp from "../assets/emptyDp.jpg";
import { IoNotificationsSharp, IoSearchSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const { userData } = useContext(UserDataContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    axios.get(`http://localhost:8127/api/auth/logout`, {
      withCredentials: true,
    });
    toast.success("Logout successful");
    // Clear user data from context
    userData(null);
  };
  return (
    <nav className="w-full h-[70px] bg-white fixed top-0 shadow-md z-50 flex items-center justify-between md:justify-around px-4 md:px-8">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4">
        <img
          src={logo2}
          alt="logo"
          className="w-[40px] h-[40px] object-contain"
        />

        {/* Search Bar: visible only on md and above */}
        <form className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <IoSearchSharp className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-40 lg:w-64 text-sm"
          />
        </form>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-4 sm:gap-6 justify-between relative">
        {/* Home */}
        <div className="hidden sm:flex flex-col items-center text-gray-600 hover:text-black cursor-pointer text-sm">
          <TiHome className="text-2xl" />
          <span className="text-xs hidden md:block">Home</span>
        </div>

        {/* Network */}
        <div className="hidden lg:flex flex-col items-center text-gray-600 hover:text-black cursor-pointer text-sm">
          <FaUserGroup className="text-xl" />
          <span className="text-xs">My Network</span>
        </div>

        {/* Notifications */}
        <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer text-sm">
          <IoNotificationsSharp className="text-2xl" />
          <span className="text-xs hidden md:block">Notifications</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={emptyDp}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 px-5 py-4">
              {/* Profile Section */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={emptyDp}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border border-gray-300 mb-3"
                />
                <h1 className="font-semibold text-base text-center mb-3">
                  {`${userData.firstName} ${userData.lastName}`}
                </h1>

                <button
                  onClick={() => console.log("View Profile")}
                  className="w-full text-[#2dc0ff] border border-[#2dc0ff] px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition text-sm"
                >
                  View Profile
                </button>
              </div>

              {/* Divider */}
              <hr className="my-5 border-gray-200" />

              {/* My Network */}
              <button
                onClick={() => console.log("My Network")}
                className="w-full flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm rounded-md transition"
              >
                <FaUserGroup className="text-lg text-gray-500" />
                <span>My Network</span>
              </button>

              {/* Logout Button */}
              <Link
                to={"/login"}
                onClick={handleLogout}
                className="w-full text-center block mt-4 text-[#ec4545] border border-[#ec4545] px-4 py-2 rounded-full font-medium hover:bg-red-50 transition text-sm"
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
