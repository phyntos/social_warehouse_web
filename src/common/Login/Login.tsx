import { ProForm, ProFormText } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import React from 'react';
import ProButton from '../ProButton/ProButton';
import './Login.scss';

const Login = <LoginVM extends { login: string; password: string }>({
    onLogin,
    logo,
    className,
}: {
    onLogin: (fields: LoginVM) => Promise<any>;
    className?: string;
    logo?: React.ReactNode;
}) => {
    const [form] = ProForm.useForm<LoginVM>();
    const classNames = ['login-container'];
    if (className) classNames.push(className);

    return (
        <ConfigProvider prefixCls='login'>
            <div className={classNames.join(' ')}>
                <ProForm form={form} className='login-form' submitter={false}>
                    <div className='login-logo'>{logo}</div>
                    <ProFormText
                        name='login'
                        label='Email'
                        rules={[{ required: true, message: 'Пожалуйства введите Email' }]}
                    />
                    <ProFormText.Password
                        name='password'
                        label='Пароль'
                        rules={[{ required: true, message: 'Пожалуйства введите пароль' }]}
                    />
                    <ProButton
                        onAsyncClick={async () => {
                            const fields = await form.validateFields();
                            await onLogin(fields);
                        }}
                    >
                        Войти
                    </ProButton>
                </ProForm>
            </div>
        </ConfigProvider>
    );
};

export default Login;
