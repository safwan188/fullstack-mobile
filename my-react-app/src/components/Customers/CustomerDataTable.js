// src/components/CustomerDataTable.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiCustomers from '../../api/ApiCustomers'; // Adjust the path as necessary
import GenericTable from '../base/GenericTable';
import SelectInput from '../base/SelectInput'; // Import your SelectInput component

const CustomerDataTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await ApiCustomers.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("There was an error fetching the customers!", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [location]);




  const columns = ['properties', 'phone', 'name', 'tz'];
  const columnDisplayNames = {
    name: 'שם',
    phone: 'טלפון',
    properties: 'נכסים',
    tz: 'ת.ז\\ח.פ'
  };

  const handleAddCustomerClick = () => {
    navigate('/customerform');
  };

  // Custom cell rendering function for customers
  const renderCustomerCell = (customer, column) => {
    if (column === 'properties') {
      const propertyOptions = customer.properties.map(property => ({
        value: property._id,
        label: `${property.street} ${property.propertyNumber}, ${property.cityName}`
      }));
      return (
        <SelectInput 
          options={propertyOptions}
          onChange={(selectedOption) => console.log("Selected:", selectedOption)}
          placeholder="בחר נכס"
        />
      );
    }
    return customer[column];
  };

  return (
     

      <GenericTable
        title="טבלת לקוחות"
        buttonText="  &#43; לקוח חדש " 
        onButtonClick={handleAddCustomerClick}
        data={customers}
        columns={columns}
        columnDisplayNames={columnDisplayNames}
        renderCell={renderCustomerCell}
      />
  );
};

export default CustomerDataTable;
