import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfileBlogs.module.css';
import '../../common/Loader.css';  // Import the CSS for the loader

const UserProfileBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null); // Track the blog to pop out
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [loading, setLoading] = useState(true);  // Add a loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);  // Set loading to true
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Unauthenticated');
          return;
        }

        const response = await axios.get('https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/blogs/user/blogs', {
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
      } finally {
        setLoading(false);  // Set loading to false
      }
    };

    fetchBlogs();
  }, []);

  const handleCardClick = (blog) => {
    if (selectedBlog && selectedBlog._id === blog._id) {
      setSelectedBlog(null); // Close the pop-out view on double-click
    } else {
      setSelectedBlog(blog);
    }
  };

  const handlePopoutClose = () => {
    setSelectedBlog(null); // Close the pop-out view
  };

  const truncateContent = (content) => {
    const words = content.split(' ');
    return words.length > 10 ? `${words.slice(0, 10).join(' ')}...` : content;
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='spinner-wrapper'>
        <div className='spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div> 
        </div>
        <p className='loading'>Loading Blogs...!!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{username ? `${username}'s Blogs` : 'My Blogs'}</h2>
      {message && <p className={styles.message}>{message}</p>}
      <input
        type="text"
        placeholder="Search by blog name..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.blogContainer}>
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className={`${styles.card} ${selectedBlog && selectedBlog._id === blog._id ? styles.selected : ''}`}
            onClick={() => handleCardClick(blog)}
          >
            <img src={blog.image} alt="Blog Image" className={styles.blogImage} />
            <h3 className={styles.title}>{blog.title}</h3>
            <p className={styles.content}>{truncateContent(blog.content)}</p>
            <p className={styles.date}>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {selectedBlog && (
        <div className={styles.popoutContainer} onClick={handlePopoutClose}>
          <div className={styles.popoutContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handlePopoutClose}>×</button>
            <img src={selectedBlog.image} alt="Blog Image" className={styles.popoutImage} />
            <h3 className={styles.popoutTitle}>{selectedBlog.title}</h3>
            <p className={styles.popoutContentText}>{selectedBlog.content}</p>
            <p className={styles.popoutDate}>Created at: {new Date(selectedBlog.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileBlogs;
