import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EquipmentDataTable.css'; // Ensure this CSS file exists and has the necessary styles

const EquipmentDataTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get access to the location object

  useEffect(() => {
    // Fetch the equipment data when the component mounts or when the location changes
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/equipment');
        if (!response.ok) throw new Error('Network response was not ok.');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('There was a problem fetching equipment data:', error);
      }
    };

    fetchData();
  }, [location]); // Dependency array now includes location

  // Define the columns for the equipment data
  const columns = ['Name', 'Image']; // Adjusted to include human-readable column names

  // Handle navigation to the equipment form
  const navigateToEquipmentForm = () => {
    navigate('/equipmentform');
  };

  return (
    <div className="Equipment-table-container">
      <button onClick={navigateToEquipmentForm} className="add-equipment-button">
        Add Equipment
      </button>
      <table className="Equipment-table">
        <thead>
          <tr>
            {columns.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}> {/* Use unique _id for key if available */}
              <td>{item.name}</td>
              <td>
                {/* Use an img tag to display the image */}
                <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} /> {/* Adjust width as necessary */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentDataTable;
