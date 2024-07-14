import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookCart.module.css'; 
import CommonNavbar from '../../common/CommonNavbar';

function BooksCart() {
  const [cart, setCart] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('CART')) || {};
    setCart(storedCart);
  }, []);

  const increaseQuantity = (bookId) => {
    const updatedCart = { ...cart };
    if (updatedCart[bookId]) {
      updatedCart[bookId].quantity += 1;
    }
    setCart(updatedCart);
    sessionStorage.setItem('CART', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (bookId) => {
    const updatedCart = { ...cart };
    if (updatedCart[bookId] && updatedCart[bookId].quantity > 1) {
      updatedCart[bookId].quantity -= 1;
    } else {
      delete updatedCart[bookId];
    }
    setCart(updatedCart);
    sessionStorage.setItem('CART', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((total, book) => total + book.price * book.quantity, 0);
  };

  const handleCheckout = () => {
    setShowPopup(true);
    setTimeout(() => {
      sessionStorage.removeItem('CART');
      setCart({});
      navigate('/');
    }, 2000);
  };

  return (
    <>
      <CommonNavbar />
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Your Cart</h1>
        {Object.keys(cart).length === 0 ? (
          <p className={styles.cartEmpty}>Your cart is empty</p>
        ) : (
          <div className={styles.cartItems}>
            {Object.entries(cart).map(([bookId, book]) => (
              <div key={bookId} className={styles.cartItem}>
                <h2 className={styles.itemTitle}>{book.title}</h2>
                <p className={styles.itemPrice}>Price: ${book.price.toFixed(2)}</p>
                <p className={styles.itemQuantity}>Quantity: {book.quantity}</p>
                <div className={styles.itemControls}>
                  <button
                    className={`${styles.controlBtn} ${styles.decreaseBtn}`}
                    onClick={() => decreaseQuantity(bookId)}
                  >
                    -
                  </button>
                  <button
                    className={`${styles.controlBtn} ${styles.increaseBtn}`}
                    onClick={() => increaseQuantity(bookId)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.cartTotal}>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
        </div>
        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h2>Success!</h2>
              <p>You have paid successfully! Your order will be delivered shortly.</p>
            </div>
            <button className={styles.popupClose} onClick={() => navigate('/')}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

export default BooksCart;
