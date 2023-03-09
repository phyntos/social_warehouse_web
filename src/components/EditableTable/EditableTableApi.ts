import { PaginationParams, PaginationResponse } from '../../functions';
import { MainApi } from '../../redux/api';

type EditableTablePaginationResponse = PaginationResponse<Record<string, any>>;
type EditableTablePaginationParams = EditableTableResponse<PaginationParams<Record<string, any>>>;

export type EditableTableTypes =
    | 'warehousePositions'
    | 'appealPositions'
    | 'catalogs'
    | 'shopPositions'
    | 'operationPositions';

type EditableTableResponse<Data> = {
    type: EditableTableTypes;
    data: Data;
};

export const EditableTableApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getEditableTables: build.query<EditableTablePaginationResponse, EditableTablePaginationParams>({
                query: ({ data, type }) => ({
                    url: '/' + type,
                    method: 'GET',
                    params: data,
                }),
            }),
            createEditableItem: build.mutation<string, EditableTableResponse<Record<string, any>>>({
                query: ({ data, type }) => ({
                    url: '/' + type,
                    method: 'POST',
                    body: data,
                }),
            }),
            updateEditableItem: build.mutation<void, EditableTableResponse<Record<string, any>>>({
                query: ({ data, type }) => ({
                    url: '/' + type,
                    method: 'PUT',
                    body: data,
                }),
            }),
            deleteEditableItem: build.mutation<void, EditableTableResponse<string>>({
                query: ({ data, type }) => ({
                    url: '/' + type + '/' + data,
                    method: 'DELETE',
                }),
            }),
        };
    },
});

const {
    useLazyGetEditableTablesQuery,
    useCreateEditableItemMutation,
    useUpdateEditableItemMutation,
    useDeleteEditableItemMutation,
} = EditableTableApi;

export const useGetEditableTable = <EditableTableVM extends Record<string, any>, EditableTableParams>(
    type: EditableTableTypes,
) => {
    const [getEditableTables] = useLazyGetEditableTablesQuery();

    return async (data: PaginationParams<EditableTableParams>) => {
        const response = await getEditableTables({ type, data }).unwrap();
        return response as PaginationResponse<EditableTableVM>;
    };
};

export const useCreateEditableItem = <EditableCreateParams extends Record<string, any>>(type: EditableTableTypes) => {
    const [createEditableItem] = useCreateEditableItemMutation();

    return async (data: EditableCreateParams) => {
        const response = await createEditableItem({ type, data }).unwrap();
        return response;
    };
};

export const useUpdateEditableItem = <EditableItem extends Record<string, any>>(type: EditableTableTypes) => {
    const [updateEditableItem] = useUpdateEditableItemMutation();

    return async (data: EditableItem) => {
        const response = await updateEditableItem({ type, data }).unwrap();
        return response;
    };
};

export const useDeleteEditableItem = (type: EditableTableTypes) => {
    const [updateEditableItem] = useDeleteEditableItemMutation();

    return async (data: string) => {
        const response = await updateEditableItem({ type, data }).unwrap();
        return response;
    };
};
