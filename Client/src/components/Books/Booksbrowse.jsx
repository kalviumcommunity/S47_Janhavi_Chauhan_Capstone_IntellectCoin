import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Booksbrowse.module.css';
import '../../common/Loader.css';  

function Booksbrowse() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);  
  const [searchQuery, setSearchQuery] = useState('');  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://s47-janhavi-chauhan-capstone-kql9.onrender.com/api/book', 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);  
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

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className='spinner-wrapper'>
        <div className='spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div> 
        </div>
        <p className='loading'>Loading Books...!!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>A book is a gift you can open again and again. Share its magic by passing it on to someone in need.</h3>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className={styles.booksContainer}>
        {filteredBooks.map(book => (
          <div key={book._id} className={styles.bookItem}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <div className={styles.carousel}>
              {book.image.map((imageUrl, index) => (
                <img key={index} className={styles.bookImage} src={imageUrl} alt={`${book.title} ${index + 1}`} />
              ))}
            </div>
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
