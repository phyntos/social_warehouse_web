import React from 'react';
import { useDirectoryEditableColumns } from '../../../common/Directory/DirectoryApi';
import EditableTable from '../../../common/EditableTable/EditableTable';

export type WarehousePositionVM = {
    id: string;
    name?: string;
    catalogId?: string;
    catalogName?: string;
    count?: number;
};

export type WarehousePositionParams = {
    warehouseId?: string;
    name?: string;
    count?: number;
};

const WarehousePosition = ({ id: warehouseId }: { id: string }) => {
    const catalogDirectoryColumns = useDirectoryEditableColumns<WarehousePositionVM, 'catalog'>('catalog', 'Товар');

    return (
        <EditableTable<WarehousePositionVM, WarehousePositionParams>
            columns={[
                ...catalogDirectoryColumns,
                {
                    dataIndex: 'count',
                    title: 'Количество',
                    valueType: 'text',
                    width: '30%',
                },
            ]}
            params={{ warehouseId }}
            type='warehousePositions'
        />
    );
};

export default WarehousePosition;
