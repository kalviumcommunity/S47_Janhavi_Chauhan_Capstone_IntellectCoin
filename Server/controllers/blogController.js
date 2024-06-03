
const Blog = require('../models/Blog');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a new blog
exports.addBlog = async (req, res) => {

    try {
        const { Title, Description, Image } = req.body;
        const newBlog = await Blog.create({ Title, Description, Image });
        res.status(201).json(newBlog);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Description, Image } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { Title, Description, Image },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
