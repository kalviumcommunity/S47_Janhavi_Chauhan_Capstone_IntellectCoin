import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../common/Loader.css';
import styles from './BlogDisplay.module.css';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/blogs/Allblogs');
        setBlogs(response.data);
        setFilteredBlogs(response.data); 
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
   
    const result = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(result);
  }, [searchQuery, blogs]);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleClosePopup = () => {
    setSelectedBlog(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderPopup = () => {
    if (!selectedBlog) return null;
    return (
      <div className={styles.popupOverlay} onClick={handleClosePopup}>
        <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={handleClosePopup}>X</button>
          <h2>{selectedBlog.title}</h2>
          <div className={styles.popupBody}>
            {selectedBlog.image && (
              <img src={selectedBlog.image} alt={selectedBlog.title} className={styles.popupImage} />
            )}
            <div className={styles.popupText}>
              <p>{selectedBlog.content}</p>
              <p className={styles.author}>Author: {selectedBlog.author.username}</p>
              <p className={styles.createdAt}>Created at: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
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
  
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search blogs by title..."
          className={styles.searchInput}
        />
   
      </div>
      <div className={styles.blogContainer}>
        {filteredBlogs.length === 0 && searchQuery && (
          <p className={styles.noResults}>No blogs found with the name "{searchQuery}"</p>
        )}
        {filteredBlogs.map(blog => (
          <div key={blog._id} className={styles.blogCard} onClick={() => handleBlogClick(blog)}>
            <h2 className={styles.title}>{blog.title}</h2>
            <p className={styles.content}>
              {blog.content.split(' ').slice(0, 15).join(' ')}...
            </p>
            {blog.image && <img src={blog.image} alt={blog.title} className={styles.image} />}
            <p className={styles.author}>Author: {blog.author.username}</p>
            <p className={styles.createdAt}>Created at: {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
        {renderPopup()}
      </div>
    </div>
  );
};

export default BlogList;
