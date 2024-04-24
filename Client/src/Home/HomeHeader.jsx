import React, { useState, useEffect } from 'react';
import { CarouselData } from "../../data/HomeCarouseldata";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './HomeHeader.module.css'; 

const HomeHeader = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const forwardImage = () => {
        setCurrentImage(currentImage === CarouselData.length - 1 ? 0 : currentImage + 1);
    };

    const backwardImage = () => {
        setCurrentImage(currentImage === 0 ? CarouselData.length - 1 : currentImage - 1);
    };

   
    useEffect(() => {
        const interval = setInterval(() => {
            forwardImage();
        }, 5000); 

        return () => clearInterval(interval);  
    }, [currentImage]); 

    return (
        <>
        <div className={styles.homeHeaderContainer}>
            <div className={`${styles.homeHeaderArrow} ${styles.homeHeaderArrowLeft}`} onClick={backwardImage}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>

            <img src={CarouselData[currentImage].img} alt={CarouselData[currentImage].title} className={styles.homeHeaderImage} />
            <h1 className={styles.homeHeaderTitle}>{CarouselData[currentImage].title} </h1>
           

            <div className={`${styles.homeHeaderArrow} ${styles.homeHeaderArrowRight}`} onClick={forwardImage}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
        </>
    );
};

export default HomeHeader;
