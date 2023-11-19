// src/components/ExpertRequestDataTable.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ExpertRequestDataTable.css'; // Ensure this CSS file exists and has the necessary styles
import ApiReports from '../../api/ApiReports';
import apiExpertRequests from '../../api/apiExpertRequests';
import SearchComponent from '../base/SearchComponent'; // Adjust the path as necessary
import GenericTable from '../base/GenericTable';
const ExpertRequestDataTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expertRequests, setExpertRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add this state for search query
  const [selectedColumn, setSelectedColumn] = useState(''); // Default column to search by, can be 'name', 'tz', or 'phone'

  useEffect(() => {
    const fetchExpertRequests = async () => {
      try {
        const response = await apiExpertRequests.getAllExpertRequests();
        setExpertRequests(response.data.filter(expertRequest => expertRequest.report.status === 'open'));
      } catch (error) {
        console.error('There was an error fetching the expert requests:', error);
      }
    };

    fetchExpertRequests();
  }, [location]);
 const handleAccept =async (expertRequestId) => {
 
  const data={
    expert:expertRequestId.expert._id,
    inspectionDate:expertRequestId.date,
    expertRequest:expertRequestId._id
  }
  console.log(data);
  console.log(expertRequestId.report);
  ApiReports.assigExpert(expertRequestId.report._id, data);
};

// Function to handle the decline action
const handleSearchChange = (e) => {
  setSearchQuery(e.target.value.toLowerCase());
};

const handleColumnChange = (e) => {
  setSelectedColumn(e.target.value);
};

const filteredexpertRequests = expertRequests.filter((expertRequest) => {
  let searchValue = '';
  switch (selectedColumn) {
    case 'report':
      searchValue = expertRequest.report.customer.name.toLowerCase();
      break;
    case 'expert':
      searchValue = expertRequest.expert.name.toLowerCase();
      break;
    case 'client':
      searchValue = expertRequest.report.customer.name.toLowerCase();
      break;
    case 'date':
    case 'index':
      searchValue = expertRequest[selectedColumn]?.toString().toLowerCase() || '';
      break;
    default:
      break;
  }
  return searchValue.includes(searchQuery);
});
  // Define the columns for the Expert data

  // Handle navigation to the expert form
  const navigateToExpertForm = () => {
    navigate('/expertsform');
  };
  const renderCell = (item, column) => {
    switch (column) {
      case 'actions':
        return (
          <button
            className="accept-button"
            onClick={() => handleAccept(item)}
          >
            אישור בקשה
          </button>
        );
      case 'report':
        return `${item.report.customer.name}, ${item.report.property.cityName}, ${item.report.property.street}, ${item.report.property.propertyNumber}`;
      case 'date':
        return new Date(item.date).toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
      case 'expert':
        return item.expert.name;
      case 'client':
        return item.report.customer.name;
      case 'index':
        return item.report.index;
      default:
        return item[column];
    }
  };

  const columns = ['actions', 'report', 'date', 'expert', 'client', 'index'];
  const columnDisplayNames = {
    report: 'דו״ח',
    expert: 'שם קבלן',
    date: 'תאריך',
    actions: 'פעולות',
    client: 'לקוח',
    index: 'דוח מספר'
  };

  return (
      <GenericTable
        data={expertRequests}
        columns={columns}
        columnDisplayNames={columnDisplayNames}
        renderCell={renderCell}
        title="טבלת בקשות קבלנים"
        buttonText={"   "}
      />
  );
};

export default ExpertRequestDataTable;
