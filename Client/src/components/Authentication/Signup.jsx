
import React, { useState, useEffect } from 'react';
import { register } from '../../services/services';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './Signup.module.css';
import { CarouselData } from '../../../data/Carouseldata';
import Navbar from '../LandingPageComponent/Navbar';
import './button.css';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        pic: null,
    });

    const [picUrl, setPicUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [currentImage, setCurrentImage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const forwardImage = () => {
        setCurrentImage(prev => (prev < CarouselData.length - 1 ? prev + 1 : 0));
        setIsVisible(false);
    };

    const backwardImage = () => {
        setCurrentImage(prev => (prev > 0 ? prev - 1 : CarouselData.length - 1));
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
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'pic' && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        let errorMessage = '';
        if (name === 'email' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            errorMessage = 'Invalid Email';
        } else if (name === 'password' && value.length < 6) {
            errorMessage = 'Password should be at least 6 characters';
        } else if (name === 'username' && value.length < 6) {
            errorMessage = 'Username should be at least 6 characters';
        }
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    };

    const postDetails = async () => {
        setLoading(true);
        if (!formData.pic) {
            setErrors(prev => ({ ...prev, pic: 'Please select an image' }));
            setLoading(false);
            return null;
        }
        if (formData.pic.type !== 'image/jpeg' && formData.pic.type !== 'image/png') {
            setErrors(prev => ({ ...prev, pic: "Please select a valid image" }));
            setLoading(false);
            return null;
        }

        const data = new FormData();
        data.append('file', formData.pic);
        data.append('upload_preset', 'IntellectCoin');
        data.append('cloud_name', 'janhavi');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/janhavi/image/upload', {
                method: 'post',
                body: data,
            });
            const result = await res.json();

            if (result.url) {
                setPicUrl(result.url.toString());
                setLoading(false);
                return result.url.toString();
            } else {
                setErrors(prev => ({ ...prev, pic: 'Upload failed' }));
                setLoading(false);
                return null;
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, pic: 'Error uploading image' }));
            setLoading(false);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const picUrl = await postDetails();
        if (picUrl) {
            const fullFormData = { ...formData, pic: picUrl };
            register(fullFormData)
                .then(response => {
                    alert(response.data.message);
                    navigate('/login');
                })
                .catch(error => {
                    alert(error.response.data.message);
                });
        }
    };

    return (
        <div>
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
                         initial={{ opacity: 0 }}                          animate={{ opacity: isVisible ? 1 : 0 }} 
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
            
            
                <div className={styles.left}>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <h1 className={styles.heading}>Create Account</h1>
                    <p className={styles.para1}>Sign up and start your journey</p>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <span className={styles.error_msg}>{errors.username}</span>

                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <span className={styles.error_msg}>{errors.firstName}</span>

                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                <span className={styles.error_msg}>{errors.lastName}</span>

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <span className={styles.error_msg}>{errors.email}</span>

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <span className={styles.error_msg}>{errors.password}</span>

                <input type="file" name="pic" accept="image/jpeg,image/png"  className={styles.file} onChange={handleChange} />
                <span className={styles.error_msg}>{errors.pic}</span>

                <button className="btn" type="button" disabled={loading} onClick={handleSubmit}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <button type="button" className="login-with-google-btn">Sign up with Google</button>
                <p className={styles.noaccount}>Already have an account? <Link to="/login">Login</Link></p>

            </form>

                </div>

            </div>


        </div>
    );
};

export default Register;




  







