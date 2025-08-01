import axios from "axios";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8127/api/auth/logout", {
        withCredentials: true,
      });
      console.log(res.data.message); // Optionally show a toast or redirect
      // Optional: redirect to login
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7]">
      <Navbar />

      <h1>This is the home page I will design</h1>
      <button className="cursor-pointer hover:text-2xl" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
