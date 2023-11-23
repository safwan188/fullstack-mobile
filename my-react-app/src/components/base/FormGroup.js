import React from 'react';
const FormGroup = ({ label, inputType, id, value, onChange, options, required, pattern }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {inputType === 'select' ? (
        <select id={id} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          pattern={pattern}
        />
      )}
    </div>
  );
};

export default FormGroup;
