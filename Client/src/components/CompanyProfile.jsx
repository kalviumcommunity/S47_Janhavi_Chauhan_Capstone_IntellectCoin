import React, { useState } from 'react';
import axios from 'axios';
import styles from './CompanyProfile.module.css'; // Import CSS module

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Requirements: '',
    LinkedIn: '',
    ContactUs: '',
    Twitter: '',
    Projects: '',
    ProjectDescription: '',
    ProjectRequirement: '',
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
      const response = await axios.post('http://localhost:4000/companyregister', formData);
      console.log('Registration successful! Response:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}> {/* Apply container class */}
      <form onSubmit={handleSubmit}>
        <div className={styles.formgroup}> {/* Apply form-group class */}
          <h3>Company Information</h3>
          <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="Description" placeholder="Description" value={formData.Description} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="Requirements" placeholder="Requirements" value={formData.Requirements} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="LinkedIn" placeholder="LinkedIn" value={formData.LinkedIn} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="ContactUs" placeholder="ContactUs" value={formData.ContactUs} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="Twitter" placeholder="Twitter" value={formData.Twitter} onChange={handleChange} className={styles['input-field']} />
          <textarea  type="text" name="Projects" placeholder="Projects" value={formData.Projects} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="ProjectDescription" placeholder="ProjectDescription" value={formData.ProjectDescription} onChange={handleChange} className={styles['input-field']} />
          <input type="text" name="ProjectRequirement" placeholder="ProjectRequirement" value={formData.ProjectRequirement} onChange={handleChange} className={styles['input-field']} />
        </div>

        <button type="submit" className={styles.button}>Register</button> {/* Apply button class */}
      </form>
    </div>
  );
};

export default CompanyRegistration;
