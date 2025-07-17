export default function Profile({ user }) {
  return (
    <div className="max-w-sm mx-auto mt-24 p-6 bg-white shadow-md rounded-lg text-center">
      <img
        src={
          user.profilePic
            ? user.profilePic
            : "https://via.placeholder.com/150"
        }
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-3"
      />
      <h2 className="text-lg font-bold text-gray-700">{user.username}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="mt-2 text-gray-500 text-sm">{user.bio || "No bio yet."}</p>
    </div>
  );
}
