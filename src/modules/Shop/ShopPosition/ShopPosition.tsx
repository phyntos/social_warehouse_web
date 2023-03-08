import React from 'react';
import { useDirectoryEditableColumns } from '../../../common/Directory/DirectoryApi';
import EditableTable from '../../../common/EditableTable/EditableTable';

export type ShopPositionVM = {
    id: string;
    name?: string;
    catalogId?: string;
    catalogName?: string;
    count?: number;
};

export type ShopPositionParams = {
    shopId?: string;
    name?: string;
    count?: number;
};

const ShopPosition = ({ id: shopId }: { id: string }) => {
    const catalogDirectoryColumns = useDirectoryEditableColumns<ShopPositionVM, 'catalog'>('catalog', 'Товар');

    return (
        <EditableTable<ShopPositionVM, ShopPositionParams>
            columns={[
                ...catalogDirectoryColumns,
                {
                    dataIndex: 'count',
                    title: 'Количество',
                    valueType: 'text',
                    width: '30%',
                },
            ]}
            params={{ shopId }}
            type='shopPositions'
        />
    );
};

export default ShopPosition;
