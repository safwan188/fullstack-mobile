import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiProperty from '../../api/ApiProperty';
import GenericTable from '../base/GenericTable'; // Import GenericTable

const PropertyDataTable = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [propertyData, setProperty] = useState([]);
 
    useEffect(() => {
        ApiProperty.getAllProperties()
        .then(response => {
            const processedData = response.data.map(item => ({
                ...item,
                customerName: item.customerId ? item.customerId.name : 'No Customer' // Add flattened customerName
            }));
            setProperty(processedData);
        }) 
        .catch(error => {
            console.error("There was an error fetching the property!", error);
        });
    }, [location]);
    

    // Define the columns for the Property data
    const columns = ['propertyNumber', 'street', 'cityName', 'customerName'];
    const columnDisplayNames = {
        customerName: 'שם לקוח',
        propertyNumber: 'מספר נכס',
        street: 'רחוב',
        cityName: 'עיר',
    };

    


    // Filter the data based on search query and selected column
 
    // Custom cell rendering function for properties
    const renderCell = (item, column) => {
        // Check if the column is 'customerName'
        if (column === 'customerName') {
            // Access the customer's name from the item's customer property
            return item.customerId ? item.customerId.name : 'No Customer';
          
        }
        return item[column];
    };
    

    const handleAddPropertyClick = () => {
        navigate('/propertyform');
    };

    return (
     
            <GenericTable
                title={'טבלת נכסי לקוחות'}
                buttonText=" &#43; נכס חדש "
                onButtonClick={handleAddPropertyClick}
                data={propertyData}
                columns={columns}
                columnDisplayNames={columnDisplayNames}
                renderCell={renderCell}
            />
      
    );
};

export default PropertyDataTable;
