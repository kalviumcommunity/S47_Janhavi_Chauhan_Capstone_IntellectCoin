import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import s from './Datadisplay.module.css';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [clickedProjectId, setClickedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/userregistration/allprojects');
        const sortedProjects = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sortedProjects);
      } catch (error) {
        setError('Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  const handleVideoClick = (e) => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    } else {
      if (e.target.requestFullscreen) {
        e.target.requestFullscreen();
      } else if (e.target.mozRequestFullScreen) { /* Firefox */
        e.target.mozRequestFullScreen();
      } else if (e.target.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        e.target.webkitRequestFullscreen();
      } else if (e.target.msRequestFullscreen) { /* IE/Edge */
        e.target.msRequestFullScreen();
      }
    }
  };

  const handleCardClick = (e, id) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setClickedProjectId(clickedProjectId === id ? null : id);
  };

  const closeExpandedCard = () => {
    setClickedProjectId(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Projects List</h1>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className={`${s.projectGrid} ${clickedProjectId ? s.blur : ''}`}>
          {projects.map((project, index) => (
            <div
              key={project._id}
              className={`${s.projectItem} ${index === 0 ? s.featured : ''} ${clickedProjectId === project._id ? s.poppedOut : ''}`}
              onClick={(e) => handleCardClick(e, project._id)}
            >
              {clickedProjectId === project._id && (
                <button className={s.closeButton} onClick={closeExpandedCard}>&times;</button>
              )}
              {clickedProjectId === project._id ? (
                <>
                  
                  <video
                    controls
                    src={project.video}
                    className={s.video}
                    onClick={handleVideoClick}
                    onDoubleClick={handleVideoClick}
                  />
                  

                
                  <div className={s.content}>
                    <h2 className={s.heading}>{project.heading}</h2>
                    <p className={s.description}>
                      {project.description}
                    </p>
                    <p className={s.message}>
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={s.link}>View Project</a>
                    </p>
                    <p className={s.author}>
                      Author: <Link to={`/personalprofile/${project.author._id}`} className={s.link}>{project.author.username}</Link>
                    </p>
                    <p className={s.createdAt}>Created At: {new Date(project.createdAt).toLocaleString()}</p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={s.heading}>{project.heading}</h2>
                  <p className={s.description}>
                    {project.description}
                  </p>
                  <video
                    controls
                    src={project.video}
                    className={s.video}
                    onClick={handleVideoClick}
                    onDoubleClick={handleVideoClick}
                  />
                  <p className={s.message}>
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={s.link}>View Project</a>
                  </p>
                  <p className={s.author}>
                    Author: <Link to={`/personalprofile/${project.author._id}`} className={s.link}>{project.author.username}</Link>
                  </p>
                  <p className={s.createdAt}>Created At: {new Date(project.createdAt).toLocaleString()}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
