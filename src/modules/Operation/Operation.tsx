import { ConfigProvider } from 'antd';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OperationItem from './OperationItem/OperationItem';
import OperationList from './OperationList/OperationList';

const Operation = () => {
    return (
        <ConfigProvider prefixCls='operation'>
            <Routes>
                <Route path='/list' element={<OperationList />} />
                <Route path='/item/:id' element={<OperationItem />} />
                <Route path='*' element={<Navigate to='/operations/list' />} />
            </Routes>
        </ConfigProvider>
    );
};

export default Operation;
