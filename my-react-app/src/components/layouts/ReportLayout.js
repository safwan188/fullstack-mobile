// src/components/Layout.js
import React from 'react';
import './ReportLayout.css'; // Assuming you have CSS for your layout

const ReportLayout = ({ children }) => {
  return (
    <div className="Report-layout">
      {children}
    </div>
  );
};

export default ReportLayout;
