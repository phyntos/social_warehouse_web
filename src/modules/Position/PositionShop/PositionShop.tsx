import dayjs from 'dayjs';
import { ProTabulator } from 'pro-tabulator';
import React from 'react';
import { PRIMARY_COLOR } from '../../../bootstrap';
import { getTableRequest } from '../../../functions';
import {
    AppealListParams,
    AppealListVM,
    useGetDirectoriesQuery,
    useLazyGetAppealsQuery,
} from '../../Appeal/AppealApi/AppealApi';

const PositionShop = () => {
    const [getAppeals] = useLazyGetAppealsQuery();
    const { data: directories } = useGetDirectoriesQuery();

    return (
        <ProTabulator<AppealListVM, AppealListParams>
            request={getTableRequest((params) => getAppeals(params).unwrap())}
            columns={[
                { dataIndex: 'code', width: 100, title: 'Код заявки', valueType: 'text' },
                {
                    dataIndex: 'createdDate',
                    width: 160,
                    title: 'Дата создания',
                    valueType: 'dateApartRange',
                    searchState: 'hidden',
                    excelRender: (text) => dayjs(text).format('DD.MM.YYYY HH:mm'),
                },
                {
                    dataIndex: 'status',
                    width: 250,
                    title: 'Статус заявки',
                    valueType: 'select',
                    fieldProps: {
                        mode: 'multiple',
                        options: directories?.statuses,
                    },
                },
            ]}
            downloadProps={{
                fileName: 'Заявки',
            }}
            scroll={{
                x: 1400,
            }}
            disableHeightScroll
            id='AppealsTable'
            rowKey='id'
            ordered
            colorPrimary={PRIMARY_COLOR}
        />
    );
};

export default PositionShop;
