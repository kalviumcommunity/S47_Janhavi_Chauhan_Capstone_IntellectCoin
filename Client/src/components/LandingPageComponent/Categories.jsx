import React from 'react';
import styles from './Categories.module.css';

const Categories = () => {
  const cards = [
    {
      title: 'Frontend Webdevelopment',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*IkTjQmOjKHNq4VCwhkNQfQ.png',
    },
    {
      title: 'Backend Webdevelopment',
      image: 'https://etraverse.com/wp-content/uploads/2024/02/backend-languages_thumbnail.png',
    },
    {
      title: 'Full Stack Webdevelopment',
      image: 'https://miro.medium.com/v2/resize:fit:848/0*VGeRv86T5m1-Xb_G.jpg',
    },
    {
      title: 'AI-ML',
      image: 'https://www.scaler.com/topics/images/ai-programming-languages_thumbnail.webp',
    },
    {
      title: 'Data Science',
      image: 'https://smartxbrains.in/wp-content/uploads/2023/07/programming-languages-for-data-science-1.png',
    },
    {
      title: 'Figma',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87mn4fAOiZauq70WQfrcmkkp5mOHHkT5mPw&s',
    },
    {
      title: 'Cloud Computing',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHbs7Ye5hDHvGnUKWdDj9N8PYqDc6yMG4SrA&s',
    },
    {
      title: 'DevOps',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz7MbYziWmZARspWiNAlShKkZdDkfiKH5_Lw&s',
    },
    {
      title: 'Blockchain',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8E7Uvjg3mcxofFhpqyDse_G66-Y4QwDolww&s',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.categoryTitle}>
        <p className={styles.title}>Know our Categories</p>
        <p className={styles.subtitle}>Here are the different categories that you can explore and know about.</p>
      </div>
      <div className={styles.marquee}>
        <div className={styles.cardlist}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <img src={card.image} alt={card.title} className={styles.image} />
              <h4 className={styles.subtitles}>{card.title}</h4>
            </div>
          ))}
          {/* Duplicate the cards to create a continuous scrolling effect */}
          {cards.map((card, index) => (
            <div key={`duplicate-${index}`} className={styles.card}>
              <img src={card.image} alt={card.title} className={styles.image} />
              <h4>{card.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
