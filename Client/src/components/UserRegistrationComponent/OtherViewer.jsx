import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OtherViewer() {
    const { userId } = useParams();
    const [userData, setUserData] = React.useState(null);
    const [projects, setProjects] = React.useState([]);
  
    const sendUserIdToServer = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/userregistration/otherview/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data.user);
        setProjects(response.data.projects);
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error sending userId to server:', error);
      }
    };
  
    React.useEffect(() => {
      sendUserIdToServer();
    }, []); 
  
    if (!userData || projects.length === 0) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Profile</h2>
        <div>
          <img src={userData.pic} alt="Profile" style={{ width: '100px', height: '100px' }} />
          <p>Name: {userData.firstName} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>LinkedIn: <a href={userData.linkdin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
          <p>GitHub: <a href={userData.github} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
          <p>Skills: {userData.Skills}</p>
          <p>About: {userData.languages}</p>
        </div>
        <h2>Projects</h2>
        <div>
          {projects.map(project => (
            <div key={project._id}>
              <h3>{project.heading}</h3>
              <p>{project.description}</p>
              <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Project Link</a>
              <video width="320" height="240" controls>
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default OtherViewer;