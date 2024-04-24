import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0); 
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      name,
      email,
      rating,
      review
    };
    onSubmit(newReview);
    setName('');
    setEmail('');
    setRating(0);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Write a Review</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="rating">Rating:</label>
      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        required
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor="review">Review:</label>
      <textarea
        id="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
