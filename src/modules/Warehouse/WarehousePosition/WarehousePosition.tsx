import React from 'react';
import { useDirectoryEditableColumns } from '../../../components/Directory/DirectoryApi';
import EditableTable from '../../../components/EditableTable/EditableTable';
import { numberNormalize } from '../../../functions';

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
    const catalogDirectoryColumns = useDirectoryEditableColumns<WarehousePositionVM, 'catalog'>({
        type: 'catalog',
        title: 'Товар',
    });

    return (
        <EditableTable<WarehousePositionVM, WarehousePositionParams>
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
            params={{ warehouseId }}
            type='warehousePositions'
        />
    );
};

export default WarehousePosition;
