
import React from 'react';
import styles from './HomeBodyNav.module.css';
import { Link, useNavigate } from 'react-router-dom';


const HomeBodyNav = ({ setSelectedContent }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.radioInputs}>
        <label className={styles.radio}>
          <input 
            type="radio" 
            name="radio" 
            defaultChecked 
            onClick={() => setSelectedContent('browseProjects')}
          />
           <span className={styles.name}>Browse Projects</span>
        </label>
        <label className={styles.radio}>
          <input 
            type="radio" 
            name="radio" 
            onClick={() => setSelectedContent('companyList')}
          />
          <span className={styles.name}>Company List</span>
        </label>
        <label className={styles.radio}>
          <input 
            type="radio" 
            name="radio" 
            onClick={() => setSelectedContent('blogs')}
          />
          <span className={styles.name}>Blogs</span>
        </label>
        <div className={styles.radio}>
          <span className={styles.name} onClick={() => navigate('/books')}>Books</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default HomeBodyNav;

