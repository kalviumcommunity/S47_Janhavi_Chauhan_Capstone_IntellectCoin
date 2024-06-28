import React, { createContext, useState, useEffect } from 'react';
import { verifyUser } from '../../services/services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyUser(token)
                .then(response => {
                    setAuth({ token, user: response.data });
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
