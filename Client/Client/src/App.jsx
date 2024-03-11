import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
    phoneNumber: ''
  });

  useEffect(() => {
    axios.get('http://localhost:4000/registrations')
      .then(response => {
        setRegistrations(response.data);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/register', formData)
      .then(response => {
        setRegistrations([...registrations, response.data]);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmation: '',
          phoneNumber: ''
        });
      })
      .catch(error => {
        console.error('Error adding registration:', error);
      });
  };

  return (
    <div className="App">
      <h1>Registrations</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="password" name="confirmation" value={formData.confirmation} onChange={handleChange} placeholder="Confirm Password" />
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <button type="submit">Register</button>
      </form>
      <ul>
        {registrations.map(registration => (
          <li key={registration._id}>
            <div>Name: {registration.name}</div>
            <div>Email: {registration.email}</div>
            <div>Phone Number: {registration.phoneNumber}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
