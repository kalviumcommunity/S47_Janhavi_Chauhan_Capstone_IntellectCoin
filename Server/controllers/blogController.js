const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user')

exports.getUserBlogs = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const blogs = await Blog.find({ author: decoded._id });
    const user = await User.findById(decoded._id );
    console.log(blogs, user);
    res.status(200).json({blogs, user});

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error : error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    const newBlog = new Blog({
      ...req.body,
      author: decoded._id
    });

    const blog = await newBlog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
