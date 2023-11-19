// src/components/ExpertDataTable.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiExperts from '../../api/ApiExperts';
import GenericTable from '../base/GenericTable';

const ExpertDataTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expertsData, setExperts] = useState([]);

  useEffect(() => {
    ApiExperts.getAllExperts()
      .then(response => {
        setExperts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the experts!", error);
      });
  }, [location]);
  // Define the columns for the Expert data
  const columns = ['phone', 'tz', 'name'];
  const columnDisplayNames = {
    name: 'שם',
    tz: 'תעודת זהות',
    phone: 'טלפון',
  };

  // Handle navigation to the expert form
  const navigateToExpertForm = () => {
    navigate('/expertsform');
  };

  // Custom cell rendering function for experts
  const renderExpertCell = (expert, column) => {
    return expert[column];
  };

  return (
   

      <GenericTable
        title={'טבלת קבלנים'}
        buttonText={'הוסף קבלן'}
        onButtonClick={navigateToExpertForm}
        data={expertsData}
        columns={columns}
        columnDisplayNames={columnDisplayNames}
        renderCell={renderExpertCell}
      />
  );
};

export default ExpertDataTable;
