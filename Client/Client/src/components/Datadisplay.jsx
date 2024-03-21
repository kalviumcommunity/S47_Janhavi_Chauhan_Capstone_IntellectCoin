import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom instead of useHistory
import styles from './Datadisplay.module.css'; 

const DataDisplayPage = () => {
  const [registrationsAndEducations, setRegistrationsAndEducations] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/registrations');
      setRegistrationsAndEducations(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    console.log(`Editing registration with ID: ${id}`);
    navigate(`/update-user/${id}`); // Navigate to the UpdateUser page with the ID parameter
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/register/${id}`);
      setRegistrationsAndEducations(prevState => prevState.filter(item => item._id !== id));
      alert('Registration deleted successfully');
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Error deleting registration. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registered Users and Educations</h2>
      {registrationsAndEducations.map((data, index) => (
        <div className={styles['user-container']} key={index}>
          <div className={styles.section}>
            <h3>Personal Information:</h3>
            <p>Name: {data.FirstName} {data.LastName}</p>
            <p>Email: {data.Email}</p>
            <p>Category: {data.Category}</p>
            <p>About: {data.About}</p>
            <p>LinkedIn: {data.linkedin}</p>
            <p>GitHub: {data.github}</p>
            <p>Languages: {data.languages}</p>
          </div>
          <div className={styles.section}>
            <h3>Education Information:</h3>
            <p>College Name: {data.CollegeName}</p>
            <p>Degree: {data.Degree}</p>
            <p>Year of Study: {data.YearOfStudy}</p>
            <p>Skills: {data.Skills}</p>
            <p>About Education: {data.AboutEducation}</p>
            <p>Project Code: {data.ProjectCode}</p>
            <p>Deployed Link: {data.DeployedLink}</p>
            <p>Certificates: {data.Certificates}</p>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => {handleEdit(data._id), console.log(data._id)}}>Edit</button>
            <button onClick={() => handleDelete(data._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataDisplayPage;
