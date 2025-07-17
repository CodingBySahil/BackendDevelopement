import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axiosInstance from "./api/axiosInstance";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Check user logged in or not (on refresh)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me"); // You should create this API
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Feed user={user} /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
