import { ActionType } from '@ant-design/pro-components';
import { EditableProTabulator } from 'pro-tabulator';
import { ProTabulatorColumn } from 'pro-tabulator/dist/types';
import React from 'react';
import { PRIMARY_COLOR } from '../../bootstrap';
import { getTableRequest } from '../../functions';
import {
    EditableTableTypes,
    useCreateEditableItem,
    useDeleteEditableItem,
    useGetEditableTable,
    useUpdateEditableItem,
} from './EditableTableApi';

const EditableTable = <EditableTableVM extends Record<string, any>, EditableTableParams extends Record<string, any>>({
    type,
    params = {} as EditableTableParams,
    columns,
    actionRef,
    hiddenProps,
}: {
    type: EditableTableTypes;
    params?: EditableTableParams;
    columns: ProTabulatorColumn<EditableTableVM>[];
    actionRef?: React.MutableRefObject<ActionType | undefined> | undefined;
    hiddenProps?:
        | {
              create?: boolean | undefined;
              saveMultiple?: boolean | undefined;
              deleteMultiple?: boolean | undefined;
              actions?:
                  | true
                  | {
                        edit?: boolean | undefined;
                        delete?: boolean | undefined;
                    }
                  | undefined;
          }
        | undefined;
}) => {
    const getEditableTables = useGetEditableTable<EditableTableVM, EditableTableParams>(type);
    const createEditableTable = useCreateEditableItem<EditableTableParams>(type);
    const updateEditableTable = useUpdateEditableItem<EditableTableVM>(type);
    const deleteEditableTable = useDeleteEditableItem(type);

    return (
        <EditableProTabulator<EditableTableVM, EditableTableParams>
            id={'EditableTableList' + type}
            disableStorage
            request={getTableRequest((params) => getEditableTables(params))}
            columns={columns}
            params={params}
            actionRef={actionRef}
            rowKey='id'
            ordered
            downloadProps={{
                fileName: 'Список товаров',
            }}
            scroll={{ x: 1400 }}
            disableHeightScroll
            colorPrimary={PRIMARY_COLOR}
            editableProps={{
                onCreate: async () => {
                    return await createEditableTable(params);
                },
                onDelete: async (id) => {
                    await deleteEditableTable(String(id));
                },
                onSave: async (data) => {
                    await updateEditableTable(data);
                },
                hidden: {
                    deleteMultiple: true,
                    saveMultiple: true,
                    ...hiddenProps,
                },
            }}
        />
    );
};

export default EditableTable;
