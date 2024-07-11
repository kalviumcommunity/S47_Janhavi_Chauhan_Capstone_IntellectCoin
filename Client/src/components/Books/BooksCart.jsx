import React, { useState, useEffect } from 'react';

function BooksCart() {
  const [cart, setCart] = useState({});

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

  return (
    <div>
      <h1>Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        Object.entries(cart).map(([bookId, book]) => (
          <div key={bookId}>
            <h2>{book.title}</h2>
            <p>Price: ${book.price}</p>
            <p>Quantity: {book.quantity}</p>
            <button onClick={() => decreaseQuantity(bookId)}>-</button>
            <button onClick={() => increaseQuantity(bookId)}>+</button>
          </div>
        ))
      )}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      <button>Checkout</button>
    </div>
  );
}

export default BooksCart;