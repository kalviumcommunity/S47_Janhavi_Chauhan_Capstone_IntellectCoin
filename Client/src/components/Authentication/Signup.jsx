
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { motion } from 'framer-motion';
// import { CarouselData } from '../../../data/Carouseldata';
// import Navbar from '../LandingPageComponent/Navbar';
// import './button.css';
// import styles from './Signup.module.css';
// import { useDispatch, useSelector } from 'react-redux';


// const Signup = () => {
//     const { loginWithRedirect } = useAuth0();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState("");
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         pic: null
//     });
//     const [picUrl, setPicUrl] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [currentImage, setCurrentImage] = useState(0);
//     const [isVisible, setIsVisible] = useState(false);

//     const forwardImage = () => {
//         setCurrentImage(currentImage < CarouselData.length - 1 ? currentImage + 1 : 0);
//         setIsVisible(false);
//     };

//     const backwardImage = () => {
//         setCurrentImage(currentImage > 0 ? currentImage - 1 : CarouselData.length - 1);
//         setIsVisible(false);
//     };

//     const fadeInAnimation = () => {
//         setIsVisible(true);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             forwardImage();
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [currentImage]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'pic') {
//             setFormData({ ...formData, [name]: e.target.files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }

//         let errorMessage = '';
//         if (name === 'email' && !/\S+@\S+\.\S+/.test(value))
//             errorMessage = 'Email is not valid';
//         else if (name !== 'password' && name !== 'pic' && !value.trim())
//             errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;

//         setErrors({ ...errors, [name]: errorMessage });
//     };

//     const postDetails = async () => {
//         setLoading(true);

//         if (!formData.pic) {
//             setErrors("Please select an image");
//             setLoading(false);
//             return;
//         }

//         if (formData.pic.type === 'image/jpeg' || formData.pic.type === 'image/png') {
//             const data = new FormData();
//             data.append('file', formData.pic);
//             data.append('upload_preset', 'IntellectCoin');
//             data.append('cloud_name', 'janhavi');

//             try {
//                 const res = await fetch('https://api.cloudinary.com/v1_1/janhavi/image/upload', {
//                     method: 'post',
//                     body: data,
//                 });
//                 const result = await res.json();

//                 if (result.url) {
//                     setPicUrl(result.url.toString());
//                     setLoading(false);
//                     return result.url.toString();
//                 } else {
//                     setErrors('Upload failed');
//                     setLoading(false);
//                     return null;
//                 }
//             } catch (err) {
//                 setErrors('Error uploading image');
//                 setLoading(false);
//                 return null;
//             }
//         } else {
//             setErrors("Please select a valid image");
//             setLoading(false);
//             return null;
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const imageUrl = await postDetails();
//         if (!imageUrl) return;

//         setLoading(true);

//         const uri = 'http://localhost:4000/api/users/add';

//         axios.post(uri, { ...formData, pic: imageUrl })
//             .then(response => {
//                 const res = response.data;
//                 localStorage.setItem('token', res.data);
//                 setLoading(false);
//                 navigate('/home');
//             })
//             .catch(error => {
//                 if (error.response && error.response.data && error.response.data.error) {
//                     setErrors(error.response.data.error.map(err => err.message).join(", "));
//                 } else {
//                     setErrors("An unexpected error occurred.");
//                 }
//                 setLoading(false);
//             });
//     };

//     return (
//         <>
//             <Navbar />
//             <div className={styles.login_container}>
//                 <div className={styles.left}>
//                     <div onClick={forwardImage} className={styles.forward}>
//                        <FontAwesomeIcon icon={faChevronRight} style={{ height: '30px', width: '30px', marginLeft: '40px' }} />
//                     </div>
//                     <motion.img
//                         src={CarouselData[currentImage].img}
//                         alt=""
//                         className={styles.image}
//                         initial={{ opacity: 0 }} 
//                         animate={{ opacity: isVisible ? 1 : 0 }} 
//                         transition={{ duration: 0.5 }} 
//                         onLoad={fadeInAnimation}
//                     />
//                     <div onClick={backwardImage} className={styles.backward}>
//                         <FontAwesomeIcon icon={faChevronRight} style={{ transform: 'rotate(180deg)', height: '30px', width: '30px' }} />
//                     </div>
//                     {CarouselData.map((data, index) => (
//                         <motion.div
//                             key={index}
//                             className={styles.title_below}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: isVisible ? 1 : 0 }} 
//                             transition={{ delay: index * 0.5, duration: 0.5 }}
//                         >
//                             {currentImage === index && (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: isVisible ? 1 : 0 }} 
//                                     transition={{ delay: index * 0.5, duration: 0.5 }}
//                                 >
//                                     {data.title}
//                                 </motion.div>
//                             )}
//                         </motion.div>
//                     ))}
//                 </div>
//                 <div className={styles.login_form_container}>
//                     <div className={styles.left}>
//                         <form className={styles.form} onSubmit={handleSubmit}>
//                             <h1 className={styles.heading}>Create Account</h1>
//                             <p className={styles.para1}>Sign up and start your journey</p>
//                             <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
//                             {errors.firstName && <div className={styles.error_msg}>{errors.firstName}</div>}
//                             <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
//                             {errors.lastName && <div className={styles.error_msg}>{errors.lastName}</div>}
//                             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//                             {errors.email && <div className={styles.error_msg}>{errors.email}</div>}
//                             <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                             {errors.password && <div className={styles.error_msg}>{errors.password}</div>}
//                             <input type= "file" name='pic' accept='image/*'onChange={handleChange} />
//                             {errors && typeof errors === 'string' && <div className={styles.error_msg}>{errors}</div>}
//                             <button className="btn">Sign Up <FontAwesomeIcon icon={faArrowRight} className='arrow' /></button>
//                             <button type="button" className="login-with-google-btn" onClick={loginWithRedirect}>Sign up with Google</button>
//                             <p className={styles.noaccount}>Already have an account? <Link to="/login">Login</Link></p>
//                         </form>
//                      </div>
//                </div>
//              </div>
           
//         </>
//     );
// };

// export default Signup;


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

                <input type="file" name="pic" accept="image/jpeg,image/png"  onChange={handleChange} />
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




  







