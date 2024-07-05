import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Categories.module.css';

const Categories = () => {
  const cards = [
    {
      title: 'Frontend Webdevelopment',
      image: 'https://www.businessoutreach.in/wp-content/uploads/2023/05/Indian-hospitality-investments-to-exceed-2.3-billion-over-the-next-two-to-five-years.jpg',
    },
    {
      title: 'Backend Webdevelopment',
      image: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?cs=srgb&dl=pexels-knownasovan-57690.jpg&fm=jpg',
    },
    {
      title: 'Full Stack Webdevelopment',
      image: 'https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/unleashing%20developer%20productivity%20with%20generative%20ai/thumb-gettyimages-1395344871.jpg',
    },
    {
      title: 'AI-ML',
      image: 'https://anydayguide.com/uploads/events/holidays/professional/forensic-expert-day.jpg',
    },
    {
      title: 'Data Science',
      image: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_655998316_2000149920009280219_363765.jpg',
    },
    {
      title: 'Cyber Security',
      image: 'https://images.unsplash.com/photo-1556741533-f6acd647db85',
    },
    {
      title: 'Cloud Computing',
      image: 'https://images.unsplash.com/photo-1523475496153-3f95a6d1d7b4',
    },
    {
      title: 'DevOps',
      image: 'https://images.unsplash.com/photo-1573497164001-bbb1f1a43102',
    },
    {
      title: 'Blockchain',
      image: 'https://images.unsplash.com/photo-1581091870615-590c7ce1d773',
    },
  ];

  const AnimatedCard = ({ children }) => {
    const props = useSpring({
      loop: true,
      to: [{ transform: 'translateX(100%)' }, { transform: 'translateX(-100%)' }],
      from: { transform: 'translateX(-100%)' },
      config: { duration: 5000 },
    });
    return <animated.div style={props} className={styles.card}>{children}</animated.div>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryTitle}>
        <p className={styles.title}>Know our Categories</p>
        <p className={styles.subtitle}>Here are the different categories that you can explore and know about.</p>
      </div>
      <div className={styles.cardlist}>
        {cards.map((card, index) => (
          <AnimatedCard key={index}>
            <img src={card.image} alt={card.title} className={styles.image} />
            <h4>{card.title}</h4>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
