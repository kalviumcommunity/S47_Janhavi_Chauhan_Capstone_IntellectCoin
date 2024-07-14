import { Link } from 'react-router-dom';
import { useState } from 'react';

import './LandingPage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowRight, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import HeroSection from '../components/LandingPageComponent/HeroSection';
import JoinUs from '../components/LandingPageComponent/JoinUs';
import Categories from '../components/LandingPageComponent/Categories';
import Whyus from '../components/LandingPageComponent/Whyus';
import Footer from '../components/LandingPageComponent/Footer';

function LandingPage() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <>
            <nav className="navbar">
                <h3><Link to="/">Intellect Coin</Link></h3>
                <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} className="iconi" />
                </button>
                <div className={`navbar-links ${showMobileMenu ? 'active' : ''}`}>

                    <Link to="/categories" className="navbar-link">Categories</Link>
                    <Link to="/Whyus" className="navbar-link">Why Us?</Link>
                    <Link to="/joinus" className="navbar-link">Join Us</Link>
                    <Link to="/allprojectRoute" className="navbar-link">Browse Projects</Link>
                    <Link to="/blogdisplay" className="navbar-link">Browse blogs</Link>
                </div>
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="JoinNow">
                        Join now
                    </button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/login">
                                <button className="login-btn">Login <FontAwesomeIcon icon={faUser} className='icon-login' /> <FontAwesomeIcon icon={faArrowRight} className='larrow' /></button>
                            </Link>
                            <Link to="/signup">
                                <button className="signup-btn">Signup <FontAwesomeIcon icon={faUserPlus} className='icon-sigin' /> <FontAwesomeIcon icon={faArrowRight} className='sarrow' /></button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <div>
                <HeroSection />
                <Categories />
                <JoinUs />
                <Whyus />
                <Footer />
            </div>
        </>
    );
}

export default LandingPage;
