import React from 'react';
import Auth from '../../modules/Auth/Auth';
import { useToken } from '../../modules/Auth/AuthApi/AuthSlice';
import Main from '../../modules/Main/Main';
import './App.scss';

const App = () => {
    const token = useToken();

    if (!token) return <Auth />;

    return <Main />;
};

export default App;
