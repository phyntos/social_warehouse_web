import { ConfigProvider } from 'antd';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppealItem from './AppealItem/AppealItem';
import AppealList from './AppealList/AppealList';

const Appeal = () => {
    return (
        <ConfigProvider prefixCls='appeal'>
            <Routes>
                <Route path='/list' element={<AppealList />} />
                <Route path='/item/:id' element={<AppealItem />} />
                <Route path='*' element={<Navigate to='/appeals/list' />} />
            </Routes>
        </ConfigProvider>
    );
};

export default Appeal;
