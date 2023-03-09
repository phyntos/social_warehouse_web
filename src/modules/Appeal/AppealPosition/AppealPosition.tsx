import { ActionType } from '@ant-design/pro-components';
import { ProTabulatorColumn } from 'pro-tabulator/dist/types';
import React from 'react';
import { useDirectoryEditableColumns, useGetDirectoryQuery } from '../../../components/Directory/DirectoryApi';
import EditableTable from '../../../components/EditableTable/EditableTable';
import { numberNormalize } from '../../../functions';
import useAppealAccess from '../AppealAccess/useAppealAccess';

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

    const { readWarehouseColumns, writeWarehouseColumns, writeCatalogColumns } = useAppealAccess(
        'WarehouseColumns',
        'CatalogColumns',
    );

    const warehouseDirectoryColumns = useDirectoryEditableColumns<AppealPositionVM, 'warehouse'>({
        type: 'warehouse',
        title: 'Используемый склад',
        write: writeWarehouseColumns,
        read: readWarehouseColumns,
    });
    const catalogDirectoryColumns = useDirectoryEditableColumns<AppealPositionVM, 'catalog'>({
        type: 'catalog',
        title: 'Товар',
        write: writeCatalogColumns,
    });

    const warehouseColumns: ProTabulatorColumn<AppealPositionVM>[] = (warehouses || []).map((warehouse, index) => ({
        dataIndex: warehouse.value + index,
        title: warehouse.label + ' (в наличии)',
        width: 100,
        render: (text, record) => {
            const find = record.warehouseCounts?.find((x) => x.id === warehouse.value);
            if (find) return find.count;
            return 'Не определено';
        },
        editable: false,
        hideInTable: !readWarehouseColumns,
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
                    formItemProps: {
                        normalize: numberNormalize({ isInteger: true, isPositive: true }),
                    },
                    width: 100,
                    editable: !writeCatalogColumns ? false : undefined,
                },
            ]}
            params={{ appealId }}
            type='appealPositions'
            hiddenProps={{
                actions: (!writeCatalogColumns && !writeWarehouseColumns) || {
                    delete: !writeCatalogColumns,
                    edit: false,
                },
                create: !writeCatalogColumns,
                // deleteMultiple: !writeCatalogColumns,
                // saveMultiple: !writeCatalogColumns && !writeWarehouseColumns,
            }}
        />
    );
};

export default AppealPosition;
