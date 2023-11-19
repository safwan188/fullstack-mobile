import React, { useState } from 'react';
import './ExpertFormCard.css'; // Ensure the styling is appropriate for multiple input fields
import ApiExpert from '../../api/ApiExperts';
const ExpertFormCard = () => {
  const [name, setName] = useState('');
  const [education, setEducation] = useState(['']);
  const [experience, setExperience] = useState(['']);
 const [tz, setTz] = useState('');
  const [phone, setPhone] = useState('');
  const handleEducationChange = (index, value) => {
    const updatedEducation = education.map((item, i) => (i === index ? value : item));
    setEducation(updatedEducation);
  };

  const handleExperienceChange = (index, value) => {
    const updatedExperience = experience.map((item, i) => (i === index ? value : item));
    setExperience(updatedExperience);
  };

  const addEducationField = () => {
    setEducation([...education, '']);
  };

  const addExperienceField = () => {
    setExperience([...experience, '']);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredEducation = education.filter(edu => edu.trim() !== '');
    const filteredExperience = experience.filter(exp => exp.trim() !== '');
  
    // Only proceed if there is a name and there's at least one education or experience entry
    if (name.trim() !== '' ) {
      ApiExpert.createExpert({ name, education: filteredEducation, experience: filteredExperience, tz, phone })
        .then(response => {
          // Handle the response here, maybe clear the form or display a success message
        })
        .catch(error => {
          // Handle any errors here, such as displaying a notification to the user
        });
      console.log('Expert Form submitted with:', { name, education: filteredEducation, experience: filteredExperience , tz, phone});
    } else {
      // Handle the case where the form is not correctly filled out, maybe display an error message
    }
  };

  return (
    <div className="form-card">
            <h2 className="form-title">קבלן חדש</h2> {/* Add this line for the title */}

      <form onSubmit={handleSubmit} className="form-card-content">
        <div className="form-group">
          <label htmlFor="tz">תז</label>
          <input
            type="text"
            id="tz"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">טלפון</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">שם</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>הסמכות הקבלן</label>
          {education.map((edu, index) => (
            <input
              key={index}
              type="text"
              value={edu}
              onChange={(e) => handleEducationChange(index, e.target.value)}
              className="form-input"
            />
          ))}
          <button type="button" onClick={addEducationField}>הוסף הסמכה נוספת</button>
        </div>
        <div className="form-group">
          <label>ניסיון מקצועי</label>
          {experience.map((exp, index) => (
            <input
              key={index}
              type="text"
              value={exp}
              onChange={(e) => handleExperienceChange(index, e.target.value)}
              className="form-input"
            />
          ))}
          <button type="button" onClick={addExperienceField}>הוסף ניסיון נוסף</button>
        </div>
        <button type="submit" className="form-submit-button">שמור</button>
      </form>
    </div>
  );
};

export default ExpertFormCard;
