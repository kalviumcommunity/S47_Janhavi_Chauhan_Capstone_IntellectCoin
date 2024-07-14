import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import blog from './BloggingForm.module.css';
import '../../common/Loader.css';  // Import the CSS for the loader

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);  // Add a loading state

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsError(true);
        setMessage('Unauthenticated');
        return;
      }

      await axios.post('http://localhost:4000/api/blogs/blogs', 
        { title, content, image }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setIsError(false);
      setMessage('Blog created successfully!');
      setTitle('');  // Clear form fields
      setContent('');
      setImage('');
    } catch (error) {
      setIsError(true);
      setMessage('Error creating blog');
    } finally {
      setLoading(false);  // Set loading to false
    }
  };

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
        <p className='loading'>Creating blog...!!</p>
      </div>
    );
  }

  return (
    <div className={blog.container}>
      <h2 className={blog.heading}>Create Blog</h2>
      <form onSubmit={handleCreateBlog} style={{ width: '100%' }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={blog.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={blog.textarea}
          ref={textareaRef}
        ></textarea>
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className={blog.inputimage}
        />
        <button type="submit" className={blog.button}>Create</button>
      </form>
      {message && (
        <p className={isError ? blog.errorMessage : blog.message}>{message}</p>
      )}
    </div>
  );
};

export default CreateBlog;
