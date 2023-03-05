import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppealItem from './AppealItem/AppealItem';
import AppealList from './AppealList/AppealList';

const Appeal = () => {
    return (
        <Routes>
            <Route path='/list' element={<AppealList />} />
            <Route path='/item/:id' element={<AppealItem />} />
            <Route path='*' element={<Navigate to='/appeals/list' />} />
        </Routes>
    );
};

export default Appeal;
