import {Link} from 'react-router-dom'
import { useState } from 'react';

import './LandingPage.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import{faArrowRight} from '@fortawesome/free-solid-svg-icons';
import{faUser} from '@fortawesome/free-solid-svg-icons';

import HeroSection from '../components/LandingPageComponent/HeroSection';
import JoinUs from '../components/LandingPageComponent/JoinUs';
import Categories from '../components/LandingPageComponent/Categories';
import Whyus from '../components/LandingPageComponent/Whyus';
import Footer from '../components/LandingPageComponent/Footer';
function LandingPage(){
    const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
    return(
  <>
    <nav className="navbar">
    
        <h3><Link to='/'>Intellect Coin</Link></h3>
        <ul>
            <Link to="/home">Home</Link>
            <Link to='/Findjob'> Find Job</Link>
            <Link to='/Events'>Events</Link>
            <Link to="/Features">Features</Link>
            <Link to="/Contact">Contact</Link>
            <Link to='/Whyus'>Why Us?</Link>
            <Link to='/Aboutus'>About Us</Link>
            
        </ul>
        <div className="dropdown">
        <button onClick={toggleDropdown} className="JoinNow">
          Join now
        </button>
        {showDropdown && (
          <div className="dropdown-content">
                <Link to="/login"><button className="login-btn">Login<FontAwesomeIcon icon={faUser}  className='icon-login' /> <FontAwesomeIcon icon={faArrowRight}  className='larrow'/></button></Link>
                <Link to="/signup"><button className="signup-btn">Signup <FontAwesomeIcon icon={faUserPlus}  className='icon-sigin' /> <FontAwesomeIcon icon={faArrowRight}  className='sarrow' /></button></Link>
          </div>
        )}
       
      </div>
    </nav>
    <div>
        
        <HeroSection/>
        <Categories/>
        <JoinUs/>
        
        <Whyus/>
        <Footer/>
        
    </div>
  </>
    
)

}

export default LandingPage