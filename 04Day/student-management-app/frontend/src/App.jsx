import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch("/todos");
    const data = await res.json();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/todos/${id}`, { method: "DELETE" });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-sky-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <StudentForm fetchStudents={fetchStudents} />
        <StudentList students={students} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
