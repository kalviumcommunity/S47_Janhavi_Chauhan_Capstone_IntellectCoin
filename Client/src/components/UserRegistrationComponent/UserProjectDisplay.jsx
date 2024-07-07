import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserPersonalProject.module.css';
import { useNavigate } from 'react-router-dom';

const fetchProjects = async (setProjects, setUsername, setMessage) => {
  console.log('Fetching projects...');
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthenticated');
      return;
    }

    const response = await axios.get('http://localhost:4000/api/userregistration/user-projects', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data && response.data.projects && response.data.user) {
      setProjects(response.data.projects);
      setUsername(response.data.user.username);
    } else {
      // setMessage('Error fetching projects');
    }

  } catch (error) {
    // setMessage('Error fetching projects');
    console.error('Error fetching projects:', error);
  }
};

const UserProfileProjects = () => {
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchProjects(setProjects, setUsername, setMessage);
  }, [refresh]);

  const handleVideoClick = (videoSrc) => {
    setFullscreenVideo(videoSrc);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <h2>
        {username ? `${username}'s Projects` : 'My Projects'}
      </h2>
      {message && <p>{message}</p>}
      <div className={styles.cardContainer}>
        {
          projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onVideoClick={handleVideoClick}
                fetchProjects={() => fetchProjects(setProjects, setUsername, setMessage)}
                triggerRefresh={triggerRefresh}
              />
            ))
          ) : (
            <p>No projects found.</p>
          )
        }
      </div>
      {fullscreenVideo && (
        <div className={styles.fullscreenVideo} onClick={closeFullscreen}>
          <video controls src={fullscreenVideo} />
        </div>
      )}
    </>
  );
};

const ProjectCard = ({ project, onVideoClick, fetchProjects, triggerRefresh }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const descriptionPreview = project.description.split(' ').slice(0, 25).join(' ');

  const handleEditClick = (projectId) => {
    navigate(`/updateproject/${projectId}`);
  };

  const handleDeleteClick = (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Unauthenticated');
        return;
      }

      const response = axios.delete(`http://localhost:4000/api/userregistration/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response) {
        // alert('Project deleted successfully');
        console.log(response);
        fetchProjects();
        triggerRefresh();
      }
    } catch(error) {
      alert('Error deleting project');
      console.log(error);
    }
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>{project.heading}</h3>
      <video
        controls
        width="100%"
        src={project.video}
        className={styles.video}
        onClick={() => onVideoClick(project.video)}
      />
      <p className={styles.description}>
        {showMore ? project.description : `${descriptionPreview}...`}
        <button onClick={toggleShowMore} className={styles.showMoreButton}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </p>
      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View Project
      </a>
      <div className='Edit-delete'>
        <button onClick={() => handleEditClick(project._id)}>Edit</button>
        <button onClick={() => handleDeleteClick(project._id)}>Delete</button>
      </div>
      <p className={styles.date}><em>Created at: {new Date(project.createdAt).toLocaleString()}</em></p>
    </div>
  );
};

export default UserProfileProjects;
