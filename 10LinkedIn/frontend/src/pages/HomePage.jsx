import Navbar from "../components/Navbar";
import emptyDp from "../assets/emptyDp.jpg";
import { FiCamera, FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { FaPen } from "react-icons/fa6";
import EditProfile from "../components/EditProfile";
import { RxCross2 } from "react-icons/rx";
import { BsImage } from "react-icons/bs";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const HomePage = () => {
  const { userData, editProfile, setEditProfile } = useContext(UserDataContext);
  const { serverURL } = useAuthContext();
  const [frontendPostImage, setFrontendPostImage] = useState("");
  const [backendPostImage, setBackendPostImage] = useState("");
  const [description, setDescription] = useState("");
  const [showUploadPost, setShowUploadPost] = useState(false);
  const postImageRef = useRef();

  const [posting, setPosting] = useState(false);

  function handleImage(e) {
    let file = e.target.files[0];
    setBackendPostImage(file);
    setFrontendPostImage(URL.createObjectURL(file));
  }

  async function handleUploadPost() {
    setPosting(true);
    try {
      let formData = new FormData();
      formData.append("description", description);
      if (backendPostImage) {
        formData.append("image", backendPostImage);
      }
      let result = await axios.post(
        `${serverURL}/api/post/create-post`,
        formData,
        { withCredentials: true }
      );
      console.log(result);
      setPosting(false);
      setShowUploadPost(false);
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to upload post. Please try again.");
      setPosting(false);
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[80px] flex items-center lg:items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row relative">
      {editProfile && <EditProfile />}
      <Navbar />

      <section className="relative w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg">
        <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center">
          <img src={userData.coverImage || ""} alt="" className="w-full" />
          <FiCamera
            className="absolute right-[10px] top-[10px] w-[25px] h-[25px] text-gray-800 cursor-pointer"
            onClick={() => setEditProfile(true)}
          />
        </div>
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[60px] left-[30px] ">
          <img
            src={userData.profileImage || emptyDp}
            alt="profile image"
            className="h-full"
          />
        </div>
        <div className="w-[18px] h-[18px] bg-[#17c1ff] absolute top-[102px] left-[74px] flex justify-center items-center rounded-full cursor-pointer">
          <FiPlus onClick={() => setEditProfile(true)} />
        </div>

        <div className="mt-[30px] pl-[10px]">
          <div className="font-semibold text-[22px]">{`${userData.firstName} ${userData.lastName}`}</div>
          <div className="text-gray-400 text-[16px]">{userData.location}</div>
          <div className="text-gray-400 text-[16px]">
            {userData.headline || ""}
          </div>
          <button
            onClick={() => setEditProfile(true)}
            className=" w-[98%] text-[#2dc0ff] border border-[#2dc0ff] px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition text-sm my-5 flex items-center justify-center gap-[12px] cursor-pointer"
          >
            Edit Profile <FaPen />
          </button>
        </div>
      </section>

      {/* create a post div */}
      {showUploadPost && (
        <div>
          {/* dark bg for create post */}
          <div className="w-full h-full bg-black fixed top-0 z-[100] left-0 opacity-[0.6]"></div>
        </div>
      )}

      {showUploadPost && (
        <div className="w-[90%] max-w-[500px]  h-[550px] bg-white shadow-lg rounded-lg fixed z-[200] p-[20px]  top-[100px] flex items-start justify-start flex-col gap-[20px]">
          {/* cross button */}
          <div className="absolute top-[8px] right-[8px] ">
            <RxCross2
              className="w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer"
              onClick={() => setShowUploadPost(false)}
            />
          </div>
          {/* profile in create post */}
          <div className="flex justify-start items-center gap-[10px] ">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center p-[20px] justify-center cursor-pointer">
              <img
                src={userData.profileImage || emptyDp}
                alt="profile image"
                className="h-full"
              />
            </div>

            <div className="font-semibold text-[18px]">{`${userData.firstName} ${userData.lastName}`}</div>
          </div>
          <textarea
            placeholder="What do you want to talk about..?"
            className={`w-full ${
              frontendPostImage ? "h-[200px]" : "h-[550px]"
            } outline-none border-none p-[10px] resize-none text-[19px] `}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input type="file" hidden ref={postImageRef} onChange={handleImage} />
          <div className="w-full h-[300px] overflow-hidden flex justify-center items-center rounded-lg">
            <img
              src={frontendPostImage || ""}
              alt=""
              className="h-full rounded-lg"
            />
          </div>
          <div className="w-full h-[200px] flex flex-col">
            <div className="p-[20px] flex items-center justify-start border-b-2 border-gray-500">
              <BsImage
                className="w-[24px] h-[24px] text-gray-500 cursor-pointer"
                onClick={() => postImageRef.current.click()}
              />
            </div>

            <div className="flex justify-end items-center">
              <button
                className="w-[100px] h-[50px] rounded-full bg-[#24b2ff] mt-[40px] text-white cursor-pointer"
                onClick={() => handleUploadPost()}
                disabled={posting}
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* #############Post show Section started here############ */}
      <section className="w-full lg:w-[50%] min-h-[200px] bg-[#f0efe7] ">
        <div className="w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center justify-center gap-[10px]">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
            <img
              src={userData.profileImage || emptyDp}
              alt="profile image"
              className="h-full"
            />
          </div>
          <button
            className="w-[75%] h-[60px] border-2 rounded-full border-gray-500 flex items-center justify-start px-[20px] hover:bg-gray-200"
            onClick={() => setShowUploadPost(true)}
          >
            Create a Post
          </button>
        </div>
      </section>

      {/*############## last section ###############*/}
      <section className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg"></section>
    </div>
  );
};

export default HomePage;
