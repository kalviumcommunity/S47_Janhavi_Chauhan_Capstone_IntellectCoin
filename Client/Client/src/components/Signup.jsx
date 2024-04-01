import styles from './Datadisplay.module.css'; 
import { Link, useNavigate } from 'react-router-dom' 
import { useState } from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
// import { loginWithRedirect } from "@auth0/auth0-react";

const Signup = () => {
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate() 
    const [error, setError] = useState(null) 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => { 
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const uri = "http://localhost:4000/api/users/add";
            const { data: res } = await axios.post(uri, formData)
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
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/">
                        <button>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit">Sign Up</button> 
                        <button onClick={() => loginWithRedirect()}>Signup using google</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
