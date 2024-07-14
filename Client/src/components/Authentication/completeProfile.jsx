import React, { useState, useEffect, useContext } from 'react';
import { getUser, updateUser } from '../../services/services';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './completeProfile.module.css';
import CommonNavbar from '../../common/CommonNavbar';

function Profile() {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    pic: null,
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

  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(auth.token);
        setFormData(response.data.user);
        setPreview(response.data.user.pic); // Set initial preview
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [auth.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'IntellectCoin'); 
    data.append('cloud_name', 'janhavi'); 

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/janhavi/image/upload', data);
      return res.data.url;
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let picUrl = formData.pic;
    if (formData.pic && typeof formData.pic !== 'string') {
      picUrl = await handleImageUpload(formData.pic);
      if (!picUrl) {
        setLoading(false);
        return;
      }
    }

    try {
      await updateUser(auth._id, { ...formData, pic: picUrl }, auth.token);
      alert('Profile updated successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
    <CommonNavbar/>

    <form onSubmit={handleSubmit} className={styles.CompleteForm}>
    <input
        type="file"
        name="pic"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setFormData({ ...formData, pic: file });
          setPreview(URL.createObjectURL(file));
        }}
        className={styles.fileInput}
      />
      {preview && <img src={preview} alt="Profile Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} className={styles.preview} />}
      <input  name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={styles.input1} />
      <input  name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={styles.input1} />
      <input  name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={styles.input1} />
      <input  name="linkdin" placeholder="LinkedIn" value={formData.linkdin} onChange={handleChange} className={styles.input1} />
      <input  name="github" placeholder="GitHub" value={formData.github} onChange={handleChange} className={styles.input1} />
      <input name="About yourself" placeholder="Languages" value={formData.languages} onChange={handleChange} className={styles.input1} />
      <input  name="CollegeName" placeholder="College Name" value={formData.CollegeName} onChange={handleChange} className={styles.input1} />
      <input  name="Degree" placeholder="Degree" value={formData.Degree} onChange={handleChange} className={styles.input1} />
      <input name="YearOfStudy" placeholder="Year of Study" value={formData.YearOfStudy} onChange={handleChange} className={styles.input1} />
      <input name="Skills" placeholder="Skills" value={formData.Skills} onChange={handleChange} className={styles.input1} />
      <input name="Category" placeholder="Certificates" value={formData.Certificates} onChange={handleChange} className={styles.input1} />
      <input name="PhoneNumber" placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} className={styles.input1} />


      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
    </>
  );
}

export default Profile;
