import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

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

  return (
    <div>
      <h2>{username ? `${username}'s Blogs` : 'My Blogs'}</h2>
      {message && <p>{message}</p>}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <img src={blog.image} alt="Blog Image" />
            <p><em>Created at: {new Date(blog.createdAt).toLocaleString()}</em></p>
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default UserProfileBlogs;
