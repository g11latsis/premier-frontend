import React, { useState, useEffect } from 'react';
import AddStadiumForm from './AddStadiumForm';
import EditStadiumForm from './EditStadiumForm';

function Stadiums() {
  const [stadiums, setStadiums] = useState([]);
  const [message, setMessage] = useState('');
  const [editingStadium, setEditingStadium] = useState(null);

  useEffect(() => {
    fetchStadiums();
  }, []);

  const fetchStadiums = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/stadiums/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStadiums(data);
    } catch (error) {
      console.error('Error fetching stadiums:', error);
    }
  };

  const handleAddStadium = (newStadium) => {
    setStadiums([...stadiums, newStadium]);
    setMessage('Stadium successfully added');
    setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
  };

  const handleEditStadium = (updatedStadium) => {
    setStadiums(stadiums.map(stadium => stadium.id === updatedStadium.id ? updatedStadium : stadium));
    setMessage('Stadium successfully updated');
    setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
    setEditingStadium(null);
  };

  const handleEditClick = (stadium) => {
    setEditingStadium(stadium);
  };

  const handleDelete = async (stadiumId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/stadiums/${stadiumId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setStadiums(stadiums.filter(stadium => stadium.id !== stadiumId));
      setMessage('Stadium successfully deleted');
      setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Error deleting stadium:', error);
      setMessage('Failed to delete stadium');
      setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
    }
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-6">Stadiums</h1>

      <AddStadiumForm onAdd={handleAddStadium} />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Capacity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stadiums.map(stadium => (
            <tr key={stadium.id}>
              <td className="py-2 px-4 border-b">{stadium.name}</td>
              <td className="py-2 px-4 border-b">{stadium.capacity}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleEditClick(stadium)} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(stadium.id)} 
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
      {editingStadium && (
        <EditStadiumForm
          stadium={editingStadium}
          onEdit={handleEditStadium}
          onCancel={() => setEditingStadium(null)}
        />
      )}
    </div>
  );
}

export default Stadiums;
