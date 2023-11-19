import React, { useState } from 'react';
import './customerModal.css';
import apiCustomers from '../../api/ApiCustomers';
const CustomerModalFormCard = ({ show, onClose }) => {
  // Existing state for form fields
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // New state for additional property fields
  const [cityName, setCityName] = useState('');
  const [street, setStreet] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerPropertyData = {
      name,
      phone: phoneNumber,
      cityName,
      street,
      propertyNumber: parseInt(propertyNumber, 10), // Make sure this matches the backend expectation
    };

    try {
      const response = await apiCustomers.createCustomerAndProperty(customerPropertyData);
      console.log('Form Submitted and response received', response.data);
      onClose(); // Optionally close the modal after successful submission
    } catch (error) {
      console.error('There was an error submitting the form', error);
    }
  };

  // Function to handle modal close action
  const handleClose = () => {
    onClose();
  };

  // Return null if `show` prop is false
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-form-card">
        <button className="modal-close-button" onClick={handleClose}>×</button>
        <form onSubmit={handleSubmit} className="modal-form-content">
          <div className="modal-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          {/* New input fields for property information */}
          <div className="modal-form-group">
            <label htmlFor="cityName">City Name</label>
            <input
              type="text"
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="propertyNumber">Property Number</label>
            <input
              type="text"
              id="propertyNumber"
              value={propertyNumber}
              onChange={(e) => setPropertyNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="modal-submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerModalFormCard;
