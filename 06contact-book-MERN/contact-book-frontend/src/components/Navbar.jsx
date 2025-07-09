import { useState } from "react";
import { FiSearch, FiUserPlus } from "react-icons/fi";

const Navbar = ({ onSearch, onAdd }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
    setQuery("");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-4 shadow-lg backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center space-x-2 tracking-wide">
          <FiUserPlus className="text-3xl" />
          <span>Contact Manager</span>
        </h1>
        <button
          onClick={onAdd}
          className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 font-medium text-sm ml-4"
        >
          + Add Contact
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-full sm:w-auto"
        >
          <div className="px-3 text-indigo-600">
            <FiSearch />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-sm sm:text-base py-2 px-2 w-full sm:w-64 text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition-all"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
