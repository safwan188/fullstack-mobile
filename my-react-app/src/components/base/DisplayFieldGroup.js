import React from 'react';
import './DisplayFieldGroup.css';
const DisplayFieldGroup = ({ label, value }) => {
  return (
    <div className="display-group">
      <label>{label}</label>
      <span>{value}</span>
    </div>
  );
};

export default DisplayFieldGroup;
