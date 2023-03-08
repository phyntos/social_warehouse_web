import dayjs from 'dayjs';
import { ProTabulator } from 'pro-tabulator';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_COLOR } from '../../../bootstrap';
import ProButton from '../../../common/ProButton/ProButton';
import { getTableRequest } from '../../../functions';
import {
    useCreateWarehouseMutation,
    useLazyGetWarehousesQuery,
    WarehouseListParams,
    WarehouseListVM,
} from '../WarehouseApi/WarehouseApi';

const WarehouseList = () => {
    const [getWarehouses] = useLazyGetWarehousesQuery();
    const [create] = useCreateWarehouseMutation();

    const navigate = useNavigate();

    return (
        <ProTabulator<WarehouseListVM, WarehouseListParams>
            request={getTableRequest((params) => getWarehouses(params).unwrap())}
            columns={[
                { dataIndex: 'name', width: 100, title: 'Название', valueType: 'text' },
                { dataIndex: 'address', width: 100, title: 'Адрес', valueType: 'text' },
                {
                    dataIndex: 'created',
                    width: 160,
                    title: 'Дата создания',
                    valueType: 'dateApartRange',
                    excelRender: (text) => dayjs(text).format('DD.MM.YYYY HH:mm'),
                },
            ]}
            rowClick={(record) => {
                if (record.id) {
                    navigate(`/warehouses/item/${record.id}`);
                }
            }}
            toolBarRender={() => [
                <ProButton
                    key='create'
                    onAsyncClick={async () => {
                        const id = await create().unwrap();
                        if (id) navigate(`/warehouses/item/${id}`);
                    }}
                >
                    Создать склад
                </ProButton>,
            ]}
            downloadProps={{
                fileName: 'Заявки',
            }}
            scroll={{
                x: 1400,
            }}
            disableHeightScroll
            id='WarehousesTable'
            rowKey='id'
            ordered
            colorPrimary={PRIMARY_COLOR}
        />
    );
};

export default WarehouseList;
