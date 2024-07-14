import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
       
        dispatch(logout());

        
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        
        sessionStorage.removeItem('CART');

        
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="logoutbutton">
            Logout
        </button>
    );
};

export default Logout;
