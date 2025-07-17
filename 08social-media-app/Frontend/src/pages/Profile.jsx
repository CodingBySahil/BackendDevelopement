export default function Profile({ user }) {
  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <img
        src={user.profilePic ? user.profilePic : "default.jpg"}
        alt="Profile"
      />
      <p>Bio: {user.bio}</p>
    </div>
  );
}
