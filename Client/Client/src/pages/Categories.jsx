import React, { useState, useEffect, useRef } from 'react';
import styles from './Categories.module.css';

const CustomSlider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const slideWidth = 33.33;
  const totalSlides = children.length / 3;
  const clonedChildren = [...children, ...children, ...children];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides * 3 - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides * 3 - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const transitionEnd = () => {
      if (currentSlide === totalSlides * 3) {
        setCurrentSlide(totalSlides);
        sliderRef.current.style.transition = 'none';
        sliderRef.current.style.transform = `translateX(-${totalSlides * slideWidth}%)`;
        setTimeout(() => {
          sliderRef.current.style.transition = '';
        });
      }
    };

    sliderRef.current.addEventListener('transitionend', transitionEnd);

    return () => {
      sliderRef.current.removeEventListener('transitionend', transitionEnd);
    };
  }, [currentSlide, totalSlides, slideWidth]);

  return (
    <div className={styles.slider}>
      <div className={styles.slides} ref={sliderRef} style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}>
        {clonedChildren.map((child, index) => (
          <div key={index} className={styles.slide}>
            {child}
          </div>
        ))}
      </div>
      <button className={styles.prev} onClick={prevSlide}>&#10094;</button>
      <button className={styles.next} onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

const Categories = () => {
  return (
    <CustomSlider className={styles.CategoriesContainer}>
      <div className={styles.Card1}>
        <img src="https://media.licdn.com/dms/image/C5112AQE5qR-BahRCMw/article-cover_image-shrink_600_2000/0/1520089172132?e=2147483647&v=beta&t=sVUJuB-nLkBEQdmppDfCkpQ5tRL7G0glim6DrKaK-cg" alt="" />
        <h1>App for Hospitality</h1>
        <p>
          Showcase your hospitality skills and earn from your expertise by contributing to our vibrant community of bloggers. Connect with companies in the hospitality sector for sponsorship opportunities and collaborations to further monetize your influence.
        </p>
      </div>
      <div className={styles.Card2}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCoxNPzDUuXQpOSppOvR5IzV8meHoSCiVtXN6IenWrNA&s" alt="" />
        <h1>App for Designing</h1>
        <p>
          Monetize your design talents through our platform's blogging feature. Engage with our community, share design tips, trends, and experiences, and connect with companies seeking design services or collaborations to enhance your earning potential.
        </p>
      </div>
      <div className={styles.Card3}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIa4y87Ds8eyWDjsy90FT-V2QQMhY_-aI-SQ&s" alt="" />
        <h1>App for Developers and Technology</h1>
        <p>
          Showcase your expertise in technology and earn through our blogging platform. Connect with tech companies for freelance opportunities, sponsored content, and partnerships to monetize your contributions and expand your professional network.
        </p>
      </div>
      <div className={styles.Card4}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Hb6OUbkjFLlnSq6K1UBHrZkAmmLMU21xTA&s" alt="" />
        <h1>App for Allied Health Science</h1>
        <p>
          Join our community of health science enthusiasts and earn money by sharing your knowledge through blogs. Connect with healthcare companies for partnership opportunities, sponsored content, and freelance projects to further monetize your expertise and expand your professional connections.
        </p>
      </div>
    </CustomSlider>
  );
};

export default Categories;
