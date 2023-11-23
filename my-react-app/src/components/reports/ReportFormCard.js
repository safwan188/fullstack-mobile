import React, { useState ,useEffect} from 'react';
import './ReportFormCard.css'; // Ensure this CSS file contains styles for your form
import { useNavigate ,useLocation} from 'react-router-dom';

import ApiCustomers from '../../api/ApiCustomers'; // Import your API service
import ApiReports from '../../api/ApiReports';
import SelectInput from '../base/SelectInput';
import DateTimeField from '../base/DateTimeField';
import ReportFormGroup from '../base/ReportFormGroup';
const ReportFormCard = () => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]); // State for storing uploaded photos


  
  const [dateTimeArray, setDateTimeArray] = useState([
    { date:'', time:'', touched: false },
  ]);
  const addNewDateTime = () => {
    setDateTimeArray([
      ...dateTimeArray,
      { date:'', time:'' ,touched:false} // Use current date and time for new entries
    ]);
  };
  const removeDateTime = (index) => {
    if (dateTimeArray.length > 1) {
      setDateTimeArray(dateTimeArray.filter((_, i) => i !== index));
    } else {
      alert('לא ניתן להסיר את כל התאריכים והשעות. חייב להיות לפחות אחד.');
    }
  };
  const handleDateTimeChange = (index, field, value) => {
    const newDateTimeArray = [...dateTimeArray];
    newDateTimeArray[index][field] = value;
    newDateTimeArray[index].touched = true; // Set touched to true when the user changes the value
    setDateTimeArray(newDateTimeArray);
  };
 
 
  useEffect(() => {
    fetchCustomers(); // This will fetch customers when the component mounts
  }, []);

  // Fetch properties when the selected customer changes
  useEffect(() => {
    if (selectedCustomerId) {
      ApiCustomers.getPropertiesForCustomer(selectedCustomerId)
        .then(response => {
          setProperties(response.data.properties);
          // Reset the selected property if the customer changes
          setSelectedPropertyId(response.data.length > 0 ? response.data[0].id : '');
        })
        .catch(error => {
          console.error('Error fetching properties for customer', error);
        });
    }
  }, [selectedCustomerId]);


  const fetchCustomers = () => {
    ApiCustomers.getAllCustomers()
      .then(response => {
        setCustomers(response.data.customers);
        // Optionally, select the first customer in the list
        if (response.data.length > 0) {
          setSelectedCustomerId(response.data[0].id);
        }
      })
      .catch(error => {
        console.error('Error fetching customers', error);
      });
  };
  
  
  const [description, setDescription] = useState(''); // State for the description field
  const [subject, setSubject] = useState(''); // State for the subject field
  // Form submission handler
// Form submission handler
const handleSubmit = async (event) => {
  event.preventDefault();
  const isDateTimeComplete = dateTimeArray.every(dateTime => dateTime.touched);

  if (!isDateTimeComplete) {
    alert('Please confirm or change all date and time fields before submitting the report.');
    return;
  }

  if (!selectedCustomerId || !selectedPropertyId) {
    alert('Please select both a customer and a property before submitting the report.');
    return;
  }

  // Prepare data for the POST request using FormData
  const formData = new FormData();
  formData.append('customer', selectedCustomerId);
  formData.append('property', selectedPropertyId);
  formData.append('subject', subject);
  formData.append('description', description);

  dateTimeArray.forEach((dt) => {
    if (dt.date && dt.time) {
      // Combine date and time into a single ISO string
      const dateTimeISO = new Date(dt.date + 'T' + dt.time).toISOString();
      formData.append('availableStartingDates', dateTimeISO);
    }
  });
  
  // Append photos
  photos.forEach((photo) => formData.append('customerPhotos', photo));

  try {
    const response = await ApiReports.createReport(formData); // Ensure API can handle FormData
    console.log('Report created successfully:', response.data);
    alert('Form Submitted and response received');
    navigate(`/reports`); // Navigate to the new report's details page
  } catch (error) {
    console.error('There was an error submitting the form', error);
    alert('Failed to submit the form');
  }
};


  const customerOptions = customers.length > 0 ? customers.map(customer => ({
    value: customer._id,
    label: customer.name,
  })) : [];
  
  const propertyOptions = properties.map(property => ({
    value: property._id,
    label: `${property.cityName}, ${property.street}, ${property.propertyNumber}`,
  }));
  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomerId(selectedOption.value);
  };
  const handlePhotoUpload = (event) => {
    const uploadedPhotos = Array.from(event.target.files);
    setPhotos(uploadedPhotos); // Store the uploaded files in state
  };
  const handlePropertyChange = (selectedOption) => {
    setSelectedPropertyId(selectedOption.value);
  };
  return (
    <div className="report-form-card2">
      <form onSubmit={handleSubmit} className="report-form-card-content2">
        <h2 className="form-title2">דוח חדש</h2>
     
        <div className="customer-property-container2">
          <div className="form-section2">
            <SelectInput
              label="שם לקוח"
              value={selectedCustomerId}
              onChange={handleCustomerChange}
              options={customerOptions}
              placeholder="Select a customer"
            />
          </div>
          <div className="form-section2">
            <SelectInput
              label="כתובת נכס"
              value={selectedPropertyId}
              onChange={handlePropertyChange}
              options={propertyOptions}
              placeholder="Select a property"
              isDisabled={!selectedCustomerId}
            />
          </div>
        </div>

        <div className="form-section2">
          <div className="date-time-container2">
            <button type="button" onClick={addNewDateTime} className="add-date-time-button2">
              הוסף עוד תאריך ושעה
            </button>
            {dateTimeArray.map((dateTime, index) => (
              <DateTimeField
                key={index}
                index={index}
                dateTime={dateTime}
                handleDateTimeChange={handleDateTimeChange}
                removeDateTime={removeDateTime}
              />
            ))}
          </div>
        </div>

        <div className="form-section2">
          <ReportFormGroup
            label="תחום"
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="כתוב תחום הפניה"
          />
          <ReportFormGroup
            label="תיאור"
            id="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="כתוב תיאור מלא של הבעיה"
          />
          <div className="file-upload-container2">
            <label htmlFor="photos">תמונות</label>
            <input
              type="file"
              id="photos"
              onChange={handlePhotoUpload}
              multiple
              accept="image/*"
            />
          </div>
        </div>

        <button type="submit" className="report-form-submit-button2">שמור</button>
      </form>
    </div>
  );
};


export default ReportFormCard;
