

import React from 'react';
import styles from './HomeNavbar.module.css';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <div className={styles.sideNavbar}>
      <ul>
        <li> <h3><Link to='/'>Intellect Coin</Link></h3></li>
        <li> <Link to="/bloggingform">Create Blogs</Link></li>

        <li> <Link to="/Contact">Contact Us</Link></li>
        <li> <Link to="/companyregister">Company Registration</Link></li>
        <li><Link to="/UserProfileData">Browse Projects</Link></li>
        <li> <Link to="/companylist">Company List</Link></li>
        <li>   <Link to="/registration">Registration</Link></li>
        
      </ul>
    </div>
  );
};

export default SideNavbar;

