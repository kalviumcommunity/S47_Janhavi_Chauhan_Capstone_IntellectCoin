const Book = require('../models/Books'); // Assuming the file name is books.js
const jwt = require('jsonwebtoken')

// Controller functions
const getAllBooks = async (req, res) => {
  try {
    // Verify user authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    if (!decoded) {
      return res.status(401).send({ message: "Unauthenticated" });
    }
    // Fetch all books
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    // Verify user authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Create new book
    const book = new Book({
      title: req.body.title,
      image: req.body.image, // Directly use the image array from req.body
      description: req.body.description,
      price: req.body.price,
      author: decoded._id,
    });

    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOwnBooks = async (req, res) => {
  // Example implementation, adjust according to your user model and requirements
  try {
    // Decoded token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    if (!decoded) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const books = await Book.find({ author: decoded._id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
    try {
      // Verify user authentication
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthenticated" });
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      if (!decoded) {
        return res.status(401).send({ message: "Unauthenticated" });
      }

      // Find book by ID
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
  
      // Update fields
      book.title = req.body.title || book.title;
      // Check if req.body.image is provided and is an array before updating
      if (req.body.image && Array.isArray(req.body.image)) {
        book.image = req.body.image;
      }
      book.description = req.body.description || book.description;
      book.price = req.body.price || book.price;
  
      const updatedBook = await book.save();
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const deleteBook = async (req, res) => {
  try {
    // Verify user authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    if (!decoded) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const book = await Book.findById(req.params.id);
    if (book.author.toString() !== decoded._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await book.remove();
    res.json({ message: "Deleted Book" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getOwnBooks,
  updateBook,
  deleteBook
};