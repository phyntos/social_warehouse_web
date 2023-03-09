import React from 'react';
import { useDirectoryEditableColumns } from '../../../components/Directory/DirectoryApi';
import EditableTable from '../../../components/EditableTable/EditableTable';
import { numberNormalize } from '../../../functions';

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
    const catalogDirectoryColumns = useDirectoryEditableColumns<ShopPositionVM, 'catalog'>({
        type: 'catalog',
        title: 'Товар',
    });

    return (
        <EditableTable<ShopPositionVM, ShopPositionParams>
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
            params={{ shopId }}
            type='shopPositions'
        />
    );
};

export default ShopPosition;
