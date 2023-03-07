import { ContainerOutlined } from '@ant-design/icons';
import {
    ClusterOutlined,
    ControlOutlined,
    DatabaseOutlined,
    PartitionOutlined,
    PieChartOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons/lib/icons';
import React from 'react';
import Container from '../../common/Container/Container';
import Logo from '../../components/Logo/Logo';
import { useAppDispatch } from '../../redux/hooks';
import Report from '../Report/Report';
import Appeal from '../Appeal/Appeal';
import { setToken, useTokenData } from '../Auth/AuthApi/AuthSlice';
import Catalog from '../Catalog/Catalog';
import Operation from '../Operation/Operation';
import Position from '../Position/Position';
import Profile from '../Profile/Profile';

const Main = () => {
    const fullName = useTokenData('fullname');
    const role = useTokenData('role');
    const dispatch = useAppDispatch();

    return (
        <Container
            menuItems={[
                {
                    key: 'profile',
                    icon: <UserOutlined />,
                    label: 'Профиль',
                    element: <Profile />,
                    path: '/profile',
                    roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                },
                {
                    key: 'position',
                    icon: <ClusterOutlined />,
                    label: 'Положение',
                    roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                    children: [
                        {
                            key: 'warehouses',
                            icon: <DatabaseOutlined />,
                            label: 'Склады',
                            element: <Position type='Warehouse' />,
                            path: '/position/warehouses',
                            roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                        },
                        {
                            key: 'shops',
                            icon: <ShopOutlined />,
                            label: 'Магазины',
                            element: <Position type='Shop' />,
                            path: '/position/shops',
                            roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                        },
                    ],
                },
                {
                    key: 'appeals',
                    icon: <ContainerOutlined />,
                    label: 'Заявки',
                    element: <Appeal />,
                    path: '/appeals/*',
                    roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                },
                {
                    key: 'operations',
                    icon: <PartitionOutlined />,
                    label: 'Операции',
                    element: <Operation />,
                    path: '/operations/*',
                    roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                },
                {
                    key: 'catalog',
                    icon: <ControlOutlined />,
                    label: 'Каталог',
                    element: <Catalog />,
                    path: '/catalog',
                    roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                },
                {
                    key: 'report',
                    icon: <PieChartOutlined />,
                    label: 'Отчёты',
                    element: <Report />,
                    path: '/report',
                    roles: ['root', 'contact', 'sales-manager', 'sales-head', 'admin', 'warehouse-manager'],
                },
            ]}
            defaultKey='appeals'
            profileKey='profile'
            userData={{
                role,
                fullName,
            }}
            logo={(collapsed) => <Logo size={collapsed ? 'mini' : 'normal'} />}
            onLogout={() => dispatch(setToken(null))}
        />
    );
};

export default Main;
