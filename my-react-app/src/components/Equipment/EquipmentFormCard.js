import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios` or `yarn add axios`
import './EquipmentFormCard.css';

const EquipmentFormCard = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('equipmentImage', image);
    }

    try {
      // Replace with your API endpoint
      const response = await axios.post('http://localhost:5000/api/equipment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Equipment Submitted:', response.data);

      // Handle the successful response here, like resetting the form or redirecting the user
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      // Handle errors here, like showing a notification to the user
    }
  };

  // Handles the file selection and updates the image state
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="equipment-form-card">
      <form onSubmit={handleSubmit} className="equipment-form-content">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="equipment-form-submit-button">Submit</button>
      </form>
    </div>
  );
};

export default EquipmentFormCard;
