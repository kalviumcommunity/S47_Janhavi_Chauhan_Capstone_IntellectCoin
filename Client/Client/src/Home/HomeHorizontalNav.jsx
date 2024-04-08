import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeHor.module.css';
import PersonalProfile from '../components/PersonalProfile';

const HomeHorizontal = () => {
  const id = localStorage.getItem('id');
  return (
    <div className={styles.navbar}>
      <Link to={`/personalprofile/${id}`} className={styles.link}>Profile</Link>
      <button className={styles.button}>Logout</button>
      <button className={styles.button}>Help</button>
    </div>
  );
}

export default HomeHorizontal;
