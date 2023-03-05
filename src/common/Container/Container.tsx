import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, ConfigProvider, Layout, Menu, Space, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './Container.scss';

const { Header, Sider, Content } = Layout;

type ContainerMenuItem<ItemKey extends string, Roles extends string> = {
    key: ItemKey;
    label: string;
    path: string;
    element: React.ReactNode;
    roles: Roles[];
    icon?: React.ReactNode;
};

export const ContainerContext = React.createContext<{ title: string; setTitle: (title: string) => void }>({
    title: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setTitle: () => {},
});

export const useContainerTitle = (title: string) => {
    const { setTitle } = useContext(ContainerContext);

    useEffect(() => {
        setTitle(title);
        return () => {
            setTitle('');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);
};

const Container = <ItemKey extends string, Roles extends string>({
    menuItems,
    onLogout,
    defaultKey,
    specialDefaultKeys,
    profileKey,
    logo,
    userData,
}: {
    menuItems: ContainerMenuItem<ItemKey, Roles>[];
    onLogout?: () => void;
    defaultKey: ItemKey;
    specialDefaultKeys?: Partial<Record<Roles, ItemKey>>;
    profileKey?: ItemKey;
    logo?: (collapsed: boolean) => React.ReactNode;
    userData: {
        role: Roles | null;
        fullName?: string | null;
    };
}) => {
    const [activeKey, setActiveKey] = useState<ItemKey>(defaultKey);
    const [title, setTitle] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const items = menuItems.filter((item) =>
        item.roles.length > 0 && userData.role ? item.roles.includes(userData.role) : true,
    );

    const getPath = (key?: ItemKey) => {
        if (!key) return null;
        const find = menuItems.find((item) => item.key === key);
        if (!find) return null;
        return find;
    };

    useEffect(() => {
        const find = items.find((navItem) => {
            return location.pathname.includes(navItem.key);
        });

        if (find) setActiveKey(find.key);
        else setActiveKey(defaultKey);
    }, [location, items, userData.role, defaultKey]);

    const [collapsed, setCollapsed] = useState(true);

    const specialDefaultKey = userData.role ? specialDefaultKeys?.[userData.role] : undefined;

    const defaultPath = getPath(specialDefaultKey || defaultKey)?.path;
    const profilePath = getPath(profileKey)?.path;
    const activeItem = getPath(activeKey);

    return (
        <ConfigProvider prefixCls='container' iconPrefixCls='container-icon'>
            <ContainerContext.Provider value={{ title, setTitle }}>
                <Layout className='contaier-main-layout'>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        {logo?.(collapsed)}
                        <Menu
                            theme='dark'
                            mode='inline'
                            items={menuItems.map(({ key, label, icon, path }) => ({
                                key,
                                label,
                                icon,
                                onClick: () => {
                                    navigate(path);
                                },
                            }))}
                            selectedKeys={[activeKey]}
                        />
                    </Sider>
                    <Layout>
                        <Header>
                            <Space size={16}>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'icon-button container-trigger',
                                    onClick: () => setCollapsed((collapsed) => !collapsed),
                                })}
                                <Breadcrumb>
                                    {activeItem && (
                                        <Breadcrumb.Item>
                                            {title ? (
                                                <Link to={activeItem.path}>{activeItem.label}</Link>
                                            ) : (
                                                activeItem.label
                                            )}
                                        </Breadcrumb.Item>
                                    )}
                                    {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
                                </Breadcrumb>
                            </Space>
                            <Space>
                                {userData.fullName && (
                                    <div
                                        className={
                                            profilePath
                                                ? 'container-header-user container-header-profile'
                                                : 'container-header-user'
                                        }
                                        onClick={() => {
                                            if (profilePath) navigate(profilePath);
                                        }}
                                    >
                                        {userData.fullName}
                                        <span className='container-user-role'>{userData.role}</span>
                                    </div>
                                )}
                                {onLogout && (
                                    <Tooltip title='Выйти'>
                                        <LogoutOutlined className='icon-button' onClick={onLogout} />
                                    </Tooltip>
                                )}
                            </Space>
                        </Header>
                        <Content>
                            <Routes>
                                {items.map((item) => (
                                    <Route key={item.key} path={item.path} element={item.element} />
                                ))}
                                {defaultPath && <Route path='*' element={<Navigate to={defaultPath} />} />}
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </ContainerContext.Provider>
        </ConfigProvider>
    );
};

export default Container;
