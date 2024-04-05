
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeHor.module.css';

const HomeHorizontal = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/profile" className={styles.link}>Profile</Link>
      <button className={styles.button}>Logout</button>
      <button className={styles.button}>Help</button>
    </div>
  );
}

export default HomeHorizontal;
