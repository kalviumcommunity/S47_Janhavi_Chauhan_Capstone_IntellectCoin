import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Datadisplay.module.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const DataDisplayPage = () => {
  const [registrationsAndEducations, setRegistrationsAndEducations] = useState([]);
  const [expandedEducation, setExpandedEducation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/registrations");
      console.log('Response data:', response.data); 
      setRegistrationsAndEducations(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    console.log(`Editing registration with ID: ${id}`);
    navigate(`/update-user/${id}`) 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/register/${id}`);
      console.log(`Deleted registration with ID: ${id}`);
      setRegistrationsAndEducations(prevState => prevState.filter(item => item._id !== id));
      alert('Registration deleted successfully');
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Error deleting registration. Please try again.');
    }
  };

  const toggleEducation = (id) => {
    setExpandedEducation(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const sendMessage = (phoneNumber) => {
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <h2>Registered Users and Educations</h2>
      {registrationsAndEducations.map((data, index) => (
        <div className={styles.usercontainer} key={index}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9884_2DHgeJ1TvweTybwH2d2eTtBNOWn7C38Jdc-3Pw&s" alt="" className={styles.profile} />
          <div className={styles.section}>
            <p className={styles.Name}>Name: {data.FirstName} {data.LastName}</p>
            <p className={styles.Email}>Email: {data.Email}</p>
            <p className={styles.category}>Category: {data.Category}</p>
            <div className={styles.social}>
              <p className={styles.LinkedIn}><a href={data.linkedin}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MoWO6nOSzJpPlNg0HYlffDm9l-HJhBj5qdCGZSbung&s" alt="" /></a></p> 
              <p className={styles.GitHub}><a href={data.github}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqz0aID6B-InxK_03P7tCtqpXNXdawBcro67CyEE0I5g&s" alt="" /></a> </p>
            </div>
            <p className={styles.About}>About: {data.About}</p>
            <p className={styles.languages}>Languages: {data.languages}</p>
            <p className={styles.PhoneNumber}>Phone Number: {data.PhoneNumber}</p> {/* Display phone number */}
          </div>
          <div className={styles.section}>
            <h3 className={styles.heading}>Education Information:</h3>
            <p className={styles.CollegeName}>College Name: {data.CollegeName}</p>
            <p className={styles.Degree}>Degree: {data.Degree}</p>
            <p className={styles.YearOfStudy}>Year of Study: {data.YearOfStudy}</p>
            {expandedEducation[data._id] && (
              <>
                <p className={styles.Skills}>Skills: {data.Skills}</p>
                <p className={styles.AboutEducation}>About Education: {data.AboutEducation}</p>
                <p className={styles.ProjectCode}>Project Code: {data.ProjectCode}</p>
                <p className={styles.DeployedLink}>Deployed Link: {data.DeployedLink}</p>
                <p className={styles.Certificates}>Certificates: {data.Certificates}</p>
              </>
            )}
            <div className={styles.buttons}>
              <button onClick={() => handleEdit(data._id)}>Edit</button>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
              <button onClick={() => toggleEducation(data._id)}>
                {expandedEducation[data._id] ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
          <div>
            <button onClick={() => sendMessage(data.PhoneNumber)}>Message</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataDisplayPage;
