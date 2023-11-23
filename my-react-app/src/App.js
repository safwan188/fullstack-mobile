// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginCard from './components/base/LoginCard'
import ReportDataTable from './components/reports/ReportDataTable';
import ReportFormCard from './components/reports/ReportFormCard';
import ExpertFormCard from './components/experts/ExpertFormCard';
import ExpertDataTable from './components/experts/ExpertDataTable';

import PropertyDataTable from './components/property/PropertyDataTable';
import PropertyFormCard from './components/property/PropertyFormCard';
import CustomerDataTable from './components/Customers/CustomerDataTable';
import ReportLayout from './components/layouts/ReportLayout';
// Sample data for DataTable
import Sidebar from './components/layouts/Sidebar';
import CustomerFormCard from './components/Customers/CustomerFormCard';
import AssignExpertForm from './components/reports/AssignExpertForm';

import ExpertRequestDataTable from './components/expertrequests/ExpertRequestDataTable';
import ReportDetails from './components/reports/ReportDetails';

function App() {
  

   // State to store the fetched equipment data

  
  return (
    <Router>
      <Routes>
        <Route path="/reports/:reportId" element={<ReportLayout><ReportDetails /> <Sidebar></Sidebar></ReportLayout>} />
        <Route path="/expert-requests" element={<ReportLayout><ExpertRequestDataTable /> <Sidebar></Sidebar></ReportLayout>} />
        <Route path="/reports/:reportId/assign-expert" element={<ReportLayout><AssignExpertForm /> <Sidebar></Sidebar></ReportLayout>} />
        <Route path="/customers" element={<ReportLayout><CustomerDataTable />  <Sidebar></Sidebar></ReportLayout>} />
        <Route path="/property" element={<ReportLayout><PropertyDataTable/><Sidebar></Sidebar></ReportLayout>} />
        <Route path="/propertyform" element={<ReportLayout><PropertyFormCard /><Sidebar></Sidebar></ReportLayout>} /> {/* New route for the form */}
        <Route path="/expertsform" element={<ReportLayout><ExpertFormCard /><Sidebar></Sidebar></ReportLayout>} /> {/* New route for the form */}
        <Route path="/experts" element={<ReportLayout><ExpertDataTable  />
        <Sidebar></Sidebar></ReportLayout>} />
        <Route path="/customerform" element={<ReportLayout><CustomerFormCard /><Sidebar></Sidebar></ReportLayout>} /> {/* New route for the form */}
        <Route path="/" element={<ReportLayout><LoginCard /></ReportLayout>} />
        <Route path="/reports" element={<ReportLayout><ReportDataTable  />
        <Sidebar></Sidebar></ReportLayout>} />
        <Route path="/reportsform" element={<ReportLayout><ReportFormCard /><Sidebar></Sidebar></ReportLayout>} /> {/* New route for the form */}
      </Routes>
    </Router>
  );
}

export default App;
