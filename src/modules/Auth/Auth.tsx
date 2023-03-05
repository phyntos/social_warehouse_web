import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLogin from './AuthLogin/AuthLogin';

const Auth = () => {
    return (
        <Routes>
            <Route path='/login' element={<AuthLogin />} />
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    );
};

export default Auth;
