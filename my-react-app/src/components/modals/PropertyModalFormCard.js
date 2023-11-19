import React, { useState } from 'react';
import './PropertyModalFormCard.css'; // Make sure this CSS file contains the necessary styles

const PropertyModalFormCard = ({ show, onClose }) => {
  // State for form fields
  const [cityName, setCityName] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');
  const [customer, setCustomer] = useState('');

  // Dummy customer data
  const dummyCustomers = [
    { id: 1, name: 'Customer A' },
    { id: 2, name: 'Customer B' },
    { id: 3, name: 'Customer C' },
  ];

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission logic, like sending data somewhere
    console.log('Form Submitted', { cityName, propertyNumber, customer });
    onClose(); // Optionally close the modal on submission
  };

  // Function to handle modal close action
  const handleClose = () => {
    onClose(); // This function should be passed from the parent component to close the modal
  };

  // Return null if `show` prop is false
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-form-card">
        <button className="modal-close-button" onClick={handleClose}>
          ×
        </button>
        <form onSubmit={handleSubmit} className="modal-form-content">
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
            <label htmlFor="propertyNumber">Property Number</label>
            <input
              type="text"
              id="propertyNumber"
              value={propertyNumber}
              onChange={(e) => setPropertyNumber(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label htmlFor="customer">Customer</label>
            <select
              id="customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            >
              <option value="">Select a Customer</option>
              {dummyCustomers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="modal-submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyModalFormCard;
