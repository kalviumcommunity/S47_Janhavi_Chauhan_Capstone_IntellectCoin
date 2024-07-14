import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserPersonalProject.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const fetchProjects = async (setProjects, setUsername, setMessage, setTotalProjects, setProjectDates) => {
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
      setTotalProjects(response.data.projects.length);
      setProjectDates(response.data.projects.map(project => new Date(project.createdAt)));
    } else {
      setMessage('Error fetching projects');
    }

  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

const UserProfileProjects = ({ setTotalProjects, setProjectDates }) => {
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetchProjects(setProjects, setUsername, setMessage, setTotalProjects, setProjectDates);
  }, [refresh]);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.heading.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, projects]);

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
      <input
        type="text"
        placeholder="Search projects by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.cardContainer}>
        {
          filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onVideoClick={handleVideoClick}
                fetchProjects={() => fetchProjects(setProjects, setUsername, setMessage, setTotalProjects, setProjectDates)}
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

  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Unauthenticated');
        return;
      }

      await axios.delete(`https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/userregistration/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProjects();
      triggerRefresh();
    } catch (error) {
      alert('Error deleting project');
      console.log(error);
    }
  };

  return (
    <div className={styles.card}>
       <div className={styles.cardHeading}>
       <h3 className={styles.heading}>{project.heading}</h3>
      <div className={styles.actions}>
        <p className={styles.edit} onClick={() => handleEditClick(project._id)}><FontAwesomeIcon icon={faPenToSquare} /></p>
        <p className={styles.delete} onClick={() => handleDeleteClick(project._id)}><FontAwesomeIcon icon={faTrash} /></p>
      </div>
       </div>
      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View Project
      </a>
      <p className={styles.date}>Created at: {new Date(project.createdAt).toLocaleString()}</p>
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
     
   
      
    </div>
  );
};

export default UserProfileProjects;
