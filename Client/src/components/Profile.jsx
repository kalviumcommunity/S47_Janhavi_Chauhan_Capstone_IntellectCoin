import React, { useState } from 'react';
import axios from 'axios';
import styles from './ProjectRegistration.module.css'; // Importing module CSS

const RegistrationAndEducationForm = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Category: '',
    About: '',
    linkedin: '',
    github: '',
    languages: '',
    CollegeName: '',
    Degree: '',
    YearOfStudy: '',
    Skills: '',
    ProjectCode: '',
    DeployedLink: '',
    Certificates: '',
    PhoneNumber: '' 
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', formData);
      console.log('Registration successful! Response:', response.data); 
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registration and Education Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h3>Personal Information</h3>
          <input type="text" name="FirstName" className={styles.formInput} placeholder="First Name" value={formData.FirstName} onChange={handleChange} />
          <input type="text" name="LastName" className={styles.formInput} placeholder="Last Name" value={formData.LastName} onChange={handleChange} />
          <input type="email" name="Email" className={styles.formInput} placeholder="Email" value={formData.Email} onChange={handleChange} />
          <input type="text" name="Category" className={styles.formInput} placeholder="Category" value={formData.Category} onChange={handleChange} />
          <textarea name="About" className={styles.formTextarea} placeholder="About" value={formData.About} onChange={handleChange} />
          <input type="text" name="linkedin" className={styles.formInput} placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
          <input type="text" name="github" className={styles.formInput} placeholder="GitHub" value={formData.github} onChange={handleChange} />
          <input type="text" name="languages" className={styles.formInput} placeholder="Languages (comma-separated)" value={formData.languages} onChange={handleChange} />
          <input type="number" name="PhoneNumber" className={styles.formInput} placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} /> {/* New phone number field */}
        </div>
        <div className={styles.formSection}>
          <h3>Education Information</h3>
          <input type="text" name="CollegeName" className={styles.formInput} value={formData.CollegeName} placeholder='College Name' onChange={handleChange} />
          <input type="text" name="Degree" className={styles.formInput} value={formData.Degree}placeholder='Degree' onChange={handleChange} />
          <input type="text" name="YearOfStudy" className={styles.formInput} value={formData.YearOfStudy} placeholder='Year of Study' onChange={handleChange} />
          <input type="text" name="Skills" className={styles.formInput} value={formData.Skills} placeholder='Skills' onChange={handleChange} />
          <input type="text" name="AboutEducation" className={styles.formInput} value={formData.AboutEducation} placeholder='About' onChange={handleChange} />
          <input type="text" name="ProjectCode" className={styles.formInput} value={formData.ProjectCode} placeholder='Project Code Link' onChange={handleChange} />
          <input type="text" name="DeployedLink" className={styles.formInput} value={formData.DeployedLink} placeholder='Deployed Link' onChange={handleChange} />
          <input type="text" name="Certificates" className={styles.formInput} value={formData.Certificates} placeholder='Certificates' onChange={handleChange} />
        </div>
        <button type="submit" className={styles.formButton}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationAndEducationForm;
