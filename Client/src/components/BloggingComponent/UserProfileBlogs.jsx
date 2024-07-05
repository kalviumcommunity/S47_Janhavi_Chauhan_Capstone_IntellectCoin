import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfileBlogs.module.css';

const UserProfileBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [visibleBlogs, setVisibleBlogs] = useState(3); // Number of blogs to show initially
  const [showFullContent, setShowFullContent] = useState({}); // Track full content visibility

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Unauthenticated');
          return;
        }

        const response = await axios.get('http://localhost:4000/api/blogs/user/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data && response.data.blogs && response.data.user) {
          setBlogs(response.data.blogs);
          setUsername(response.data.user.username);
        } else {
          setMessage('Error fetching blogs');
        }
      } catch (error) {
        setMessage('Error fetching blogs');
      }
    };

    fetchBlogs();
  }, []);

  const toggleContentVisibility = (blogId) => {
    setShowFullContent((prevState) => ({
      ...prevState,
      [blogId]: !prevState[blogId]
    }));
  };

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  const showLessBlogs = () => {
    setVisibleBlogs(3);
  };

  const truncateContent = (content) => {
    const words = content.split(' ');
    return words.length > 15 ? `${words.slice(0, 15).join(' ')}...` : content;
  };

  return (
    <div>
      <h2 className={styles.heading}>{username ? `${username}'s Blogs` : 'My Blogs'}</h2>
      {message && <p>{message}</p>}
      <div className={styles.blogContainer}>
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <div key={blog._id} className={styles.card}>
            <img src={blog.image} alt="Blog Image" className={styles.blogImage} />
            <h3 className={styles.title}>{blog.title}</h3>
            <p className={styles.content}>
              {showFullContent[blog._id] ? blog.content : truncateContent(blog.content)}
            </p>
            {blog.content.split(' ').length > 25 && (
              <button 
                className={styles.showMoreButton} 
                onClick={() => toggleContentVisibility(blog._id)}
              >
                {showFullContent[blog._id] ? 'Show Less' : 'Show More'}
              </button>
            )}
            <p className={styles.date}><em>Created at: {new Date(blog.createdAt).toLocaleString()}</em></p>
          </div>
        ))}
      </div>
      {visibleBlogs < blogs.length && (
        <button className={styles.showMoreButton} onClick={showMoreBlogs}>Show More Blogs</button>
      )}
      {visibleBlogs >= blogs.length && blogs.length > 3 && (
        <button className={styles.showMoreButton} onClick={showLessBlogs}>Show Less Blogs</button>
      )}
    </div>
  );
};

export default UserProfileBlogs;
