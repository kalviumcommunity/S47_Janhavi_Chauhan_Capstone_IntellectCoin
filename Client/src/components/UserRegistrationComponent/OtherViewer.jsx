import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './OtherViewer.module.css';
import '../../common/Loader.css';

function OtherViewer() {
  const { userId } = useParams();
  const [userData, setUserData] = React.useState(null);
  const [projects, setProjects] = React.useState([]);

  const sendUserIdToServer = async () => {
    try {
      const response = await axios.get(`https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/userregistration/otherview/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserData(response.data.user);
      setProjects(response.data.projects);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending userId to server:', error);
    }
  };

  useEffect(() => {
    sendUserIdToServer();
  }, []);

  if (!userData || projects.length === 0) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="loading">Loading User details...!!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.profileSection}>
        <div className={styles.leftSection}>
          <div className={styles.profile}>
            <img src={userData.pic} alt="Profile" className={styles.profileImage} />
          </div>
          <div className={styles.details}>
            <div className={styles.section}>
              <p className={styles.name}>
                {userData.firstName} {userData.lastName}
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
          <div className={styles.switchButtons}>
            <button className={`${styles.switchButton} ${styles.activeButton}`}>Projects</button>
          </div>
          <div className={styles.content}>
            <h3 className={styles.totalProjects}>
              Total Projects: {projects.length}
              <span className={styles.icon}></span>
            </h3>
            <div className={styles.chart}>
              <div className={styles.progress} style={{ width: `${projects.length * 1}%` }}>
                {projects.length * 1}%
              </div>
              <div className={styles.milestones}>
                {[...Array(11)].map((_, index) => (
                  <div key={index} className={styles.milestone} style={{ left: `${index * 10}%` }}>{index * 10}%</div>
                ))}
              </div>
            </div>
            {projects.map((project) => (
              <div key={project._id} className={styles.section}>
                <h4>{project.heading}</h4>
                <p className={styles.text}>{project.description}</p>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={styles.linko}>
        View Project
      </a>
      <p className={styles.date}>Created at: {new Date(project.createdAt).toLocaleString()}</p>
                <video src={project.video}></video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherViewer;
