import React, { useState } from 'react';
import axios from 'axios';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
   Name : '',
   Description : '',
   Requirements : '',
   LinkedIn : '',
   ContactUs : '',
   Twitter : '',
   Projects : '',
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Company Information</h3>
          <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} />        
          <input type="text" name="Description" placeholder="Description" value={formData.Description} onChange={handleChange} />
          <input type="text" name="Requirements" placeholder="Requirements" value={formData.Requirements} onChange={handleChange} />
          <input type="text" name="LinkedIn" placeholder="LinkedIn" value={formData.LinkedIn} onChange={handleChange} />
          <input type="text" name="ContactUs" placeholder="ContactUs" value={formData.ContactUs} onChange={handleChange} />
          <input type="text" name="Twitter" placeholder="Twitter" value={formData.Twitter} onChange={handleChange} />
          <textarea name="Projects" placeholder="Projects" value={formData.Projects} onChange={handleChange} />
          <input type="text" name="ProjectDescription" placeholder="ProjectDescription" value={formData.ProjectDescription} onChange={handleChange} />
          <input type="text" name="ProjectRequirement" placeholder="ProjectRequirement" value={formData.ProjectRequirement} onChange={handleChange} />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
