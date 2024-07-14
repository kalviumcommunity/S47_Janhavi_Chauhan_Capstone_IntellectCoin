const express = require('express');
const router = express.Router();
const VerifyToken = require('../middleware/verifyToken');

const {createBlog , getUserBlogs, getAllBlogs} = require('../controllers/blogController');

router.post('/blogs', createBlog);
router.get('/user/blogs', getUserBlogs);
router.get('/Allblogs', getAllBlogs);

module.exports = router;
