import React from 'react';
import Select from 'react-select';

const SelectInput = ({ label, value, options, onChange, placeholder, isDisabled }) => {
  return (
    <div className="select-form-group">
      <label>{label}</label>
      <Select
        value={options.find(option => option.value === value)}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        className="react-select-container"
        classNamePrefix="react-select"
     
      />
    </div>
  );
};

export default SelectInput;


