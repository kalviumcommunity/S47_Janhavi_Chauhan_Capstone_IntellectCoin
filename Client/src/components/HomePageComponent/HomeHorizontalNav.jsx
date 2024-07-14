import React, { useState } from 'react';
import styles from './HomeHor.module.css';
import Logout from '../Authentication/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../images/8.png';
import { Link } from 'react-router-dom';
import ProjectList from '../UserRegistrationComponent/Datadisplay';
import UserProfileBlogs from '../BloggingComponent/BlogDisplay';
import CreateBook from '../Books/Createbook';
import Booksbrowse from '../Books/Booksbrowse';

const HomeHorizontal = () => {
  const [selectedTab, setSelectedTab] = useState('Projects');
  const [isNavActive, setIsNavActive] = useState(false);
  const id = localStorage.getItem('id');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Projects':
        return <ProjectList />;
      case 'Blogs':
        return <UserProfileBlogs />;
      case 'SellBooks':
        return <CreateBook />;
      case 'BuyBooks':
        return <Booksbrowse />;
      default:
        return <ProjectList />;
    }
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.logoo}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h3>
            <b>Intellect Coin</b>
          </h3>
        </div>
        <div className={`${styles.navLinks} ${isNavActive ? styles.active : ''}`}>
          <div className={styles.toggleButton} onClick={() => setIsNavActive(!isNavActive)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul>
            <li
              className={selectedTab === 'Projects' ? styles.active : ''}
              onClick={() => setSelectedTab('Projects')}
            >
              Projects
            </li>
            <li
              className={selectedTab === 'Blogs' ? styles.active : ''}
              onClick={() => setSelectedTab('Blogs')}
            >
              Blogs
            </li>
            <li
              className={selectedTab === 'SellBooks' ? styles.active : ''}
              onClick={() => setSelectedTab('SellBooks')}
            >
              Sell Books
            </li>
            <li
              className={selectedTab === 'BuyBooks' ? styles.active : ''}
              onClick={() => setSelectedTab('BuyBooks')}
            >
              Buy Books
            </li>
          </ul>
        </div>
        <div className={styles.logout}>
          <Link to={`/personalprofile/${id}`} className={styles.link}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </Link>
          <Link to='/books/Cart' className={styles.link}>
            <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
          </Link>
          <Logout />
        </div>
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}

export default HomeHorizontal;
