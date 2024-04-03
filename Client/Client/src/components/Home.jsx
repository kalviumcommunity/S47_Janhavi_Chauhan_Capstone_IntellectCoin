import Navbar from '../pages/Navbar'
import React from 'react';
import LogoutButton from './Logout';
function Home() {
    return (
      <>
       <Navbar/>
        <LogoutButton/>
        
        {/* <Link to ="/companyregister"><button>Company Registration</button></Link>
        <Link to ="/UserProfileData">Browse Projects</Link>
        <Link to ="/companylist">Company List</Link>
        <Link to="/registration"><button>Registration</button></Link> */}
      </>
    );
  }

  export default Home