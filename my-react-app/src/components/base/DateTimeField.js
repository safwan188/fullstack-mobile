import React from 'react';
import './DateTimeField.css';
const DateTimeField = ({ index, dateTime, handleDateTimeChange, removeDateTime }) => {
  // Generate hour options (0-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    return `${i < 10 ? '0' : ''}${i}:00`; // Format: HH:00
  });

  
 
    return (
      <div className="date-time-row">
        <div className="report-form-group">
          <label htmlFor={`reportDate${index}`}>תאריך בדיקה</label>
          <input
            type="date"
            id={`reportDate${index}`}
            value={dateTime.date}
            onChange={(e) => handleDateTimeChange(index, 'date', e.target.value)}
          />
        </div>
        <div className="report-form-group">
          <label htmlFor={`reportTime${index}`}>שעת הבדיקה</label>
          <select
            id={`reportTime${index}`}
            value={dateTime.time}
            onChange={(e) => handleDateTimeChange(index, 'time', e.target.value)}
          >
            {hourOptions.map(hour => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => removeDateTime(index)} className="report-form-remove-button">
          X
        </button>
      </div>
    );
  };

export default DateTimeField;
