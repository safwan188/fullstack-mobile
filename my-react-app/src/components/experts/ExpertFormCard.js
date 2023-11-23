import React, { useState } from 'react';
import './ExpertFormCard.css';
import ApiExpert from '../../api/ApiExperts';
import FormGroup from '../base/FormGroup';
import DynamicInputFieldGroup from '../base/DynamicInputFieldGroup';
import { useNavigate } from 'react-router-dom';

const ExpertFormCard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [education, setEducation] = useState(['']);
  const [experience, setExperience] = useState(['']);
  const [tz, setTz] = useState('');
  const [phone, setPhone] = useState('');

  const isHebrew = text => /^[\u0590-\u05FF0-9 ]+$/.test(text);
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

    if (name.trim() === '' || !isHebrew(name) || tz.trim() === '' || phone.trim() === '') {
      alert('אנא מלא את כל השדות בעברית (למעט תז וטלפון).');
      return;
    }

    ApiExpert.createExpert({ name, education: filteredEducation, experience: filteredExperience, tz, phone })
      .then(response => {
        alert('הקבלן נוסף בהצלחה');
        navigate('/experts');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          alert('קיים קבלן עם תז זהה');
        } else {
      
        alert('הקבלן לא נוסף, נסה שנית');
        }
      });
  };

  return (
    <div className="form-card">
      <h2 className="form-title">קבלן חדש</h2>

      <form onSubmit={handleSubmit} className="form-card-content">
        <FormGroup
          label="תז"
          inputType="text"
          id="tz"
          value={tz}
          onChange={(e) => setTz(e.target.value)}
        />

        <FormGroup
          label="טלפון"
          inputType="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <FormGroup
          label="שם"
          inputType="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DynamicInputFieldGroup
          label="הסמכות הקבלן"
          values={education}
          onChange={handleEducationChange}
          onAddField={addEducationField}
        />

        <DynamicInputFieldGroup
          label="ניסיון מקצועי"
          values={experience}
          onChange={handleExperienceChange}
          onAddField={addExperienceField}
        />
        <button type="submit" className="form-submit-button">שמור</button>
      </form>
    </div>
  );
};

export default ExpertFormCard;
