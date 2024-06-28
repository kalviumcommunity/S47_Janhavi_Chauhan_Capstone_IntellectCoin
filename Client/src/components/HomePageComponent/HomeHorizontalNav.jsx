import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeHor.module.css';
import PersonalProfile from '../../components/PersonalProfile';
import Logout from '../Authentication/Logout';

const HomeHorizontal = () => {
  const id = localStorage.getItem('id');
  return (
    <div className={styles.navbar}>
      <Link to={`/personalprofile/${id}`} className={styles.link}>Profile</Link>

      <button className={styles.button}>Help</button>

      <Logout />
    </div>
  );
}

export default HomeHorizontal;
