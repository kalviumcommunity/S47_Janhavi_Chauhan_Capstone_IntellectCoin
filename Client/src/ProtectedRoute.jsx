import React from "react"; 
import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectors } from "./authSlice";

const ProtectedRoute = ({component : Component}) => {
    const isAuthenticated = useSelector (selectors)
    console.log('routes isAuthenticated:--',isAuthenticated)

     if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
    return <Component/>;
}

export default ProtectedRoute