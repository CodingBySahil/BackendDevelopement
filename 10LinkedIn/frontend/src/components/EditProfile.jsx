import { useContext, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { UserDataContext } from "../context/UserContext";
import emptyDp from "../assets/emptyDp.jpg";
import { FiCamera, FiPlus } from "react-icons/fi";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const { serverURL } = useAuthContext();
  const [saving, setSaving] = useState(false);
  const { userData, setUserData, setEditProfile } = useContext(UserDataContext);
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [headline, setHeadline] = useState(userData?.headline || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [location, setLocation] = useState(userData?.location || "");
  //   for skills
  const [skills, setSkills] = useState(userData?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  //   for education
  const [education, setEducation] = useState(userData?.education || []);
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: "",
  });
  //   for experience
  const [experience, setExperience] = useState(userData?.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
  });

  // profile and cover image
  const profileImage = useRef();
  const coverImage = useRef();
  const [frontendProfileImage, SetFrontendProfileImage] = useState(
    userData.profileImage || emptyDp
  );
  const [backendProfileImage, SetBackendProfileImage] = useState(null);
  const [frontendCoverImage, SetFrontendCoverImage] = useState(
    userData.coverImage || null
  );
  const [backendCoverImage, SetBackendCoverImage] = useState(null);
  //   function for add a skill
  function addSkill() {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill("");
  }

  //   function for removing skill
  function removeSkill(skill) {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    }
  }
  //   function for add education
  function addEducation() {
    if (
      newEducation.college &&
      newEducation.degree &&
      newEducation.fieldOfStudy
    ) {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: "",
    });
  }

  //   function for removing Education
  function removeEducation(edu) {
    if (education.includes(edu)) {
      setEducation(education.filter((e) => e !== edu));
    }
  }
  //   function for add experience
  function addExperience() {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.description
    ) {
      setExperience([...experience, newExperience]);
    }
    setNewExperience({
      title: "",
      company: "",
      description: "",
    });
  }

  //   function for removing experience
  function removeExperience(exp) {
    if (experience.includes(exp)) {
      setExperience(experience.filter((ex) => ex !== exp));
    }
  }

  // function for profile image
  function handleProfileImage(e) {
    let file = e.target.files[0];
    SetBackendProfileImage(file);
    SetFrontendProfileImage(URL.createObjectURL(file));
  }
  // function for cover image
  function handleCoverImage(e) {
    let file = e.target.files[0];
    SetBackendCoverImage(file);
    SetFrontendCoverImage(URL.createObjectURL(file));
  }

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      let formData = new FormData();
      formData.append("fisrtName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("headline", headline);
      formData.append("location", location);
      formData.append("gender", gender);
      formData.append("skills", JSON.stringify(skills));
      formData.append("education", JSON.stringify(education));
      formData.append("experience", JSON.stringify(experience));
      if (backendProfileImage) {
        formData.append("profileImage", backendProfileImage);
      }
      if (backendCoverImage) {
        formData.append("coverImage", backendCoverImage);
      }

      let result = await axios.put(
        `${serverURL}/api/user/update-profile`,
        formData,
        { withCredentials: true }
      );
      console.log(result);
      setUserData(result.data);
      setSaving(false);
      setEditProfile(false);
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };
  return (
    <div className="w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center">
      <div className="w-full h-full bg-black opacity-[0.5] absolute top-0 left-0 right-0"></div>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={profileImage}
        onChange={handleProfileImage}
      />
      <input
        type="file"
        accept="image/*"
        hidden
        ref={coverImage}
        onChange={handleCoverImage}
      />
      <div className="w-[90%] max-w-[500px] h-[600px] bg-white absolute z-[200] overflow-auto shadow-lg rounded-lg p-[7px]">
        <div className="absolute top-[8px] right-[8px] ">
          <RxCross2
            className="w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer"
            onClick={() => setEditProfile(false)}
          />
        </div>
        <div className="w-full h-[150px] bg-gray-500  rounded-lg mt-[40px]">
          <img src={frontendCoverImage} alt="" className="w-full h-full" />
          <FiCamera
            className="absolute  right-[20px] top-[55px] w-[25px] h-[25px] text-gray-800 cursor-pointer"
            onClick={() => coverImage.current.click()}
          />
        </div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden items-center justify-center absolute top-[150px] left-[30px] ">
          <img src={frontendProfileImage} alt="" className="h-full" />
        </div>
        <div className="w-[18px] h-[18px] bg-[#17c1ff] absolute  top-[200px] left-[85px] flex justify-center items-center rounded-full cursor-pointer">
          <FiPlus onClick={() => profileImage.current.click()} />
        </div>
        {/* form div */}
        <div className="w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]">
          <input
            type="text"
            placeholder="First Name"
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="User Name"
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Headlines "
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* dropdown for gender male female other           */}
          <select
            className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* SKills */}
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Skills</h1>
            {skills && (
              <div className="flex flex-col gap-[10px]">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center"
                  >
                    <span>{skill}</span>
                    <RxCross2
                      className="w-[18px] h-[18px] hover:text-blue-500 text-gray-800 font-bold cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="add new skill"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button
                className="w-full text-[#2dc0ff] border border-[#2dc0ff] px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-blue-50 transition text-sm"
                onClick={addSkill}
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Education */}
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Education</h1>
            {education && (
              <div className="flex flex-col gap-[10px]">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="w-full  border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center"
                  >
                    <div>
                      <div>College : {edu.college}</div>
                      <div>Degree : {edu.degree}</div>
                      <div>Field of study : {edu.fieldOfStudy}</div>
                    </div>
                    <RxCross2
                      className="w-[18px] h-[18px] hover:text-blue-500 text-gray-800 font-bold cursor-pointer"
                      onClick={() => removeEducation(edu)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-[10px] items-start">
              {/* input for college */}
              <input
                type="text"
                placeholder="College"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newEducation.college}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, college: e.target.value })
                }
              />
              {/* input for Degree */}
              <input
                type="text"
                placeholder="Degree"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
              />
              {/* input for field of study */}
              <input
                type="text"
                placeholder="Field Of Study"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newEducation.fieldOfStudy}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    fieldOfStudy: e.target.value,
                  })
                }
              />
              <button
                className="w-full text-[#2dc0ff] border border-[#2dc0ff] px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-blue-50 transition text-sm"
                onClick={addEducation}
              >
                Add Education
              </button>
            </div>
          </div>

          {/* Experience */}
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Experience</h1>
            {experience && (
              <div className="flex flex-col gap-[10px]">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="w-full  border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] flex justify-between items-center"
                  >
                    <div>
                      <div>Title : {exp.title}</div>
                      <div>Company : {exp.company}</div>
                      <div>Description : {exp.description}</div>
                    </div>
                    <RxCross2
                      className="w-[18px] h-[18px] hover:text-blue-500 text-gray-800 font-bold cursor-pointer"
                      onClick={() => removeExperience(exp)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-[10px] items-start">
              {/* input for title */}
              <input
                type="text"
                placeholder="Title"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
              />
              {/* input for Company */}
              <input
                type="text"
                placeholder="Company"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
              />
              {/* input for description */}
              <input
                type="text"
                placeholder="Description"
                className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              />
              <button
                className="w-full text-[#2dc0ff] border border-[#2dc0ff] px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-blue-50 transition text-sm"
                onClick={addExperience}
              >
                Add Experience
              </button>
            </div>
          </div>

          {/* final save button */}
          <button
            className="w-full h-[50px] bg-[#17c1ff] text-white text-[18px] rounded-lg cursor-pointer"
            disabled={saving}
            onClick={handleUpdateProfile}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
