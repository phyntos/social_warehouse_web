import React from 'react';
import { useParams } from 'react-router-dom';
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

const WarehousePosition = () => {
    const { id: warehouseId = '' } = useParams();
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
