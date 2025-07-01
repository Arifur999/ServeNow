import React, { useContext } from 'react';
import {Navigate, useLocation } from 'react-router';
import Spinner from './Spinner';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    console.log(loading);
    const location =useLocation()
    if(loading){
        return <Spinner></Spinner>;
    }
    if(!user || !user.email){
        return<Navigate state={{from:location.pathname}} to='/login'></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};
export default PrivateRoute;