import React from 'react';
import './DynamicInputFieldGroup.css';
const DynamicInputFieldGroup = ({ label, values, onChange, onAddField }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {values.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          className="form-input"
        />
      ))}
      <button type="button" onClick={onAddField}>הוסף</button>
    </div>
  );
};

export default DynamicInputFieldGroup;
