export default function Profile({ user }) {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg p-6 text-center">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          src={user.profilePic || "default.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
        />
      </div>

      {/* Username */}
      <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
      <p className="text-gray-600 text-sm">{user.email}</p>

      {/* Bio */}
      <p className="text-gray-700 mt-3 text-sm">
        {user.bio || "No bio available."}
      </p>
    </div>
  );
}
