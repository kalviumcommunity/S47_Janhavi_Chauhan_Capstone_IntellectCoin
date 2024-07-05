import React, { useState } from 'react';
import axios from 'axios';

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
          'http://localhost:4000/api/userregistration/create',
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
      <h2>Create Project</h2>
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Project Deployed Link"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          name="video"
          accept="video/mp4,video/mov"
          onChange={handleVideoChange}
        />
        <span>{error}</span>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Upload Project'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default CreateProject;
  