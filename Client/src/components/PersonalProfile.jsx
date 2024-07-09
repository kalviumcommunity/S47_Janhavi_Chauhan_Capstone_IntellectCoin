import React, { useState, useEffect, useContext } from 'react';
import { getUser } from '../services/services';
import { AuthContext } from './Authentication/AuthContext';
import { Link } from 'react-router-dom'; 
import UserProfileBlogs from './BloggingComponent/UserProfileBlogs';
import UserProfileProjects from './UserRegistrationComponent/UserProjectDisplay';
import styles from './PersonalProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const PersonalProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

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

  return (
    <div className={styles.container}>
      <div className={styles.banner} />
      <div className={styles.profileSection}>
        <div className={styles.profile}>
          <img src={userData.pic} alt="Profile" className={styles.profileImage} />
        </div>
        <div className={styles.details}>
          <div className={styles.section}>
            <p className={styles.name}>
              {userData.firstName} {userData.lastName}
              <Link to="/completeprofile">
                <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
              </Link>
            </p>
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
            <p className={styles.username}>Username: {userData.username}</p>
            <p className={styles.email}>
              <a href={`mailto:${userData.email}`} target="_blank" rel="noopener noreferrer">{userData.email}</a>
            </p>
            <p className={styles.college}>
              {userData.Degree} | | {userData.CollegeName} | | {userData.YearOfStudy}
            </p>
            <p className={styles.skills}>{userData.Skills}</p>
            <p className={styles.certificates}><strong>Category:</strong> {userData.Certificates}</p>
            <div className={styles.education}>
              <hr className={styles.hr} />
              <p className={styles.languages}>
                <strong>About: </strong>
                {userData.languages ? userData.languages : 'No About Updated'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <UserProfileBlogs />
        <UserProfileProjects />
      </div>
    </div>
  );
};

export default PersonalProfile;
