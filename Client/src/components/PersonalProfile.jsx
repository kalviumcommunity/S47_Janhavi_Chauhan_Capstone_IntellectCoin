import React, { useState, useEffect, useContext } from 'react';
import { getUser } from '../services/services';
import { AuthContext } from './Authentication/AuthContext';
import { Link } from 'react-router-dom'; 
import UserProfileBlogs from './BloggingComponent/UserProfileBlogs';
import styles from './PersonalProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserProfileProjects from './UserRegistrationComponent/UserProjectDisplay';

const PersonalProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [showFullLanguages, setShowFullLanguages] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(auth.token);
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [auth.token]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const toggleLanguagesVisibility = () => {
    setShowFullLanguages(!showFullLanguages);
  };

  return (
    <div>
      <h1 className={styles.heading}>
        <img  
          src='https://www.preplaced.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProfileHeader.0f5aa761.gif&w=1080&q=75'
          alt=''
        />
      </h1>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src={userData.pic} alt="Profile" className={styles.profile} />
        </div>
        <div className={styles.details}>
          <div className={styles.contact}>
            <p className={styles.linkedin}>
              <a href={userData.linkdin} target="_blank" rel="noopener noreferrer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MoWO6nOSzJpPlNg0HYlffDm9l-HJhBj5qdCGZSbung&s" alt="LinkedIn" />
              </a>
            </p>
            <p className={styles.github}>
              <a href={userData.github} target="_blank" rel="noopener noreferrer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqz0aID6B-InxK_03P7tCtqpXNXdawBcro67CyEE0I5g&s" alt="GitHub" />
              </a>
            </p>
            <p className={styles.phone}>
              <a href={`https://api.whatsapp.com/send?phone=${userData.PhoneNumber}`} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/4096/4096100.png" alt="WhatsApp" />
              </a>
            </p>
          </div>
          <div className={styles.section}>
            <p className={styles.firstname}> 
              {userData.firstName} {userData.lastName}  
              <Link to="/completeprofile">
                <FontAwesomeIcon icon={faPenToSquare}  className={styles.icon}/>
              </Link>
            </p> 
            <p className={styles.username}>Username: {userData.username}</p>
          </div>
          <p className={styles.email}>
            <a href={`mailto:${userData.email}`} target="_blank" >{userData.email}</a>
          </p>
          <p className={styles.college}> 
            {userData.Degree} | | {userData.CollegeName} | | {userData.YearOfStudy}  
          </p>
          <p className={styles.skills}> {userData.Skills}</p>
          <p className={styles.certificates}><strong>Category:</strong> {userData.Certificates}</p>
          <div className={styles.education}>
            <hr className={styles.hr}/>
            <p className={styles.languages}>
              <strong>About: </strong>
              {userData.languages ? (
                <>
                  {showFullLanguages ? userData.languages : userData.languages.slice(0, 50) + (userData.languages.length > 50 ? '...' : '')}
                  {userData.languages.length > 50 && (
                    <span className={styles.toggleLanguages} onClick={toggleLanguagesVisibility}>
                      {showFullLanguages ? ' Show Less' : ' Show More'}
                    </span>
                  )}
                </>
              ) : 'No languages specified'}
            </p>
          </div>
        </div>
      </div>
      <UserProfileBlogs />
      <UserProfileProjects />
    </div>
  );
};

export default PersonalProfile;
