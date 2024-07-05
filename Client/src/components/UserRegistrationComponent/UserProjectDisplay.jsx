import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserPersonalProject.module.css';

const UserProfileProjects = () => {
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
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
          setMessage('Error fetching projects');
        }

      } catch (error) {
        setMessage('Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  const handleVideoClick = (videoSrc) => {
    setFullscreenVideo(videoSrc);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
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

const ProjectCard = ({ project, onVideoClick }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const descriptionPreview = project.description.split(' ').slice(0, 25).join(' ');

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
      <p className={styles.date}><em>Created at: {new Date(project.createdAt).toLocaleString()}</em></p>
    </div>
  );
};

export default UserProfileProjects;
