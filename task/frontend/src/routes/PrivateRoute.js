import React from 'react'
import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';
const PrivateRoute = ({children}) => {
    const isAuthenticated = useSelector(state=>state.Auth.token)
    // console.log(isAuthenticated)

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;

}

export default PrivateRoute