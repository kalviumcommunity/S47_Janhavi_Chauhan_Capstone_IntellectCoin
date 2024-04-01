import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import sideImage from '../../images/1.png'
import { CarouselData } from '../../data/Carouseldata'

const Login = () => {
    const [error, setError] = useState(null) 
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [currentImage, setCurrentImage] = useState(0);

    const navigate = useNavigate()

    const forwardImage = () => {
        setCurrentImage(currentImage < CarouselData.length - 1 ? currentImage + 1 : 0);
    }

    const backwardImage = () => {
        setCurrentImage(currentImage > 0 ? currentImage - 1 : CarouselData.length - 1);
    }

    const handleChange = (e) => { 
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const uri = "http://localhost:4000/api/auth";
            const { data: res } = await axios.post(uri, formData)
            localStorage.setItem("token", res.data)
            navigate('/')
            console.log(res.message)
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("An unexpected error occurred.") 
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.left}>
                <div onClick={backwardImage} className={styles.backward}>
                    backward
                </div>
                <img src={CarouselData[currentImage].img} alt="" className={styles.image} />
                <div onClick={forwardImage} className={styles.forward}>
                    forward
                </div>
                <div className={styles.title_below}>
                    {CarouselData[currentImage].title}
                </div>
            </div>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <h1>New Here ? <Link to="/signup">Sign up</Link></h1>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit">Sign in</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
