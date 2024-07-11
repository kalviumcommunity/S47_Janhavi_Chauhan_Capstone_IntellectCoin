import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Booksbrowse.module.css';

function Booksbrowse() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/book', 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
    const storedCart = JSON.parse(sessionStorage.getItem('CART')) || {};
    setCart(storedCart);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('CART', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart(prevCart => {
      const isBookInCart = prevCart[book._id];
      const updatedCart = {
        ...prevCart,
        [book._id]: {
          ...book,
          quantity: isBookInCart ? prevCart[book._id].quantity + 1 : 1
        }
      };
      return updatedCart;
    });
  };

  const decreaseQuantity = (bookId) => {
    setCart(prevCart => {
      const currentQuantity = prevCart[bookId].quantity;
      if (currentQuantity === 1) {
        const {[bookId]: _, ...rest} = prevCart;
        return rest;
      } else {
        return {
          ...prevCart,
          [bookId]: {
            ...prevCart[bookId],
            quantity: currentQuantity - 1
          }
        };
      }
    });
  };

  return (
    <div className={styles.container}>
    <h1 className={styles.header}>Books Browse</h1>
    <button onClick={() => navigate(-1)}>Go Back</button>
    <button onClick={() => navigate('/books/create')}>Add Book</button>
    <button onClick={() => navigate('/books/cart')}>View Cart</button>
    <div>
      {books.map(book => (
        <div key={book._id} className={styles.bookItem}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
          {book.image.map((imageUrl, index) => (
              <img key={index} className={styles.bookImage} src={imageUrl} alt={`${book.title} ${index + 1}`} />
          ))}
          <p className={styles.bookDescription}>{book.description}</p>
          <p className={styles.bookPrice}>Price: ${book.price}</p>
          {cart[book._id] ? (
            <div className={styles.cartActions}>
              <button className={styles.decreaseButton} onClick={() => decreaseQuantity(book._id)}>-</button>
              <span> {cart[book._id].quantity} </span>
              <button className={styles.addButton} onClick={() => addToCart(book)}>+</button>
            </div>
          ) : (
            <button className={styles.addButton} onClick={() => addToCart(book)}>Add to Cart</button>
          )}
        </div>
      ))}
    </div>
  </div>
  );
}

export default Booksbrowse;