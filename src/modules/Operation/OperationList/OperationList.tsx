import dayjs from 'dayjs';
import { ProTabulator } from 'pro-tabulator';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_COLOR } from '../../../bootstrap';
import ProButton from '../../../common/ProButton/ProButton';
import { getTableRequest } from '../../../functions';
import {
    OperationListParams,
    OperationListVM,
    OperationTypesEnum,
    useCreateOperationMutation,
    useGetOperationDirectoriesQuery,
    useLazyGetOperationsQuery,
} from '../OperationApi/OperationApi';

const OperationList = () => {
    const [getOperations] = useLazyGetOperationsQuery();
    const { data: directories } = useGetOperationDirectoriesQuery();
    const [create] = useCreateOperationMutation();

    const navigate = useNavigate();

    return (
        <ProTabulator<OperationListVM, OperationListParams>
            request={getTableRequest((params) => getOperations(params).unwrap())}
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
                    width: 150,
                    title: 'Статус заявки',
                    valueType: 'select',
                    fieldProps: {
                        mode: 'multiple',
                        options: directories?.statuses,
                    },
                },
                {
                    dataIndex: 'operationType',
                    width: 150,
                    title: 'Тип операции',
                    valueType: 'select',
                    valueEnum: OperationTypesEnum,
                    excelRender: (val, record) => OperationTypesEnum[record.operationType!],
                    fieldProps: {
                        mode: 'multiple',
                    },
                },
            ]}
            rowClick={(record) => {
                if (record.id) {
                    navigate(`/operations/item/${record.id}`);
                }
            }}
            toolBarRender={() => [
                <ProButton
                    key='create'
                    onAsyncClick={async () => {
                        const id = await create().unwrap();
                        if (id) navigate(`/operations/item/${id}`);
                    }}
                >
                    Создать операцию
                </ProButton>,
            ]}
            downloadProps={{
                fileName: 'Операции',
            }}
            scroll={{
                x: 1400,
            }}
            disableHeightScroll
            id='OperationsTable'
            rowKey='id'
            ordered
            colorPrimary={PRIMARY_COLOR}
        />
    );
};

export default OperationList;
