import dayjs from 'dayjs';
import { ProTabulator } from 'pro-tabulator';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_COLOR } from '../../../bootstrap';
import ProButton from '../../../common/ProButton/ProButton';
import { getTableRequest } from '../../../functions';
import { useCreateShopMutation, useLazyGetShopsQuery, ShopListParams, ShopListVM } from '../ShopApi/ShopApi';

const ShopList = () => {
    const [getShops] = useLazyGetShopsQuery();
    const [create] = useCreateShopMutation();

    const navigate = useNavigate();

    return (
        <ProTabulator<ShopListVM, ShopListParams>
            request={getTableRequest((params) => getShops(params).unwrap())}
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
                    navigate(`/shops/item/${record.id}`);
                }
            }}
            toolBarRender={() => [
                <ProButton
                    key='create'
                    onAsyncClick={async () => {
                        const id = await create().unwrap();
                        if (id) navigate(`/shops/item/${id}`);
                    }}
                >
                    Создать магазин
                </ProButton>,
            ]}
            downloadProps={{
                fileName: 'Магазины',
            }}
            scroll={{
                x: 1400,
            }}
            disableHeightScroll
            id='ShopsTable'
            rowKey='id'
            ordered
            colorPrimary={PRIMARY_COLOR}
        />
    );
};

export default ShopList;
