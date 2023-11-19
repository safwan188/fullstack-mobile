// src/components/CustomerFormCard.js
import React, { useState } from 'react';
import './CustomerFormCard.css'; // This should be your CSS file for the CustomerFormCard component
import ApiCustomers from '../../api/ApiCustomers'; // Import your API service

const CustomerFormCard = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tz, setTz] = useState('');
  const [addressInfoChecked, setAddressInfoChecked] = useState(false);
  const [cityName, setCityName] = useState('');
  const [street, setStreet] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerData = { 
      name,
      phone,
      tz,
      ...(addressInfoChecked && { cityName, street, propertyNumber })
    };
    console.log('Customer Form submitted with:', customerData);
    try {
      await ApiCustomers.createCustomer(customerData);
    } catch (error) {
      console.error('There was an error submitting the form', error);
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="form-card-content">
      <h2 className="form-title">לקוח חדש</h2> {/* Add this line for the title */}

      <div className="form-group">
          <label htmlFor="name">שם</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // to ensure the name is entered
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">מספר טלפון</label>
          <input
            type="tel" // using type "tel" for phone numbers
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required // to ensure the phone is entered
            pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$" // a pattern to accept various phone formats
          />
        </div>
        {/* Time Zone field */}
        <div className="form-group">
          <label htmlFor="tz">תז\חפ</label>
          <input
            type="text"
            id="tz"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
          />
        </div>

        {/* Checkbox for Address Information */}
        <div className="form-group">
          <label htmlFor="addressInfo">הוסף נכס ללקוח</label>
          <input
            type="checkbox"
            id="addressInfo"
            checked={addressInfoChecked}
            onChange={(e) => setAddressInfoChecked(e.target.checked)}
          />
        </div>

        {/* Conditional Rendering for Address Fields */}
        {addressInfoChecked && (
          <>
            <div className="form-group">
              <label htmlFor="cityName">עיר</label>
              <input
                type="text"
                id="cityName"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">כביש</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="propertyNumber">מספר נכס</label>
              <input
                type="text"
                id="propertyNumber"
                value={propertyNumber}
                onChange={(e) => setPropertyNumber(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit" className="form-submit-button">שמור</button>
      </form>
    </div>
  );
};

export default CustomerFormCard;
