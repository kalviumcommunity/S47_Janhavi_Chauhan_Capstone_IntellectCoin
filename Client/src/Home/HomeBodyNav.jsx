
import React from 'react';
import styles from './HomeBodyNav.module.css';
import { Link } from 'react-router-dom';

const HomeBodyNav = () => {
  return (
    <>
    <div className={styles.radioInputs}>
      <label className={styles.radio}>
        <input type="radio" name="radio" defaultChecked />
        <span className={styles.name}><Link to="/UserProfileData">Browse Projects</Link></span>
      </label>
      <label className={styles.radio}>
        <input type="radio" name="radio" />
        <span className={styles.name}><Link to="/companylist">Company List</Link></span>
      </label>
      <label className={styles.radio}>
        <input type="radio" name="radio" />
        <span className={styles.name}><Link to="/blogdisplay">Blogs</Link></span>
      </label>

    </div>
    <hr />
    </>
  );
};

export default HomeBodyNav;
