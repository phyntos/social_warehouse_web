import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, ConfigProvider, Layout, Menu, Space, Tooltip } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './Container.scss';

const { Header, Sider, Content } = Layout;

type ContainerMenuItemWithChildren<ItemKey extends string, Roles extends string> = {
    key: ItemKey;
    label: string;
    path?: undefined;
    element?: undefined;
    roles: Roles[];
    icon?: React.ReactNode;
    children: ContainerMenuItem<ItemKey, Roles>[];
};

type ContainerMenuItemWithPath<ItemKey extends string, Roles extends string> = {
    key: ItemKey;
    label: string;
    path: string;
    element: React.ReactNode;
    roles: Roles[];
    icon?: React.ReactNode;
    children?: undefined;
};

type ContainerMenuItem<ItemKey extends string, Roles extends string> =
    | ContainerMenuItemWithPath<ItemKey, Roles>
    | ContainerMenuItemWithChildren<ItemKey, Roles>;

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

const getMenuItem = <ItemKey extends string, Roles extends string>(
    items: ContainerMenuItem<ItemKey, Roles>[],
    key: ItemKey,
): ContainerMenuItemWithPath<ItemKey, Roles> => {
    for (const item of items) {
        if (item.children) {
            const menuItem = getMenuItem(item.children, key);
            if (menuItem.key) return menuItem;
            else continue;
        }

        if (item.key === key) return item;
    }
    return {} as ContainerMenuItemWithPath<ItemKey, Roles>;
};

const getMenuItemWithParents = <ItemKey extends string, Roles extends string>(
    items: ContainerMenuItem<ItemKey, Roles>[],
    key: ItemKey,
): ContainerMenuItem<ItemKey, Roles>[] => {
    for (const item of items) {
        if (item.children) {
            const menuItems = getMenuItemWithParents(item.children, key);
            if (menuItems.length > 0) return [item, ...menuItems];
            else continue;
        }

        if (item.key === key) return [item];
    }
    return [];
};

const getMenuItemByString = <ItemKey extends string, Roles extends string>(
    items: ContainerMenuItem<ItemKey, Roles>[],
    key: string,
): ContainerMenuItemWithPath<ItemKey, Roles> => {
    for (const item of items) {
        if (item.children) {
            const menuItem = getMenuItemByString(item.children, key);
            if (menuItem.key) return menuItem;
            else continue;
        }
        if (key.includes(item.key)) return item;
    }
    return {} as ContainerMenuItemWithPath<ItemKey, Roles>;
};

const filterMenuItems = <ItemKey extends string, Roles extends string>(
    items: ContainerMenuItem<ItemKey, Roles>[],
    role: Roles | null,
): ContainerMenuItem<ItemKey, Roles>[] => {
    return items
        .filter((item) => (item.roles.length > 0 && role ? item.roles.includes(role) : true))
        .map((item) => {
            if (!item.children) return item;

            return {
                ...item,
                children: filterMenuItems(item.children, role),
            };
        });
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

    const items = filterMenuItems(menuItems, userData.role);

    const getPath = (key?: string) => {
        if (!key) return null;
        const find = getMenuItem(items, key);
        if (!find) return null;
        return find;
    };

    useEffect(() => {
        const find = getMenuItemByString(items, location.pathname);
        if (find) setActiveKey(find.key);
        else setActiveKey(defaultKey);
    }, [location.pathname, items, userData.role, defaultKey]);

    const [collapsed, setCollapsed] = useState(true);

    const specialDefaultKey = userData.role ? specialDefaultKeys?.[userData.role] : undefined;

    const defaultPath = getPath(specialDefaultKey || defaultKey)?.path;
    const profilePath = getPath(profileKey)?.path;
    const activeItemParents = getMenuItemWithParents(items, activeKey);

    const menuItemMap = ({ key, label, icon, path, children }: ContainerMenuItem<ItemKey, Roles>): ItemType => {
        if (!children) {
            return {
                key,
                label,
                icon,
                onClick: () => {
                    navigate(path);
                },
            };
        }

        if (children.length === 1) {
            return menuItemMap(children[0]);
        }

        return {
            key,
            label,
            icon,
            children: children.map(menuItemMap),
        };
    };

    return (
        <ConfigProvider prefixCls='container' iconPrefixCls='container-icon'>
            <ContainerContext.Provider value={{ title, setTitle }}>
                <Layout className='contaier-main-layout'>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className='container-logo'>{logo?.(collapsed)}</div>
                        <Menu theme='dark' mode='inline' items={items.map(menuItemMap)} selectedKeys={[activeKey]} />
                    </Sider>
                    <Layout>
                        <Header>
                            <Space size={16}>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'icon-button container-trigger',
                                    onClick: () => setCollapsed((collapsed) => !collapsed),
                                })}
                                <Breadcrumb>
                                    {activeItemParents.length &&
                                        activeItemParents.map((item, index) => (
                                            <Breadcrumb.Item key={item.key}>
                                                {(title || index !== activeItemParents.length - 1) && item.path ? (
                                                    <Link to={item.path}>{item.label}</Link>
                                                ) : (
                                                    item.label
                                                )}
                                            </Breadcrumb.Item>
                                        ))}
                                    {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
                                </Breadcrumb>
                            </Space>
                            <Space size={16}>
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
                                {items.map((item) => {
                                    if (item.children) {
                                        return (
                                            <>
                                                {item.children.map((childItem) => (
                                                    <Route
                                                        key={childItem.key}
                                                        path={childItem.path}
                                                        element={childItem.element}
                                                    />
                                                ))}
                                            </>
                                        );
                                    }
                                    return <Route key={item.key} path={item.path} element={item.element} />;
                                })}
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
