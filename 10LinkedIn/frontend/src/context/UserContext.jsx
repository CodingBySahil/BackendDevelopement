import { useState, useEffect, createContext } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

// Context to import everywhere
export const UserDataContext = createContext();

const UserContextProvider = ({ children }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const serverURL = useAuthContext();

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${serverURL.serverURL}/api/user/get-current-user`,
        {
          withCredentials: true,
        }
      );
      setUserData(res.data.user);
    } catch (error) {
      console.log("current user error:", error.message);
      setUserData(null); // fallback
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  const value = {
    userData,
    setUserData,
    getCurrentUser,
    editProfile,
    setEditProfile,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
