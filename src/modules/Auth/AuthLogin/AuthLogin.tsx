import React from 'react';
import Login from '../../../common/Login/Login';
import Logo from '../../../components/Logo/Logo';
import { LoginVM, useLoginMutation } from '../../Auth/AuthApi/AuthApi';
import './AuthLogin.scss';

const AuthLogin = () => {
    const [login] = useLoginMutation();

    return (
        <Login<LoginVM>
            onLogin={async (fields) => {
                await login(fields).unwrap();
            }}
            className='auth-login'
            logo={<Logo withDescription />}
        />
    );
};

export default AuthLogin;
