import React, { useState, useEffect } from "react";
import AddCoachForm from "./AddCoachForm";
import EditCoachForm from "./EditCoachForm";

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [message, setMessage] = useState("");
  const [editingCoach, setEditingCoach] = useState(null);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/coaches/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCoaches(data);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  };

  const handleAddCoach = (newCoach) => {
    setCoaches([...coaches, newCoach]);
    setMessage("Coach successfully added");
    setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
  };

  const handleEditCoach = (updatedCoach) => {
    setCoaches(
      coaches.map((coach) => (coach.id === updatedCoach.id ? updatedCoach : coach))
    );
    setMessage("Coach successfully updated");
    setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    setEditingCoach(null);
  };

  const handleEditClick = (coach) => {
    setEditingCoach(coach);
  };

  const handleDelete = async (coachId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/coaches/${coachId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCoaches(coaches.filter((coach) => coach.id !== coachId));
      setMessage("Coach successfully deleted");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error deleting coach:", error);
      setMessage("Failed to delete coach");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    }
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-6">Coaches</h1>
      <AddCoachForm onAdd={handleAddCoach} />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Firstname</th>
            <th className="py-2 px-4 border-b">Lastname</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map(coach => (
            <tr key={coach.id}>
              <td className="py-2 px-4 border-b">{coach.firstname}</td>
              <td className="py-2 px-4 border-b">{coach.lastname}</td>
              <td className="py-2 px-4 border-b">{coach.age}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditClick(coach)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coach.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      {editingCoach && (
        <EditCoachForm
          coach={editingCoach}
          onEdit={handleEditCoach}
          onCancel={() => setEditingCoach(null)}
        />
      )}
    </div>
  );
}
