const { getAllBlogs  , addBlog, updateBlog, deleteBlog} = require ("../controllers/blogController");
const express = require('express');
const router = express.Router();




//Get all blogs
router.get('/getAllBlogs', getAllBlogs);

// Add a new blog
router.post('/addblog', addBlog);

// Update a blog
router.put('/:id', updateBlog);

// Delete a blog
router.delete('/:id', deleteBlog);

module.exports = router;
