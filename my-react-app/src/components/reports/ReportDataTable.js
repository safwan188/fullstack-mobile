import React,{useEffect,useState} from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import ApiReports from '../../api/ApiReports';
import SearchComponent from '../base/SearchComponent'; // Import the new search component
import GenericTable from '../base/GenericTable';
const ReportDataTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportsData, setReports] = useState([]);
  useEffect(() => {
    ApiReports.getAllReports()
      .then(response => { 

        setReports(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the reports!", error);
      });
  }, [location]);
  const handleNavigateToForm = () => {
    navigate('/reportsform');
  };
  const handleActionClick = (id, action) => {
    // Here you can define what happens when a button is clicked
    console.log(`Action "${action}" for report with ID: ${id}`);
  };
  const handleNavigateToAssignExpert = (reportId) => {
    navigate(`/reports/${reportId}/assign-expert`);
  };
 const handleNavigateToReportDetails = (reportId) => {
    navigate(`/reports/${reportId}`);
  };
  const getStatusButton = (status, id) => {
    // You can define your logic to return different buttons based on the status
    switch (status) {
      case 'open':
        return <button className="action-button-open" onClick={() => handleNavigateToAssignExpert(id)}>   לחוץ לקבוע טכנאי</button>;
      case 'assigned':
        return <button className="action-button-assigned"  onClick={() => handleActionClick(id, 'in-progress')} > בטיפול טכנאי</button>;
      case 'completed':
        return <button  className="action-button-closed" onClick={() =>handleNavigateToReportDetails(id)}>הושלם</button>;
      default:
        return <span>Unknown Status</span>;
    }
  };
  // Keep the ID in the formatted data for internal use
  const getFormattedData = (report) => {
    const propertyString = report.property 
      ? `${report.property.cityName || ''}, ${report.property.street || ''}, ${report.property.propertyNumber || ''}`
      : 'No Property Info';
  
    return {
      id: report._id,
      date: report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'No Date',
      customerName: report.customer ? report.customer.name : 'Unknown Customer', 
      property: propertyString,
      expertName: report.expert ? report.expert.name : 'No Expert Assigned',
      description: report.description || 'No Description',
      status: report.status || 'Unknown Status',
      index: report.index || 'No Index',
    };
  };
  
  // Do not include 'id' in the columns array since we are not displaying it
  const columns = [  'expertName', 'property', 'customerName', 'date','index']
  const columnDisplayNames = {
    date: ' תאריך פתיחה ',
    customerName: 'שם לקוח',
    property: 'כתובת הנכס',
    expertName: 'שם קבלן',
    description: 'פירוט',
    index: 'מספר דוח',
  };

  const renderCell = (report, column) => {
    const formattedReport = getFormattedData(report);
    if (column === 'actions') {
      return getStatusButton(formattedReport.status, formattedReport.id);
    }
    return formattedReport && formattedReport.hasOwnProperty(column) ? formattedReport[column] : '';
  };
  

  return (
      <GenericTable
        title="טבלת דוחות"
        buttonText="  &#43; דוח חדש " 
        onButtonClick={handleNavigateToForm}
        data={reportsData}
        columns={['actions', ...columns]}
        columnDisplayNames={{ actions: '', ...columnDisplayNames }}
        renderCell={renderCell}
      />
  );
};

export default ReportDataTable;
