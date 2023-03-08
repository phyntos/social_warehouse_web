import { ConfigProvider } from 'antd';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import WarehouseList from './WarehouseList/WarehouseList';
import WarehousePosition from './WarehousePosition/WarehousePosition';

const Warehouse = () => {
    return (
        <ConfigProvider prefixCls='warehouse'>
            <Routes>
                <Route path='/list' element={<WarehouseList />} />
                <Route path='/item/:id' element={<WarehousePosition />} />
                <Route path='*' element={<Navigate to='/warehouses/list' />} />
            </Routes>
        </ConfigProvider>
    );
};

export default Warehouse;
