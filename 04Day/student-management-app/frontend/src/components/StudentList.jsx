export default function StudentList({ students, onDelete }) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        🎓 Student Records
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="relative bg-white p-6 rounded-xl shadow-lg border hover:shadow-2xl transition duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-xl" />

            <h3 className="text-lg font-bold text-blue-700 mb-2">{student.SName}</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><span className="font-medium">Class:</span> {student.SClass}</li>
              <li><span className="font-medium">Roll No:</span> {student.RollNo || "N/A"}</li>
              <li><span className="font-medium">Section:</span> {student.Section || "N/A"}</li>
              <li><span className="font-medium">Phone:</span> {student.PhoneNumber || "N/A"}</li>
              <li><span className="font-medium">Address:</span> {student.Address || "N/A"}</li>
            </ul>

            <button
              onClick={() => onDelete(student._id)}
              className="mt-5 w-full text-red-600 border border-red-500 hover:bg-red-500 hover:text-white py-2 rounded-md transition-all duration-200 font-medium"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
