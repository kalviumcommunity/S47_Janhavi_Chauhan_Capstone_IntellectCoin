import Navbar from '../pages/Navbar'
import React from 'react';

import HomeNavbar from '../Home/HomeNavbar';
import HomeHorizontal from '../Home/HomeHorizontalNav';
import HomeHeader from '../Home/HomeHeader';
function Home() {
    return (
      <>
       <HomeHorizontal/>
       <HomeNavbar/> 
       <HomeHeader/>
      </>
    );
  }

  export default Home