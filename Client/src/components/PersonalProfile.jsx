import React, { useState, useEffect, useContext } from 'react';
import { getUser } from '../services/services';
import { AuthContext } from './Authentication/AuthContext';
import { Link } from 'react-router-dom';
import UserProfileBlogs from './BloggingComponent/UserProfileBlogs';
import UserProfileProjects from './UserRegistrationComponent/UserProjectDisplay';
import UserRegistration from './UserRegistrationComponent/UserRegistration';
import BloggingForm from './BloggingComponent/BloggingForm';  // Import your new component for creating projects
import styles from './PersonalProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const PersonalProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [view, setView] = useState('projects'); // Set default view to 'projects'
  const [totalProjects, setTotalProjects] = useState(0);  // State for total projects count

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

  const handleTotalProjectsUpdate = (count) => {
    setTotalProjects(count);
  };

  const renderContent = () => {
    switch (view) {
      case 'blogs':
        return <UserProfileBlogs />;
      case 'createblog':
        return <BloggingForm />;
      case 'projects':
        return (
          <>
            <UserProfileProjects setTotalProjects={handleTotalProjectsUpdate} />
          </>
        );
      case 'registration':
        return <UserRegistration />;
      default:
        return <UserProfileProjects setTotalProjects={handleTotalProjectsUpdate} />;
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner} />
      <div className={styles.profileSection}>
        <div className={styles.leftSection}>
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
                <p className={styles.languages}>
                  <strong>About: </strong>
                  {userData.languages ? userData.languages : 'No About Updated'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          {/* Display the total projects count and progress bar for 'projects' view */}
          {view === 'projects' && (
            <div className={styles.totalProjects}>
              <p>Total Projects: {totalProjects}</p>
              <div className={styles.chart}>
                <div className={styles.progress} style={{ width: `${totalProjects}%` }}>
                  <span>{totalProjects}</span>
                </div>
                <div className={styles.milestones}>
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((milestone) => (
                    <div
                      key={milestone}
                      className={styles.milestone}
                      style={{ left: `${milestone}%` }}
                    >
                      {milestone}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className={styles.switchButtons}>
            <button onClick={() => setView('blogs')} className={view === 'blogs' ? styles.active : ''}>Blogs</button>
            <button onClick={() => setView('projects')} className={view === 'projects' ? styles.active : ''}>Projects</button>
            <button onClick={() => setView('createblog')} className={view === 'createblog' ? styles.active : ''}>Create Blog</button>
            <button onClick={() => setView('registration')} className={view === 'registration' ? styles.active : ''}>Create Project</button>

          </div>
          <div className={styles.content}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
