import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CommonNavbar.module.css'; 
import Logout from '../components/Authentication/Logout';

const CommonNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     
        <button className={styles.toggleButton} onClick={toggleNavbar}>
          ☰
        </button>
   
      <nav className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
        <Link to="/home" className={styles.navbarLink}>Home</Link>
        <Logout />
      </nav>
    </>
  );
};

export default CommonNavbar;
