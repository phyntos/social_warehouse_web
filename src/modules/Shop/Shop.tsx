import { ConfigProvider } from 'antd';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ShopItem from './ShopItem/ShopItem';
import ShopList from './ShopList/ShopList';

const Shop = () => {
    return (
        <ConfigProvider prefixCls='shop'>
            <Routes>
                <Route path='/list' element={<ShopList />} />
                <Route path='/item/:id' element={<ShopItem />} />
                <Route path='*' element={<Navigate to='/shops/list' />} />
            </Routes>
        </ConfigProvider>
    );
};

export default Shop;
