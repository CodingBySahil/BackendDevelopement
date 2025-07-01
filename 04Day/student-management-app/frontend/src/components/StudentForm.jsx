import { useState } from "react";

export default function StudentForm({ fetchStudents }) {
  const [formData, setFormData] = useState({
    SName: "",
    SClass: "",
    RollNo: "",
    Section: "",
    PhoneNumber: "",
    Address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      SName: "",
      SClass: "",
      RollNo: "",
      Section: "",
      PhoneNumber: "",
      Address: "",
    });
    fetchStudents();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white via-sky-50 to-blue-100 border border-blue-300 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">➕ Add New Student</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-blue-700 mb-1 capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              required={key === "SName" || key === "SClass"}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
      >
        Add Student
      </button>
    </form>
  );
}
