import React from 'react';

const ReportFormGroup = ({ label, id, type, value, onChange, placeholder, readOnly }) => {
  return (
    <div className="report-form-group">
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default ReportFormGroup;
