// ReportDetails.js

import React, { useState, useEffect } from 'react';
import ApiReports from '../../api/ApiReports';
import { useParams } from 'react-router-dom';
import './ReportDetails.css';
import axios from 'axios';
import DisplayFieldGroup from '../base/DisplayFieldGroup';
const api=process.env.REACT_APP_API_URL+'/';

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
      const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
      const response = await axios.get(api+`api/reports/${reportId}/pdf`, {
        responseType: 'blob', // Important: indicates that the response should be treated as a Blob
        headers: {
          Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
        }
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
    <div className="reportdetails-header">
      <h1>פרטי דוח {reportDetails.index}</h1>
    </div>
      <div className="reportdetails-grid">
      <div className="reportdetail-item">
        <DisplayFieldGroup
          label="שם לקוח"
          value={reportDetails.customer.name}
        />

        <DisplayFieldGroup
          label="כתובת"
          value={`${reportDetails.property.cityName}, ${reportDetails.property.street}, ${reportDetails.property.propertyNumber}`}
        />

        <DisplayFieldGroup
          label="Status"
          value={reportDetails.status}
        />
      </div>

      <div className="reportdetail-item">
        <DisplayFieldGroup
          label="תאריך בדיקה"
          value={reportDetails.inspectionDate ? new Date(reportDetails.inspectionDate).toLocaleDateString() : 'N/A'}
        />

        <DisplayFieldGroup
          label="טכנאי"
          value={reportDetails.expert.name}
        />

        <DisplayFieldGroup
          label="תחום"
          value={reportDetails.subject}
        />
      </div>
      <div className="reportdetail-item">
        <DisplayFieldGroup
          label="פירוט"
          value={reportDetails.description}
        />
      </div>

    
  
  
        <div className="reportdetail-item-findings">
          <div className="reportdetail-item">
          {reportDetails.findings && (
            <div>
              <label>ממצאים</label>
              <ul>
                {reportDetails.findings.map((finding, index) => (
                  <li key={index}>{finding}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>

        <div className="reportdetail-item findings-photos">
          <label> תמונות  לקוח</label>
        <div className="photos-container">
            {reportDetails.clientPhotos.map((photoSrc, index) => (
                <img key={index} src={api+`${photoSrc.replace(/\\/g, '/')}`} alt={`Finding ${index + 1}`} />            ))}
        </div>
        </div>
        <div className="reportdetail-item findings-photos">
          <label> תמונות</label>
        <div className="photos-container">
            {reportDetails.findingsPhotos.map((photoSrc, index) => (
                <img key={index} src={api+`${photoSrc.replace(/\\/g, '/')}`} alt={`Finding ${index + 1}`} />            ))}
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
