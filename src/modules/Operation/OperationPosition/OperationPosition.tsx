import { ActionType } from '@ant-design/pro-components';
import React from 'react';
import { useDirectoryEditableColumns } from '../../../components/Directory/DirectoryApi';
import EditableTable from '../../../components/EditableTable/EditableTable';
import { numberNormalize } from '../../../functions';

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
    const catalogDirectoryColumns = useDirectoryEditableColumns<OperationPositionVM, 'catalog'>({
        type: 'catalog',
        title: 'Товар',
    });

    return (
        <EditableTable<OperationPositionVM, OperationPositionParams>
            actionRef={actionRef}
            columns={[
                ...catalogDirectoryColumns,
                {
                    dataIndex: 'count',
                    title: 'Количество',
                    valueType: 'text',
                    formItemProps: {
                        normalize: numberNormalize({ isInteger: true, isPositive: true }),
                    },
                    width: 100,
                },
            ]}
            params={{ operationId }}
            type='operationPositions'
        />
    );
};

export default OperationPosition;
