import { useState } from "react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

const Home = () => {
  const [reload, setReload] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // NEW

  const triggerReload = () => {
    setReload((r) => r + 1);
    setIsFormVisible(false); // hide form after save
    setEditData(null);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setEditData(null);
    setIsFormVisible(false); // hide form when searching
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsFormVisible(true); // show form for editing
  };

  const clearEdit = () => {
    setEditData(null);
    setIsFormVisible(false); // hide form on cancel
  };

  const handleAddClick = () => {
    setEditData(null); // clear previous edit
    setIsFormVisible(true); // show form for adding
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200">
      <Navbar onSearch={handleSearch} onAdd={handleAddClick} />

      {/* Centered blurred glass container */}
      <div className="max-w-2xl mx-auto px-4 mt-10">
        <div className="backdrop-blur-lg bg-white/60 shadow-xl rounded-2xl p-6 border border-white/30">
          {isFormVisible && (
            <ContactForm
              onSave={triggerReload}
              editData={editData}
              clearEdit={clearEdit}
            />
          )}

          <ContactList
            reload={reload}
            searchQuery={searchQuery}
            onEdit={handleEdit}
          />
        </div>
      </div>

      {/* Footer (optional aesthetic touch) */}
      <footer className="text-center text-sm text-gray-500 mt-10 pb-6">
        Built with 💙 by{" "}
        <a
          href="https://www.linkedin.com/in/codingBySAHIL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline font-medium"
        >
          codingBySahil
        </a>{" "}
        {new Date().getFullYear()} - All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
