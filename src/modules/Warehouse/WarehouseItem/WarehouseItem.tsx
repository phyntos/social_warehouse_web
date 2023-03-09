import { Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProContainerTitle } from '../../../common/ProContainer/ProContainer';
import ProHeader from '../../../common/ProHeader/ProHeader';
import { useGetWarehouseQuery } from '../WarehouseApi/WarehouseApi';
import WarehousePosition from '../WarehousePosition/WarehousePosition';

const WarehouseItem = () => {
    const { id = '' } = useParams();
    const { data: warehouse, isFetching } = useGetWarehouseQuery(id, { skip: !id });
    useProContainerTitle(warehouse?.name || '');

    return (
        <Spin spinning={isFetching}>
            <ProHeader
                infos={[
                    { key: 'code', label: 'Название', value: warehouse?.name },
                    { key: 'address', label: 'Адрес', value: warehouse?.address },
                    {
                        key: 'createdDate',
                        label: 'Дата создания',
                        value: dayjs(warehouse?.created).format('DD.MM.YYYY HH:mm'),
                    },
                ]}
            />
            <WarehousePosition id={id} />
        </Spin>
    );
};

export default WarehouseItem;
