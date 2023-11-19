import React from 'react';
import './GenericFormCard.css'; // Ensure to create this CSS file for styling

const GenericFormCard = ({ title, fields, onSubmit }) => {
  const handleChange = (fieldId, value) => {
    // Implement logic to handle changes in fields
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(); // Call the passed onSubmit function
    }
  };

  return (
    <div className="generic-form-card">
      {title && <h2>{title}</h2>}
      <div className="generic-form-card-content">
        {fields.map((field) => (
          <div key={field.id} className="generic-form-group">
            <label>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                readOnly={field.readOnly}
                className={field.className}
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                readOnly={field.readOnly}
                className={field.className}
              />
            )}
          </div>
        ))}
        <div className="form-actions">
          <button onClick={handleSubmit} className="generic-form-submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericFormCard;
