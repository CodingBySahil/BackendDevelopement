import Navbar from "../components/Navbar";

const Home = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          You're successfully logged in! 🎉
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800">
              Account Info
            </h3>
            <p className="text-blue-700 mt-2">
              Manage your profile and settings.
            </p>
          </div>

          <div className="bg-green-100 border border-green-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-green-800">
              Recent Activity
            </h3>
            <p className="text-green-700 mt-2">View your latest actions.</p>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-yellow-800">
              Notifications
            </h3>
            <p className="text-yellow-700 mt-2">Check updates and alerts.</p>
          </div>

          <div className="bg-purple-100 border border-purple-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-purple-800">Support</h3>
            <p className="text-purple-700 mt-2">Need help? We're here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
