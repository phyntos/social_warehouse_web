import dayjs from 'dayjs';
import { ProTabulator } from 'pro-tabulator';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_COLOR } from '../../../bootstrap';
import ProButton from '../../../common/ProButton/ProButton';
import { getTableRequest } from '../../../functions';
import {
    AppealListParams,
    AppealListVM,
    useCreateAppealMutation,
    useGetDirectoriesQuery,
    useLazyGetAppealsQuery,
} from '../AppealApi/AppealApi';

const AppealList = () => {
    const [getAppeals] = useLazyGetAppealsQuery();
    const { data: directories } = useGetDirectoriesQuery();
    const [create] = useCreateAppealMutation();

    const navigate = useNavigate();

    return (
        <ProTabulator<AppealListVM, AppealListParams>
            request={getTableRequest((params) => getAppeals(params).unwrap())}
            columns={[
                { dataIndex: 'code', width: 100, title: 'Код заявки', valueType: 'text' },
                {
                    dataIndex: 'created',
                    width: 160,
                    title: 'Дата создания',
                    valueType: 'dateApartRange',
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
            rowClick={(record) => {
                if (record.id) {
                    navigate(`/appeals/item/${record.id}`);
                }
            }}
            toolBarRender={() => [
                <ProButton
                    key='create'
                    onAsyncClick={async () => {
                        const id = await create().unwrap();
                        if (id) navigate(`/appeals/item/${id}`);
                    }}
                >
                    Создать заявку
                </ProButton>,
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

export default AppealList;
