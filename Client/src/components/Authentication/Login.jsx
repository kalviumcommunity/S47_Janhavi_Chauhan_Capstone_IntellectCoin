
import React, { useState, useContext ,useEffect } from 'react';
import { login } from '../../services/services';
import { AuthContext } from './AuthContext';
import { useNavigate ,Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRight , faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion'
import Navbar from '../LandingPageComponent/Navbar';
import { CarouselData } from '../../../data/Carouseldata';
import styles from './Login.module.css';
import './button.css';




const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


        const forwardImage = () => {
        setCurrentImage(currentImage < CarouselData.length - 1 ? currentImage + 1 : 0);
        fadeInAnimation();
    };

    const backwardImage = () => {
        setCurrentImage(currentImage > 0 ? currentImage - 1 : CarouselData.length - 1);
        fadeInAnimation();
    };
        const fadeInAnimation = () => {
        const image = document.querySelector(`.${styles.image}`);
        const titles = document.querySelectorAll(`.${styles.title_below}`);
        setTimeout(() => {
            image.style.opacity = 1;
            titles.forEach(title => (title.style.opacity = 1));
        }, 100);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            forwardImage();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
            .then(response => {
                const token = response.data.data;
                localStorage.setItem('token', token);
                setAuth({ token, user: response.data.user });
                navigate('/home'); // Redirect to profile completion page
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <>
            <Navbar />
                <div className={styles.login_container}>
                 <div className={styles.left}>
                     <div onClick={forwardImage} className={styles.forward}>
                        <FontAwesomeIcon icon={faChevronRight} style={{ height: '30px', width: '30px', marginLeft: '40px' }} />
                     </div>

                     <img src={CarouselData[currentImage].img} alt="" className={styles.image} />
                   <div onClick={backwardImage} className={styles.backward}>
                        <FontAwesomeIcon icon={faChevronRight} style={{ transform: 'rotate(180deg)', height: '30px', width: '30px' }} />
                    </div>
                     {CarouselData.map((data, index) => (
                        <motion.div
                            key={index}
                            className={styles.title_below}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.5, duration: 0.5 }}
                        >
                            {currentImage === index && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
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
                     <form className={styles.form_container} onSubmit={handleSubmit}>
                     <h1 className={styles.heading}>Welcome Back!</h1>
                     <p className={styles.para1}>Login to Your Account..Let's resume <br /> your journey</p>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button className='btn'>Login <FontAwesomeIcon icon={faArrowRight} className='arrow' /></button>
            <button type="button" className="login-with-google-btn">Sign in with Google</button>
            <p className={styles.noaccount}>
                                Don't have an account ? <Link to="/signup">Sign up </Link>
                           </p>
              </form>

                    
                    </div>

                 </div>
                </div>

    </>
    );
};

export default Login;

