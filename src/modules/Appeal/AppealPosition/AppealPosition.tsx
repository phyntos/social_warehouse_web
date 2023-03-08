import { ActionType } from '@ant-design/pro-components';
import { ProTabulatorColumn } from 'pro-tabulator/dist/types';
import React from 'react';
import { useDirectoryEditableColumns, useGetDirectoryQuery } from '../../../common/Directory/DirectoryApi';
import EditableTable from '../../../common/EditableTable/EditableTable';

export type AppealPositionVM = {
    id: string;
    name?: string;
    count?: number;
    warehouseId?: string;
    warehouseName?: string;
    catalogId?: string;
    catalogName?: string;
    warehouseCounts?: { id: string; count: string }[];
};

export type AppealPositionParams = {
    appealId?: string;
    name?: string;
    count?: number;
};

const AppealPosition = ({
    appealId,
    actionRef,
}: {
    appealId: string;
    actionRef?: React.MutableRefObject<ActionType | undefined> | undefined;
}) => {
    const { data: warehouses } = useGetDirectoryQuery({ type: 'warehouse' });
    const warehouseDirectoryColumns = useDirectoryEditableColumns<AppealPositionVM, 'warehouse'>(
        'warehouse',
        'Склад (с)',
    );
    const catalogDirectoryColumns = useDirectoryEditableColumns<AppealPositionVM, 'catalog'>('catalog', 'Товар');

    const warehouseColumns: ProTabulatorColumn<AppealPositionVM>[] = (warehouses || []).map((warehouse, index) => ({
        dataIndex: warehouse.value + index,
        title: warehouse.label,
        width: 100,
        render: (text, record) => {
            const find = record.warehouseCounts?.find((x) => x.id === warehouse.value);
            if (find) return find.count;
            return 'Не определено';
        },
        editable: false,
    }));

    return (
        <EditableTable<AppealPositionVM, AppealPositionParams>
            actionRef={actionRef}
            columns={[
                ...warehouseDirectoryColumns,
                ...catalogDirectoryColumns,
                ...warehouseColumns,
                {
                    dataIndex: 'count',
                    title: 'Количество',
                    valueType: 'text',
                    width: '30%',
                },
            ]}
            params={{ appealId }}
            type='appealPositions'
        />
    );
};

export default AppealPosition;
