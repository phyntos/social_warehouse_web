import { ActionType } from '@ant-design/pro-components';
import { EditableProTabulator } from 'pro-tabulator';
import React from 'react';
import { PRIMARY_COLOR } from '../../../bootstrap';
import { getTableRequest } from '../../../functions';
import { AppealVM } from '../AppealApi/AppealApi';
import {
    AppealPositionParams,
    AppealPositionVM,
    useCreateAppealPositionMutation,
    useDeleteAppealPositionMutation,
    useLazyGetAppealPositionsQuery,
    useUpdateAppealPositionMutation,
} from '../AppealApi/AppealPositionApi';

const AppealPosition = ({
    appealId,
    appeal,
    actionRef,
}: {
    appealId: string;
    appeal?: AppealVM;
    actionRef?: React.MutableRefObject<ActionType | undefined> | undefined;
}) => {
    const [getAppealPositions] = useLazyGetAppealPositionsQuery();
    const [createAppealPosition] = useCreateAppealPositionMutation();
    const [updateAppealPositon] = useUpdateAppealPositionMutation();
    const [deleteAppealPositon] = useDeleteAppealPositionMutation();

    return (
        <EditableProTabulator<AppealPositionVM, AppealPositionParams>
            id='CatalogList'
            request={getTableRequest((params) => getAppealPositions(params).unwrap())}
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Товар',
                    valueType: 'text',
                    width: '30%',
                },
                {
                    dataIndex: 'count',
                    title: 'Количество',
                    valueType: 'text',
                    width: '30%',
                },
            ]}
            rowKey='id'
            ordered
            actionRef={actionRef}
            downloadProps={{
                fileName: 'Список товаров заявки №' + appeal?.code,
            }}
            disableHeightScroll
            colorPrimary={PRIMARY_COLOR}
            editableProps={{
                onCreate: async () => {
                    return await createAppealPosition(appealId).unwrap();
                },
                onDelete: async (id) => {
                    await deleteAppealPositon(String(id)).unwrap();
                },
                onSave: async (data) => {
                    await updateAppealPositon(data).unwrap();
                },
                hidden: {
                    actions: {
                        delete: true,
                    },
                    deleteMultiple: true,
                    saveMultiple: true,
                },
            }}
        />
    );
};

export default AppealPosition;
