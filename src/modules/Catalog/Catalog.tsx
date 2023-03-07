import React from 'react';
import { useDirectoryEditableColumns } from '../../common/Directory/DirectoryApi';
import EditableTable from '../../common/EditableTable/EditableTable';

export type CatalogVM = {
    id: string;
    name?: string;
    catalogGroupId?: string;
    catalogGroupName?: string;
};

export type CatalogParams = {
    name?: string;
    catalogGroupId?: string;
};

const Catalog = () => {
    const catalogGroupDirectoryColumns = useDirectoryEditableColumns<CatalogVM, 'catalogGroup'>(
        'catalogGroup',
        'Тип товара',
    );

    return (
        <EditableTable<CatalogVM, CatalogParams>
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Товар',
                    valueType: 'text',
                },
                ...catalogGroupDirectoryColumns,
            ]}
            type='catalogs'
        />
    );
};

export default Catalog;
