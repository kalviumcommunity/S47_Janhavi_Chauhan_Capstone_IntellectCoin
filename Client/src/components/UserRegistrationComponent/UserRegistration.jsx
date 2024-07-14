import React, { useState } from 'react';
import axios from 'axios';
import styles from './UserRegistration.module.css'; // Updated import for the CSS module

const CreateProject = () => {
  const [heading, setHeading] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'video/mp4' && file.type !== 'video/mov') {
        setError('Please select a valid video format (MP4, MOV)');
        return;
      }
      setVideo(file);
      setError('');
    }
  };

  const postVideoDetails = async () => {
    setLoading(true);
    if (!video) {
      setError('Please select a video');
      setLoading(false);
      return null;
    }
    if (video.type !== 'video/mp4' && video.type !== 'video/mov') {
      setError('Please select a valid video');
      setLoading(false);
      return null;
    }

    const data = new FormData();
    data.append('file', video);
    data.append('upload_preset', 'IntellectCoin'); // Adjust the preset if necessary
    data.append('cloud_name', 'janhavi'); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/janhavi/video/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();

      if (result.url) {
        setLoading(false);
        return result.url.toString();
      } else {
        setError('Upload failed');
        setLoading(false);
        return null;
      }
    } catch (err) {
      setError('Error uploading video');
      setLoading(false);
      return null;
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const videoUrl = await postVideoDetails();
    if (videoUrl) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Unauthenticated');
          return;
        }

        const response = await axios.post(
          'https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/userregistration/create',
          { heading, projectLink, description, video: videoUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage('Project created successfully!');
      } catch (error) {
        setMessage('Error creating project');
      }
    }
  };

  return (
    <>
      <h2 className={styles.heading}>Create Project</h2>
      <form onSubmit={handleCreateProject} className={styles.form}>
        <input
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
          className={styles.input}
        />
        <input
          placeholder="Project Deployed Link"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>Upload Video</label>
          <input
            type="file"
            name="video"
            accept="video/mp4,video/mov"
            onChange={handleVideoChange}
            className={styles.fileInput}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Loading...' : 'Upload Project'}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </>
  );
};

export default CreateProject;
