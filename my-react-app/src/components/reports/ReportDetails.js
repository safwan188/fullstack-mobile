// ReportDetails.js

import React, { useState, useEffect } from 'react';
import ApiReports from '../../api/ApiReports';
import { useParams } from 'react-router-dom';
import './ReportDetails.css';
import axios from 'axios';
const ReportDetails = () => {
  const [reportDetails, setReportDetails] = useState(null);
  const { reportId } = useParams();

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await ApiReports.getReportById(reportId);
        setReportDetails(response.data);
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };
    fetchReportDetails();
  }, [reportId]);

  if (!reportDetails) {
    return <div>Loading report details...</div>;
  }
  const downloadPdf = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/${reportId}/pdf`, {
        responseType: 'blob', // Important: indicates that the response should be treated as a Blob
      });

      // Create a new Blob object using the response data of the file
      const file = new Blob([response.data], { type: 'application/pdf' });

      // Create a link element, use it to download the blob, and then remove it
      const fileURL = URL.createObjectURL(file);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `Report_${reportId}.pdf`); // or another name you want
      document.body.appendChild(fileLink);
      
      fileLink.click();

      // Clean up and revoke the object URL
      URL.revokeObjectURL(fileURL);
      document.body.removeChild(fileLink);
    } catch (error) {
      console.error('Error downloading the PDF report:', error);
    }
  };
  return (
    <div className="reportdetails-container">
      <h1>פרטי דוח {reportDetails.index}</h1>
      <div className="reportdetails-grid">
        <div className="reportdetail-item">
          <label>שם לקוח</label>
          <span>{reportDetails.customer.name}</span>
          <label>כתובת</label>
          <span>{reportDetails.property.cityName + ','+ reportDetails.property.street +','+ reportDetails.property.propertyNumber}</span>
          <label>Status:</label>
          <span>{reportDetails.status}</span>
        </div>
       
        <div className="reportdetail-item">
       
          <label>תאריך בדיקה</label>
          <span>{reportDetails.inspectionDate ? new Date(reportDetails.inspectionDate).toLocaleDateString() : 'N/A'}</span>
          <label>טכנאי</label>
          <span>{reportDetails.expert.name}</span>
          <label>תחום</label>
          <span>{reportDetails.subject}</span>
        </div>
        <div className="reportdetail-item">
          <label>פירוט</label>
          <span>{reportDetails.description}</span>
        </div>
    
  
  
        <div className="reportdetail-item findings">
          <label>ממצאים</label>
          <ul>
            {reportDetails.findings.map((finding, index) => (
              <li key={index}>{finding}</li>
            ))}
          </ul>
        </div>
        
        <div className="reportdetail-item findings-photos">
          <label> תמונות</label>
        <div className="photos-container">
            {reportDetails.findingsPhotos.map((photoSrc, index) => (
                <img key={index} src={`http://localhost:5000/${photoSrc.replace(/\\/g, '/')}`} alt={`Finding ${index + 1}`} />            ))}
        </div>
        </div>
      </div>
      <div className="download-button-container">
        <button className="btn btn-download" onClick={downloadPdf}>הורד כ PDF</button>
      </div>
    </div>
  );
};

export default ReportDetails;
