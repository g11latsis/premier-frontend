import React, { useState, useEffect } from "react";
import AddPlayerForm from "./AddPlayerForm";
import EditPlayerForm from "./EditPlayerForm";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/players/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/teams/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleAddPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
    setMessage("Player successfully added");
    setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
  };

 const handleEditPlayer = (updatedPlayer) => {
    setPlayers(
      players.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player))
    );
    setMessage("Player successfully updated");
    setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    setEditingPlayer(null);
  };

  const handleEditClick = (player) => {
    setEditingPlayer(player);
  };

  const handleDelete = async (playerId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/players/${playerId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPlayers(players.filter((player) => player.id !== playerId));
      setMessage("Player successfully deleted");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error deleting player:", error);
      setMessage("Failed to delete player");
      setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
    }
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-6">Players</h1>
      <AddPlayerForm
        teams={teams}
        onAdd={handleAddPlayer}
        editingPlayer={editingPlayer}
        onEdit={handleEditPlayer}
      />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Firstname</th>
            <th className="py-2 px-4 border-b">Lastname</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Team</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="py-2 px-4 border-b">{player.firstname}</td>
              <td className="py-2 px-4 border-b">{player.lastname}</td>
              <td className="py-2 px-4 border-b">{player.age}</td>
              <td className="py-2 px-4 border-b">{player.position}</td>
              <td className="py-2 px-4 border-b">{player.team}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditClick(player)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
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
      {editingPlayer && (
        <EditPlayerForm
          player={editingPlayer}
          teams={teams}
          onEdit={handleEditPlayer}
          onCancel={() => setEditingPlayer(null)}
        />
      )}
    </div>
  );
}
