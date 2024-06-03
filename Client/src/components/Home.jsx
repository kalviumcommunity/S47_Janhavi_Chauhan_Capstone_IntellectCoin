// import Navbar from '../pages/Navbar'
import React from 'react';

import HomeBodyNav from '../pages/HomePage/HomeBodyNav';
import HomeHorizontal from '../pages/HomePage/HomeHorizontalNav';
import HomeHeader from '../pages/HomePage/HomeHeader';
import SideNavbar from '../pages/HomePage/HomeNavbar';
import { useSelector } from 'react-redux';
function Home() {
  const isAuthenticated = useSelector ((state )=> state.root)
  console.log('routes isAuthenticated:--',isAuthenticated)
    return (
      <>
       <HomeHorizontal/>
       {/* <HomeNavbar/>  */}
       <HomeHeader/>
       <HomeBodyNav/>
       <SideNavbar/>
      
      </>
    );
  }

  export default Home