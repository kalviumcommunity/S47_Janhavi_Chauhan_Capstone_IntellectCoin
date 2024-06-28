const express = require('express');
const router = express.Router();
const VerifyToken = require('../middleware/verifyToken');

const {createBlog , getUserBlogs} = require('../controllers/blogController');

router.post('/blogs', createBlog);
router.get('/user/blogs', getUserBlogs);

module.exports = router;
