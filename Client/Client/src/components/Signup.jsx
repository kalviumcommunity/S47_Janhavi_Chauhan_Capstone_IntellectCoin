import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { CarouselData } from '../../data/Carouseldata';
import Navbar from '../pages/Navbar';
import './button.css';
import styles from './Signup.module.css';

const Signup = () => {
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [currentImage, setCurrentImage] = useState(0);
    const [isVisible, setIsVisible] = useState(false); 

    const forwardImage = () => {
        setCurrentImage(currentImage < CarouselData.length - 1 ? currentImage + 1 : 0);
        setIsVisible(false); 
    };

    const backwardImage = () => {
        setCurrentImage(currentImage > 0 ? currentImage - 1 : CarouselData.length - 1);
        setIsVisible(false); 
    };

    const fadeInAnimation = () => {
        setIsVisible(true); 
    };

    useEffect(() => {
        const interval = setInterval(() => {
            forwardImage();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uri = "http://localhost:4000/api/users/add"; 
            const { data: res } = await axios.post(uri, formData);
            navigate('/');
            console.log(res.message);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.login_container}>
                <div className={styles.left}>
                    <div onClick={forwardImage} className={styles.forward}>
                        <FontAwesomeIcon icon={faChevronRight} style={{ height: '30px', width: '30px', marginLeft: '40px' }} />
                    </div>
                    <motion.img
                        src={CarouselData[currentImage].img}
                        alt=""
                        className={styles.image}
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: isVisible ? 1 : 0 }} 
                        transition={{ duration: 0.5 }} 
                        onLoad={fadeInAnimation}
                    />
                    <div onClick={backwardImage} className={styles.backward}>
                        <FontAwesomeIcon icon={faChevronRight} style={{ transform: 'rotate(180deg)', height: '30px', width: '30px' }} />
                    </div>
                    {CarouselData.map((data, index) => (
                        <motion.div
                            key={index}
                            className={styles.title_below}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }} 
                            transition={{ delay: index * 0.5, duration: 0.5 }}
                        >
                            {currentImage === index && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible ? 1 : 0 }} 
                                    transition={{ delay: index * 0.5, duration: 0.5 }}
                                >
                                    {data.title}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h1 className={styles.heading}>Create Account</h1>
                            <p className={styles.para1}>Sign up and start your journey</p>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button className="btn">Sign Up <FontAwesomeIcon icon={faArrowRight} className='arrow' /></button>
                            <button type="button" className="login-with-google-btn" onClick={loginWithRedirect}>Sign up with Google</button>
                            <p className={styles.noaccount}>Already have an account? <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
