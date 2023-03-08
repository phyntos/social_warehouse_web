import { ConfigProvider } from 'antd';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import WarehouseItem from './WarehouseItem/WarehouseItem';
import WarehouseList from './WarehouseList/WarehouseList';

const Warehouse = () => {
    return (
        <ConfigProvider prefixCls='warehouse'>
            <Routes>
                <Route path='/list' element={<WarehouseList />} />
                <Route path='/item/:id' element={<WarehouseItem />} />
                <Route path='*' element={<Navigate to='/warehouses/list' />} />
            </Routes>
        </ConfigProvider>
    );
};

export default Warehouse;
