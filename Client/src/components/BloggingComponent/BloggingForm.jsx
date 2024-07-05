
import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Unauthenticated');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/blogs/blogs', 
        { title, content, image }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Blog created successfully!');
    } catch (error) {
      setMessage('Error creating blog');
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateBlog;


