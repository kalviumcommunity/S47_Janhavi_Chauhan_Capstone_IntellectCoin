import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import s from './Datadisplay.module.css';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Projects List</h1>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className={s.projectGrid}>
          {projects.map((project, index) => (
            <div key={project._id} className={`${s.projectItem} ${index === 0 ? s.featured : ''}`}>
              <h2 className={s.heading}>{project.heading}</h2>
              <p className={s.description}>{project.description}</p>
              <video controls src={project.video} className={s.video}/>
              <p className={s.message}>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={s.link}>View Project</a>
              </p>
              <p className={s.author}>
                Author: <Link to={`/personalprofile/${project.author._id}`} className={s.link}>{project.author.username}</Link>
              </p>
              <p className={s.createdAt}>Created At: {new Date(project.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
  