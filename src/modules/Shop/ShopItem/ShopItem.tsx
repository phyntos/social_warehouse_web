import { Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProContainerTitle } from '../../../common/ProContainer/ProContainer';
import ProHeader from '../../../common/ProHeader/ProHeader';
import { useGetShopQuery } from '../ShopApi/ShopApi';
import ShopPosition from '../ShopPosition/ShopPosition';

const ShopItem = () => {
    const { id = '' } = useParams();
    const { data: shop, isFetching } = useGetShopQuery(id, { skip: !id });
    useProContainerTitle(shop?.name || '');

    return (
        <Spin spinning={isFetching}>
            <ProHeader
                infos={[
                    { key: 'code', label: 'Название', value: shop?.name },
                    { key: 'address', label: 'Адрес', value: shop?.address },
                    {
                        key: 'createdDate',
                        label: 'Дата создания',
                        value: dayjs(shop?.created).format('DD.MM.YYYY HH:mm'),
                    },
                ]}
            />
            <ShopPosition id={id} />
        </Spin>
    );
};

export default ShopItem;
