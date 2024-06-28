import React, { useState, useEffect, useContext } from 'react';
import { getUser, updateUser } from '../../services/services';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    pic: '',
    linkdin: '',
    github: '',
    languages: '',
    CollegeName: '',
    Degree: '',
    YearOfStudy: '',
    Skills: '',
    Certificates: '',
    PhoneNumber: '',
  });

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(auth.token);
        setFormData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [auth.token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(auth._id, formData , auth.token);
      alert('Profile updated successfully!');
      Navigate('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      <input type="text" name="linkdin" placeholder="LinkedIn" value={formData.linkdin} onChange={handleChange} />
      <input type="text" name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} />
      <input type="text" name="languages" placeholder="Languages" value={formData.languages} onChange={handleChange} />
      <input type="text" name="CollegeName" placeholder="College Name" value={formData.CollegeName} onChange={handleChange} />
      <input type="text" name="Degree" placeholder="Degree" value={formData.Degree} onChange={handleChange} />
      <input type="text" name="YearOfStudy" placeholder="Year of Study" value={formData.YearOfStudy} onChange={handleChange} />
      <input type="text" name="Skills" placeholder="Skills" value={formData.Skills} onChange={handleChange} />
      <input type="text" name="Certificates" placeholder="Certificates" value={formData.Certificates} onChange={handleChange} />
      <input type="text" name="PhoneNumber" placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default Profile;
