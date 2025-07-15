import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/dashboard", {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch (err) {
        navigate("/login", { replace: true });
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return isAuth ? children : null;
};

export default ProtectedRoute;
