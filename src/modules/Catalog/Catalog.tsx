import React from 'react';
import { useDirectoryEditableColumns } from '../../components/Directory/DirectoryApi';
import EditableTable from '../../components/EditableTable/EditableTable';

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
    const catalogGroupDirectoryColumns = useDirectoryEditableColumns<CatalogVM, 'catalogGroup'>({
        type: 'catalogGroup',
        title: 'Тип товара',
    });

    return (
        <EditableTable<CatalogVM, CatalogParams>
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Товар',
                    width: 200,
                    valueType: 'text',
                },
                ...catalogGroupDirectoryColumns,
            ]}
            type='catalogs'
        />
    );
};

export default Catalog;
