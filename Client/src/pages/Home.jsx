// import Navbar from '../pages/Navbar'
import React from 'react';

import HomeBodyNav from '../components/HomePageComponent/HomeBodyNav';
import HomeHorizontal from '../components/HomePageComponent/HomeHorizontalNav';
import HomeHeader from '../components/HomePageComponent/HomeHeader';
import SideNavbar from '../components/HomePageComponent/HomeNavbar';
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