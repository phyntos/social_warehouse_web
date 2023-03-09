import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
import React from 'react';
import { DirectoryTypes, useLazyGetDirectoryQuery } from './DirectoryApi';

const DirectorySelect = <T = any,>({ directory, ...props }: ProFormSelectProps<T> & { directory: DirectoryTypes }) => {
    const [getDirectory] = useLazyGetDirectoryQuery();

    return (
        <ProFormSelect
            {...props}
            params={{ directory }}
            request={async ({ keyWords, directory }) => {
                return getDirectory({ type: directory, text: keyWords }).unwrap();
            }}
            fieldProps={{ ...props.fieldProps, showSearch: true }}
        />
    );
};

export default DirectorySelect;
