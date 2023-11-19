import React, { useState ,useEffect} from 'react';
import './ReportFormCard.css'; // Ensure this CSS file contains styles for your form
import CustomerModalFormCard from '../modals/customerModal'; // Import the modal component
import PropertyModalFormCard from '../modals/PropertyModalFormCard'; // Import the modal component
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
 
  // Functions to control the customer modal
  const openCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };
  const closeCustomerModal = () => {
    fetchCustomers(); // Fetch customers again when the modal is closed
    setIsCustomerModalOpen(false);
  };
  // Dummy data for the dropdowns
 
 
  useEffect(() => {
    fetchCustomers(); // This will fetch customers when the component mounts
  }, []);

  // Fetch properties when the selected customer changes
  useEffect(() => {
    if (selectedCustomerId) {
      ApiCustomers.getPropertiesForCustomer(selectedCustomerId)
        .then(response => {
          setProperties(response.data);
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
        setCustomers(response.data);
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
  const handleSubmit = async(event) => {
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
    formData.append('status', 'open'); // Include the status

    dateTimeArray.forEach(dt => {
      formData.append('availableStartingDates', new Date(dt.date + ' ' + dt.time).toISOString());
    });

    // Append photos
    photos.forEach(photo => formData.append('findingsPhotos', photo));

    try {
      const response = await ApiReports.createReport(formData); // Ensure API can handle FormData
      console.log('Report created successfully:', response.data);
      alert('Form Submitted and response received');
    } catch (error) {
      console.error('There was an error submitting the form', error);
      alert('Failed to submit the form');
    }
};

  const customerOptions = customers.map(customer => ({
    value: customer._id,
    label: customer.name,
  }));
  
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
    <div className="report-form-card">
      <form onSubmit={handleSubmit} className="report-form-card-content">
      <h2 className="form-title">דוח חדש</h2>

        <div className="select-form-row">
        <SelectInput
          label="שם לקוח"
          value={selectedCustomerId}
          onChange={handleCustomerChange}
          options={customerOptions}
          placeholder="Select a customer"
        />
        <SelectInput
          label="כתובת נכס"
          value={selectedPropertyId}
          onChange={handlePropertyChange}
          options={propertyOptions}
          placeholder="Select a property"
          isDisabled={!selectedCustomerId}
        />
        </div>
        <div  className="date-row-group">
        <button type="button" onClick={addNewDateTime} className="report-form-row-button">
          הוסף עוד תאריך ושעה
        </button>
        <div className="date-time-row">
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
        <div className="report-form-group">
          <label htmlFor="photos">תמונות</label>
          <input
            type="file"
            id="photos"
            onChange={handlePhotoUpload}
            multiple
            accept="image/*" // Accept only images
          />
        </div>
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

        <button type="submit" className="report-form-submit-button">שמור</button>
      </form>
      {/* Assuming CustomerModalFormCard is another component */}
      <CustomerModalFormCard show={isCustomerModalOpen} onClose={closeCustomerModal} />
    </div>
  );
};

export default ReportFormCard;
