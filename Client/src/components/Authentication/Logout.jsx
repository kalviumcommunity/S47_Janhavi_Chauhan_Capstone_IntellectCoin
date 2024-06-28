import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Clear the authentication state in Redux
        dispatch(logout());

        // Remove tokens or any authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
