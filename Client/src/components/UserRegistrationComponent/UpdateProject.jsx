import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './updateproject.module.css';
import '../../common/Loader.css';
import CommonNavbar from '../../common/CommonNavbar';

const UpdateProject = () => {
  const [project, setProject] = useState(null);
  const [heading, setHeading] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Unauthenticated');
          return;
        }

        const response = await axios.get(`https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/userregistration/getoneproject/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          const { heading, projectLink, description, video } = response.data;
          setProject(response.data);
          setHeading(heading);
          setProjectLink(projectLink);
          setDescription(description);
          setVideoPreview(video);
        } else {
          setMessage('Error fetching project');
        }

      } catch (error) {
        setMessage('Error fetching project');
      }
    };

    fetchProject();
  }, [projectId]);

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
        return result.url;
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

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const videoUrl = video ? await postVideoDetails() : videoPreview;
    if (videoUrl !== null) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Unauthenticated');
          return;
        }

        const response = await axios.put(
          `http://localhost:4000/api/userregistration/update/${projectId}`,
          { heading, projectLink, description, video: videoUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage('Project updated successfully!');
        navigate(`/home`);
      } catch (error) {
        setMessage('Error updating project');
      }
    }
  };

  return (
    <>
      <CommonNavbar />
      <div className={styles.Updatecontainer}>
        
        <div className={styles.formContainer}>
          {project ? (
            <form onSubmit={handleUpdateProject}>
              <input
                placeholder="Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
                className={styles.input2}
              />
              <input
                placeholder="Project Deployed Link"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                required
                className={styles.input2}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={styles.textarea2}
              />
              <input
                type="file"
                name="video"
                accept="video/mp4,video/mov"
                onChange={handleVideoChange}
                className={styles.fileInput2}
              />
              <span>{error}</span>
              <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? 'Loading...' : 'Update Project'}
              </button>
            </form>
          ) : (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div> 
              </div>
              <p className={styles.loading}>Loading Project details...!!</p>
            </div>
          )}
          {message && <p className={styles.message}>{message}</p>}
        </div>
        <div className={styles.videoContainer}>
          {videoPreview && <video src={videoPreview} controls />}
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
