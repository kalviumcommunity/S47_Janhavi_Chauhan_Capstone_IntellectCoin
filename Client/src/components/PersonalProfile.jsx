
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './PersonalProfile.module.css';


// const PersonalProfile = ({ userId }) => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const id = localStorage.getItem('id') //changed to token
//         console.log("id sent", id);
//         const response = await axios.get(`http://localhost:4000/api/users/getUser/${id}`);

//         setUserData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError('Failed to fetch user data');
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   return (
//     <>
//     <div>
//       <h2>Personal Profile</h2>
//       {error ? (
//         <p>Error: {error}</p>
//       ) : userData ? (
//         <div className={styles.container}>
//           <h3>{userData.firstName} {userData.lastName}</h3>
//           <p>Email: {userData.email}</p>
//           <img src={userData.pic} alt="" />

    
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//     <div>
  
//     </div>
//   </>
//   );
// };

// export default PersonalProfile;

import React, { useState, useEffect, useContext } from 'react';
import { getUser , getBlogsForUser } from '../services/services';
import { AuthContext } from './Authentication/AuthContext';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom';

const PersonalProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(auth.token);
        setUserData(response.data.user);


      
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [auth.token]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
       <Link to="/completeprofile">
        <button>Update Profile</button>
      </Link>
      <h1>User Profile</h1>
      <div className="user-data">
        {/* <img src={userData.pic} alt="Profile" /> */}
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>LinkedIn:</strong> {userData.linkdin}</p>
        <p><strong>GitHub:</strong> {userData.github}</p>
        <p><strong> Spoken Languages:</strong> {userData.languages}</p>
        <p><strong>College Name:</strong> {userData.CollegeName}</p>
        <p><strong>Degree:</strong> {userData.Degree}</p>
        <p><strong>Year of Study:</strong> {userData.YearOfStudy}</p>
        <p><strong>Skills:</strong> {userData.Skills}</p>
        <p><strong>Category:</strong> {userData.Certificates}</p>
        <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
      </div>

     
    </div>
  );
};

export default PersonalProfile;
