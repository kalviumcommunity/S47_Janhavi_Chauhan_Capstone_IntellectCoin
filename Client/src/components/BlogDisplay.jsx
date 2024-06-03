
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogDisplay = ({ setBlogToUpdate }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/blogs/getAllBlogs');
            console.log(response.data);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleUpdate = (blog) => {
        setBlogToUpdate(blog);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/blogs/${id}`);
            console.log('Blog deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog._id}>
                    <h2>{blog.Title}</h2>
                    <p>{blog.Description}</p>
                    <img src={blog.Image} alt={blog.Title} />
                    <button onClick={() => handleUpdate(blog)}>Update</button>
                    <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default BlogDisplay;
