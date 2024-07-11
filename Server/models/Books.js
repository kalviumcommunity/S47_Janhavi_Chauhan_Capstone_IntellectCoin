const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: [{ type: String, required: true }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Book = mongoose.model('bookdata', bookSchema);

module.exports = Book;
