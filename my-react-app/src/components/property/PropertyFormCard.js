import React, { useState, useEffect } from 'react';
import './PropertyFormCard.css'; // Make sure to create this CSS file for styling
import ApiProperty from '../../api/ApiProperty';
import ApiCustomers from '../../api/ApiCustomers';
import SelectInput from '../base/SelectInput';
const PropertyFormCard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [propertyNumber, setPropertyNumber] = useState('');

  // Fetch customers when component mounts
  useEffect(() => {
    ApiCustomers.getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
        // Optionally set the first customer as selected by default
        if (response.data.length > 0) {
          setSelectedCustomerId(response.data[0]._id);
        }
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProperty = {
      cityName: city,
      street: street,
      propertyNumber: propertyNumber,
      customerId: selectedCustomerId
    };
    ApiProperty.createProperty(newProperty)
      .then((response) => {
        console.log('Property created:', response);
        // Additional logic after property creation
      })
      .catch((error) => {
        console.error("Error creating property:", error);
      });
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="form-card-content">
        <div className="form-group">
          <label htmlFor="customerName">:שם לקוח</label>
          <SelectInput
            id="customerName"
            value={selectedCustomerId}
            options={customers.map((customer) => ({
              value: customer._id,
              label: customer.name
            }))}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">:עיר</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">:רחוב</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="streetNumber">:מס בניין</label>
          <input
            type="text"
            id="streetNumber"
            value={propertyNumber}
            onChange={(e) => setPropertyNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PropertyFormCard;
