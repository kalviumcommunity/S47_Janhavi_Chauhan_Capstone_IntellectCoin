import Navbar from '../pages/Navbar'
import React from 'react';

import HomeNavbar from '../Home/HomeNavbar';
import HomeHorizontal from '../Home/HomeHorizontalNav';
import HomeHeader from '../Home/HomeHeader';
import HomeBodyNav from '../Home/HomeBodyNav';
import { useSelector } from 'react-redux';
function Home() {
  const isAuthenticated = useSelector ((state )=> state.root)
  console.log('routes isAuthenticated:--',isAuthenticated)
    return (
      <>
       <HomeHorizontal/>
       <HomeNavbar/> 
       <HomeHeader/>
       <HomeBodyNav/>
      </>
    );
  }

  export default Home