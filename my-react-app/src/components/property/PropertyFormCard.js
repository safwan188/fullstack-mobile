import React, { useState, useEffect } from 'react';
import './PropertyFormCard.css'; // Make sure to create this CSS file for styling
import ApiProperty from '../../api/ApiProperty';
import ApiCustomers from '../../api/ApiCustomers';
import SelectInput from '../base/SelectInput';
import FormGroup from '../base/FormGroup';
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
        setCustomers(response.data.customers);
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
        alert('נכס נוסף בהצלחה');
        console.log('Property created:', response);
        // Additional logic after property creation
      })
      .catch((error) => {
        alert('התרחשה שגיאה בהוספת הנכס');
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
            onChange={(e) => {
              console.log(e); // Check the structure of the event object
              setSelectedCustomerId(e.value);
            }}
            
          />
        </div>
        <FormGroup
        label=":עיר"
        inputType="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <FormGroup
        label=":רחוב"
        inputType="text"
        id="street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <FormGroup
        label=":מס בניין"
        inputType="text"
        id="streetNumber"
        value={propertyNumber}
        onChange={(e) => setPropertyNumber(e.target.value)}
      />
        <button type="submit" className="form-submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PropertyFormCard;
