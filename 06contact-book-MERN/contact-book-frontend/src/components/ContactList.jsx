import { useEffect, useState } from "react";
import api from "../services/Api";
import ContactCard from "./ContactCard";
import toast from "react-hot-toast";
import { FiUserX } from "react-icons/fi";

const ContactList = ({ reload, searchQuery, onEdit }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false); // optional: add loading state

  const handleDelete = async (id) => {
    const t = toast.loading("Deleting...");
    try {
      await api.delete(`/delete_contact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contact deleted", { id: t });
    } catch {
      toast.error("Delete failed", { id: t });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const endpoint = searchQuery
        ? `/get_contacts_by_name/${encodeURIComponent(searchQuery)}`
        : "/get_all_contacts";
      try {
        const res = await api.get(endpoint);
        setContacts(res.data);
      } catch {
        toast.error("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reload, searchQuery]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Contacts</h2>

      {loading ? (
        <p className="text-gray-600 animate-pulse">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 p-6 rounded-lg shadow-sm">
          <FiUserX className="text-5xl text-gray-400 mb-2" />
          <p className="text-gray-600 text-center">
            No contacts found.
            <br />
            Try adding a new one or clear the search.
          </p>
        </div>
      ) : (
        contacts.map((c) => (
          <ContactCard
            key={c._id}
            contact={c}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default ContactList;
