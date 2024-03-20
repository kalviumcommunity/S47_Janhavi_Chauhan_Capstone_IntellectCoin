import React, { useState } from 'react';
import axios from 'axios';

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
    AboutEducation: '',
    ProjectCode: '',
    DeployedLink: '',
    Certificates: ''
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
      const response = await axios.post('http://localhost:4000/register', formData);
      console.log('Registration successful! Response:', response.data); 
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Registration and Education Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Personal Information</h3>
          <input type="text" name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={handleChange} />
          <input type="text" name="LastName" placeholder="Last Name" value={formData.LastName} onChange={handleChange} />
          <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
          <input type="text" name="Category" placeholder="Category" value={formData.Category} onChange={handleChange} />
          <textarea name="About" placeholder="About" value={formData.About} onChange={handleChange} />
          <input type="text" name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
          <input type="text" name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} />
          <input type="text" name="languages" placeholder="Languages (comma-separated)" value={formData.languages} onChange={handleChange} />
        </div>
        <div>
          <h3>Education Information</h3>
          <input type="text" name="CollegeName" value={formData.CollegeName} placeholder='College Name' onChange={handleChange} />
          <input type="text" name="Degree" value={formData.Degree}placeholder='Degree' onChange={handleChange} />
          <input type="text" name="YearOfStudy" value={formData.YearOfStudy} placeholder='Year of Study' onChange={handleChange} />
          <input type="text" name="Skills" value={formData.Skills} placeholder='Skills' onChange={handleChange} />
          <input type="text" name="AboutEducation" value={formData.AboutEducation} placeholder='About' onChange={handleChange} />
          <input type="text" name="ProjectCode" value={formData.ProjectCode} placeholder='Project Code Link' onChange={handleChange} />
          <input type="text" name="DeployedLink" value={formData.DeployedLink} placeholder='Deployed Link' onChange={handleChange} />
          <input type="text" name="Certificates" value={formData.Certificates} placeholder='Certificates' onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationAndEducationForm;
