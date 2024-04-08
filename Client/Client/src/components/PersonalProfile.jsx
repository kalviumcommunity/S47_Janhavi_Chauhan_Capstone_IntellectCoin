// components/PersonalProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonalProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem('id')
        console.log("id sent", id);
        const response = await axios.get(`http://localhost:4000/api/users/getUser/${id}`);

        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h2>Personal Profile</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : userData ? (
        <div>
          <h3>{userData.firstName} {userData.lastName}</h3>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default PersonalProfile;
