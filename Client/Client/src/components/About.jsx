import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const RegistrationForm = () => {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Category: '',
    About: '',
    linkedin: '',
    github: '',
    languages: ''
  });

  useEffect(() => {
    axios.get('http://localhost:4000/registrations')
      .then(response => {
        console.log('Fetched registrations:', response.data.data); 
        setRegistrations(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
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
    <div className="Container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={handleChange} />
        <input type="text" name="LastName" placeholder="Last Name" value={formData.LastName} onChange={handleChange} />
        <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
        <input type="text" name="Category" placeholder="Category" value={formData.Category} onChange={handleChange} />
        <textarea name="About" placeholder="About" value={formData.About} onChange={handleChange} />
        <input type="text" name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
        <input type="text" name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} />
        <input type="text" name="languages" placeholder="Languages (comma-separated)" value={formData.languages} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <div className="registered-users">
        <h3>Registered Users:</h3>
        <ul>
          {registrations && registrations.map(registration => (
            <li key={registration._id}>
              <div>First Name: {registration.FirstName}</div>
              <div>Last Name: {registration.LastName}</div>
              <div>Email: {registration.Email}</div>
              <div>Category: {registration.Category}</div>
              <div>About: {registration.About}</div>
              <div> <a href={registration.linkedin}>LinkdIn</a></div>
              <div><a href={registration.github}>GitHub</a></div>
              <div>Languages: {registration.languages}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegistrationForm;
