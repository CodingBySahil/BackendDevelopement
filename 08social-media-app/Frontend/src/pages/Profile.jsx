import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(user);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [address, setAddress] = useState(user.address || "");
  const [gender, setGender] = useState(user.gender || "Other");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("address", address);
    formData.append("gender", gender);
    if (profilePic) formData.append("profilePic", profilePic);

    const res = await axiosInstance.put("/auth/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setProfile(res.data);
    setEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col items-center">
        <img
          src={
            profile.profilePic
              ? `http://localhost:5000${profile.profilePic}`
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
        />
        <h2 className="text-xl font-bold text-gray-800 mt-3">
          {profile.username}
        </h2>
        <p className="text-gray-500">{profile.email}</p>
        <p className="text-sm text-gray-600 mt-1">Gender: {profile.gender}</p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-700 text-sm">{profile.bio || "No bio yet."}</p>
        <p className="text-gray-500 text-xs">{profile.address}</p>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <p>Posts: {profile.posts?.length || 0}</p>
        <p>Liked: {profile.likedPosts?.length || 0}</p>
        <p>Shared: {profile.sharedPosts?.length || 0}</p>
      </div>

      <button
        onClick={() => setEditing(!editing)}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
      >
        {editing ? "Cancel" : "Edit Profile"}
      </button>

      {editing && (
        <form onSubmit={handleUpdate} className="mt-4 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Update bio..."
              className="w-full border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Update address"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option disabled>-- Select your gender --</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Profile Picture:
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
