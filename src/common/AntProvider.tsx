import ruRU from 'antd/locale/ru_RU';
import React from 'react';
import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, Empty } from 'antd';

const AntProvider = ({ children, primaryColor }: { children: React.ReactNode; primaryColor?: string }) => {
    return (
        <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
            <ConfigProvider
                theme={
                    primaryColor
                        ? {
                              token: {
                                  colorPrimary: primaryColor,
                                  colorInfo: primaryColor,
                              },
                          }
                        : undefined
                }
                locale={ruRU}
                renderEmpty={() => <Empty description='Отсутствуют данные' />}
                prefixCls='social'
            >
                {children}
            </ConfigProvider>
        </StyleProvider>
    );
};

export default AntProvider;
