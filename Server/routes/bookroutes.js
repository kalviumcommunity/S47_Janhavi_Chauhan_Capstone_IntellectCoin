const express = require('express');
const router = express.Router();
const {getAllBooks, createBook, getOwnBooks, updateBook, deleteBook} = require('../controllers/bookController');

router.get('/', getAllBooks);

router.post('/create', createBook);

router.get('/ownbooks', getOwnBooks);

// router.get('/other/:id', getOtherBooks);

router.put('/update/:id', updateBook);

router.delete('/delete/:id', deleteBook);

module.exports = router;
