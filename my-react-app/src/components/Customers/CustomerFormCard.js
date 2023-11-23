import React, { useState } from 'react';
import './CustomerFormCard.css';
import ApiCustomers from '../../api/ApiCustomers';
import FormGroup from '../base/FormGroup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CustomerFormCard = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tz, setTz] = useState('');
  const [addressInfoChecked, setAddressInfoChecked] = useState(false);
  const [cityName, setCityName] = useState('');
  const [street, setStreet] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');
  const navigate = useNavigate(); // Create navigate instance
  const isHebrew = text => /^[\u0590-\u05FF0-9 ]+$/.test(text);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isHebrew(name) || (addressInfoChecked && (!isHebrew(cityName) || !isHebrew(street)))) {
      alert('אנא הזן טקסט בעברית בשדות הלא מספריים');
      return;
    }

    if (addressInfoChecked && (!cityName.trim() || !street.trim() || !propertyNumber.trim())) {
      alert('אנא מלא את כל שדות הכתובת');
      return;
    }

    const customerData = { 
      name,
      phone,
      tz,
      ...(addressInfoChecked && { cityName, street, propertyNumber })
    };

    try {
      if (addressInfoChecked){
        await ApiCustomers.createCustomerAndProperty(customerData);
      }
      else{
      await ApiCustomers.createCustomer(customerData);
      }
      alert('לקוח נוסף בהצלחה');
      navigate('/customers'); // Or your desired route
    } catch (error) {
      console.error('There was an error submitting the form', error);
      alert('התרחשה שגיאה בהוספת הלקוח');
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="form-card-content">
        <h2 className="form-title">לקוח חדש</h2>

        <FormGroup
          label="שם"
          inputType="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <FormGroup
          label="מספר טלפון"
          inputType="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <FormGroup
          label="תז\חפ"
          inputType="text"
          id="tz"
          value={tz}
          onChange={(e) => setTz(e.target.value)}
        />

        <div className="form-group">
          <label htmlFor="addressInfo">הוסף נכס ללקוח</label>
          <input
            type="checkbox"
            id="addressInfo"
            checked={addressInfoChecked}
            onChange={(e) => setAddressInfoChecked(e.target.checked)}
          />
        </div>

        {addressInfoChecked && (
          <>
            <FormGroup
              label="עיר"
              inputType="text"
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
            <FormGroup
              label="כביש"
              inputType="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <FormGroup
              label="מספר נכס"
              inputType="text"
              id="propertyNumber"
              value={propertyNumber}
              onChange={(e) => setPropertyNumber(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit" className="form-submit-button">שמור</button>
      </form>
    </div>
  );
};

export default CustomerFormCard;
