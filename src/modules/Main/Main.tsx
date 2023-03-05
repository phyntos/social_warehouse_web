import { ContainerOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import Container from '../../common/Container/Container';
import Appeal from '../Appeal/Appeal';
import { setToken, useTokenData } from '../Auth/AuthApi/AuthSlice';
import Profile from '../Profile/Profile';
import { useAppDispatch } from '../../redux/hooks';
import Logo from '../../components/Logo/Logo';

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
                    roles: [],
                },
                {
                    key: 'appeals',
                    icon: <ContainerOutlined />,
                    label: 'Заявки',
                    element: <Appeal />,
                    path: '/appeals/*',
                    roles: [],
                },
            ]}
            defaultKey='appeals'
            profileKey='profile'
            userData={{
                role,
                fullName,
            }}
            logo={(collapsed) => <Logo className='container-logo' size={collapsed ? 'mini' : 'normal'} />}
            onLogout={() => dispatch(setToken(null))}
        />
    );
};

export default Main;
