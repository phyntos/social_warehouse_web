import { ActionType } from '@ant-design/pro-components';
import React from 'react';
import { useDirectoryEditableColumns } from '../../../common/Directory/DirectoryApi';
import EditableTable from '../../../common/EditableTable/EditableTable';

export type OperationPositionVM = {
    id: string;
    name?: string;
    catalogId?: string;
    catalogName?: string;
    count?: number;
};

export type OperationPositionParams = {
    operationId?: string;
    name?: string;
    count?: number;
};

const OperationPosition = ({
    operationId,
    actionRef,
}: {
    operationId: string;
    actionRef?: React.MutableRefObject<ActionType | undefined> | undefined;
}) => {
    const catalogDirectoryColumns = useDirectoryEditableColumns<OperationPositionVM, 'catalog'>('catalog', 'Товар');

    return (
        <EditableTable<OperationPositionVM, OperationPositionParams>
            actionRef={actionRef}
            columns={[
                ...catalogDirectoryColumns,
                {
                    dataIndex: 'count',
                    title: 'Количество',
                    valueType: 'text',
                    width: '30%',
                },
            ]}
            params={{ operationId }}
            type='operationPositions'
        />
    );
};

export default OperationPosition;
