const Blog = require('../models/Blog');

exports.getUserBlogs = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const blogs = await Blog.find({ author: decoded._id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
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

