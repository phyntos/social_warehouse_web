import { ProTabulatorColumn } from 'pro-tabulator/dist/types';
import { MainApi } from '../../redux/api';
import { DirectoryVM } from '../../redux/types';

export type DirectoryTypes = 'catalogGroup' | 'catalog' | 'warehouse' | 'shop';

export const DirectoryAPI = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getDirectory: build.query<DirectoryVM[], { type: DirectoryTypes; text?: string }>({
                query: ({ text, type }) => ({
                    url: '/directories/search/ant/' + type + 's',
                    params: {
                        text,
                    },
                }),
            }),
        };
    },
});

export const { useLazyGetDirectoryQuery, useGetDirectoryQuery } = DirectoryAPI;

type DirectoryTableVM<Type extends DirectoryTypes> = {
    [key in `${Type}Id` | `${Type}Name`]?: string;
};

export const useDirectoryEditableColumns = <TableVM extends Record<string, any>, Type extends DirectoryTypes>({
    type,
    title,
    write = true,
    read = true,
}: {
    type: Type;
    title: string;
    write?: boolean;
    read?: boolean;
}): ProTabulatorColumn<TableVM & DirectoryTableVM<Type>>[] => {
    const [getDirectory] = useLazyGetDirectoryQuery();

    if (!read) return [];

    if (!write)
        return [
            {
                dataIndex: type + 'Name',
                title: title,
                valueType: 'text',
                width: 200,
                useForUpload: true,
                editable: false,
            },
        ];

    return [
        {
            dataIndex: type + 'Id',
            title: title,
            valueType: 'text',
            hideInTable: true,
        },
        {
            dataIndex: type + 'Id',
            title: title,
            valueType: 'select',
            width: 200,
            useForUpload: true,
            hideInSearch: true,
            render: (text, record) => record[`${type}Name`],
            excelRender: (text, record) => record[`${type}Name`],
            request: async ({ keyWords }) => {
                return await getDirectory({ text: keyWords, type }).unwrap();
            },
            fieldProps: {
                showSearch: true,
            },
        },
    ];
};
