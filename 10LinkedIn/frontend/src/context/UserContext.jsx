import { useState, useEffect, createContext } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

// Context to import everywhere
export const UserDataContext = createContext();

const UserContextProvider = ({ children }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const serverURL = useAuthContext();
  const [allPostsData, setAllPostsData] = useState([]);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${serverURL.serverURL}/api/user/get-current-user`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.user);

      setUserData(res.data.user);
    } catch (error) {
      console.log("current user error:", error.message);
      setUserData(null); // fallback
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        `${serverURL.serverURL}/api/post/get-all-posts`,
        {
          withCredentials: true,
        }
      );
      setAllPostsData(res.data.posts);
      return res.data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  useEffect(() => {
    getCurrentUser();
    getAllPosts();
  }, []);
  const value = {
    userData,
    setUserData,
    getCurrentUser,
    editProfile,
    setEditProfile,
    allPostsData,
    setAllPostsData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
