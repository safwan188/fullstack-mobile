import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiReports from '../../api/ApiReports';
import ApiExperts from '../../api/ApiExperts';
import { useNavigate ,useLocation} from 'react-router-dom';

import './AssignExpertForm.css';
import SelectInput from '../base/SelectInput';
const AssignExpertForm = () => {
  const [report, setReport] = useState(null);
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();
  const imageUrlBase=process.env.REACT_APP_API_URL+'/';
  const { reportId } = useParams();
  const expertOptions = experts.map(expert => ({
    value: expert._id,
    label: expert.name
  }));
  useEffect(() => {
    ApiReports.getReportById(reportId)
      .then((reportData) => {
        setReport(reportData.data);
        console.log(reportData.data);
      })
      .catch((error) => {
        console.error('Error fetching report:', error);
      });
  }, [reportId]);

  useEffect(() => {
    ApiExperts.getAllExperts()
      .then(response => {
        setExperts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the experts!", error);
      });
  }, []);
  const dateOptions = report?.availableStartingDates?.map(date => ({
    value: date,
    label: new Date(date).toLocaleDateString()
  })) || [];
  const handleDateChange = (selectedOption) => {
    setSelectedDate(selectedOption.value);
  };
  const handleExpertChange = (event) => {
    setSelectedExpert(event.target.value);
  };
  
  const handleAssignExpert = () => {
    if (!selectedExpert) {
      alert("Please select an expert to assign");
      return;
    }
    // Assuming your API expects a PUT request to update the report
    ApiReports.assigExpert(reportId, { expert: selectedExpert ,inspectionDate:selectedDate})
      .then(response => {
        // You can set the report with the new expert data or fetch it again
        setReport(prevState => ({ ...prevState, expert: response.data.expert }));
        alert("Expert assigned successfully");
        navigate(`/reports`);

      })
      .catch(error => {
        console.error("Error updating report with new expert:", error);
        alert("Failed to assign expert");
      });
  };
  if (!report || experts.length === 0) {
    return <div>Loading report data...</div>;
  }

  return (
    <div className="assign-expert-form-card">
      <h2>פרטי דוח</h2>
      <div className="assign-expert-form-card-content">
        <div className="form-row top-row">
          <div className="assign-expert-form-group">
            <label>מס דוח</label>
            <input type="text" value={report.index} readOnly />
          </div>
          <div className="assign-expert-form-group">
            <label>שם לקוח</label>
            <input type="text" value={report.customer.name} readOnly />
          </div>
          <div className="assign-expert-form-group">
            <label>תאריך פתיחה</label>
            <input type="text" value={new Date(report.createdAt).toLocaleDateString()} readOnly />
          </div>
          <div className="assign-expert-form-group">
            <label>כתובת</label>
            <input type="text" value={report.property.cityName} readOnly />
          </div>
        </div>
        <div className="report-images">
        <label>תמונות לקוח</label>

  {report.clientPhotos && report.clientPhotos.map((photo, index) => (
    
    <img 
      key={index} 
      src={`${imageUrlBase}${photo}`} 
      alt={`Report Image ${index + 1}`} 
      style={{ width: '200px', height: '200px', objectFit: 'cover' }} // Fixed size with object-fit
    />
  ))}
</div>

        <div className="form-row">
          <div className="assign-expert-form-group full-width">
            <label>תיאור:</label>
            <textarea 
              value={report.description} 
              readOnly 
              className="description-textarea"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="assign-expert-form-group select-container">
            <SelectInput
              label="בחר טכנאי"
              value={selectedExpert}
              onChange={(selectedOption) => setSelectedExpert(selectedOption.value)}
              options={expertOptions}
              placeholder="בחר טכנאי"
              isDisabled={!experts.length}
            />
               <SelectInput
            label="בחר תאריך"
            value={selectedDate}
            onChange={handleDateChange}
            options={dateOptions}
            placeholder="בחר תאריך"
            isDisabled={!report?.availableStartingDates?.length}
          />
          </div>
          <div className="form-actions">
            <button onClick={handleAssignExpert} className="assign-expert-form-submit-button">Assign Expert</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignExpertForm;
