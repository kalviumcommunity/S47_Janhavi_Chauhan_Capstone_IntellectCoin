import styles from './Datadisplay.module.css'; 
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [error, setError] = useState(null) // Change initial state to null
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

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
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit">Sign in</button> 
                    </form>
                </div>
                <div className={styles.right}>
                <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button>
                            Sign in
                        </button>
                    </Link>
                 
                </div>
            </div>
        </div>
    )
}

export default Login
