import { useState, useEffect } from "react";
import api from "../services/Api";
import toast from "react-hot-toast";
import { FiSave, FiXCircle } from "react-icons/fi";

const ContactForm = ({ onSave, editData, clearEdit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = toast.loading("Saving...");
    try {
      if (editData) {
        await api.put(`/update_contact/${editData._id}`, form);
        toast.success("Contact updated", { id: t });
        clearEdit();
      } else {
        await api.post("/upload", form);
        toast.success("Contact added", { id: t });
      }
      setForm({ name: "", email: "", phone: "", message: "" });
      onSave();
    } catch {
      toast.error("Save failed", { id: t });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-lg mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editData ? "Edit Contact" : "Add New Contact"}
      </h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 mb-3 rounded"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-3 mb-3 rounded"
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-3 mb-3 rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-3 mb-3 rounded"
        required
      />

      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FiSave className="mr-2" />
          {editData ? "Update" : "Save"}
        </button>
        {editData && (
          <button
            type="button"
            onClick={clearEdit}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <FiXCircle className="mr-2" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
