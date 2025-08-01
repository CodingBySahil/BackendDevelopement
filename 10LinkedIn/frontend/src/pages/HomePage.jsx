import Navbar from "../components/Navbar";
import emptyDp from "../assets/emptyDp.jpg";
import { FiCamera, FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { FaPen } from "react-icons/fa6";
import EditProfile from "../components/EditProfile";
const HomePage = () => {
  const { userData, editProfile, setEditProfile } = useContext(UserDataContext);

  return (
    <div className="w-full min-h-[100vh] bg-[#f0efe7] pt-[80px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row">
      {editProfile && <EditProfile />}
      <Navbar />

      <div className="relative w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded-lg">
        <div className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center">
          <img src={"emptyDp"} alt="" className="w-full" />
          <FiCamera className="absolute right-[10px] top-[10px] w-[25px] h-[25px] text-gray-800 cursor-pointer" onClick={()=>setEditProfile(true)}/>
        </div>
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center absolute top-[60px] left-[30px] ">
          <img src={emptyDp} alt="" className="h-full" />
        </div>
        <div className="w-[18px] h-[18px] bg-[#17c1ff] absolute top-[102px] left-[74px] flex justify-center items-center rounded-full cursor-pointer">
          <FiPlus onClick={()=>setEditProfile(true)}/>
        </div>

        <div className="mt-[30px] pl-[10px]">
          <div className="font-semibold">{`${userData.firstName} ${userData.lastName}`}</div>
          <div className="text-gray-400 text-[12px]">{userData.location}</div>
          <div className="text-gray-400 text-[12px]">
            {userData.headline || ""}
          </div>
          <button
            onClick={()=>setEditProfile(true)}
            className=" w-[98%] text-[#2dc0ff] border border-[#2dc0ff] px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition text-sm my-5 flex items-center justify-center gap-[12px] cursor-pointer"
          >
            Edit Profile <FaPen />
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[50%] min-h-[200px] bg-white shadow-lg"></div>
      <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg"></div>
    </div>
  );
};

export default HomePage;
