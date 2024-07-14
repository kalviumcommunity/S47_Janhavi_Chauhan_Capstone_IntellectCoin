import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import s from './Datadisplay.module.css';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState('');
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/userregistration/allprojects');
        const sortedProjects = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
      } catch (error) {
        setError('Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const searchProjects = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = projects.filter(project =>
        project.heading.toLowerCase().includes(lowerCaseQuery) ||
        project.author.username.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProjects(filtered);
    };

    searchProjects();
  }, [searchQuery, projects]);

  const handleCardClick = (e, id) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setClickedProjectId(clickedProjectId === id ? null : id);
  };

  const closeExpandedCard = () => {
    setClickedProjectId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.container}>
       <div className={s.searchInputWrapper}>
       <input
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by project name or author's name"
        className={s.searchInput}
      />
       </div>
      {filteredProjects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className={`${s.projectGrid} ${clickedProjectId ? s.blur : ''}`}>
          {filteredProjects.map((project, index) => (
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
                      Author: <Link to={`/otherusers/${project.author._id}`} className={s.link}>{project.author.username}</Link>
                    </p>
                    <p className={s.createdAt}>Created At: {new Date(project.createdAt).toLocaleString()}</p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={s.heading}>{project.heading}</h2>
                  <p className={s.author}>
                    Author: <Link to={`/otherusers/${project.author._id}`} className={s.link}>{project.author.username}</Link>
                  </p>

                 
                  <p className={s.description}>
                    {project.description}
                  </p>
                  <video
                    controls
                    src={project.video}
                    className={s.video}
                  />
                <p className={s.message}>
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={s.linkView}>View Project</a>
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
