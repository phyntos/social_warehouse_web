import { WorkflowVM } from '../../../common/ProWorkflow/ProWorkflow';
import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';
import { ActionVM, BaseDirectory, BaseVM, ContactVM, DirectoryVM, LogVM, ShopVM } from '../../../redux/types';

export type WarehouseListVM = {
    id: string;
    code: string;
    status: string;
    statusCode: WarehouseStatusCodes;
    shopName?: string;
    created: string;
};

export interface WarehouseVM extends BaseVM {
    id: string;
    code?: string;
    createdDate?: string;
    actionCode?: WarehouseActionCodes;
    contact?: ContactVM & {
        shop?: ShopVM;
    };
    reason?: string;
    shop?: ShopVM;
    status?: BaseDirectory;
    statusCode?: string;
    logs?: LogVM;
    actions?: ActionVM<WarehouseActionCodes>[];
    workflows?: WorkflowVM<WarehouseStatusCodes>[];
}

export type WarehouseListParams = {
    code?: string;
    status?: string;
    shopName?: string;
    createdAfter?: string;
    createdBefore?: string;
};

export type WarehouseDirectories = {
    statuses: DirectoryVM[];
};

export type WarehouseActionCodes =
    /// Продавец отправляет на Удалено
    | 'DELETE_AT_DRAFT'
    /// Клиент отправляет на Классификацию
    | 'SEND_TO_CONFIRMATION'
    /// Согласовать
    | 'CONFIRM';

export type WarehouseStatusCodes =
    /// черновик
    | 'DRAFT'
    /// удалено
    | 'DELETED'
    /// Согласование
    | 'CONFIRMATION'
    /// Завершен
    | 'CONFIRMED'
    /// Отказано клиентом
    | 'CLIENT_REJECTED';

type WarehouseListPaginationResponse = PaginationResponse<WarehouseListVM>;
type WarehouseListPaginationParams = PaginationParams<WarehouseListParams>;

export const WarehouseApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getWarehouses: build.query<WarehouseListPaginationResponse, WarehouseListPaginationParams>({
                query: (params) => ({
                    url: '/warehouses',
                    method: 'GET',
                    params,
                }),
            }),
            createWarehouse: build.mutation<string, void>({
                query: () => ({
                    url: '/warehouses',
                    method: 'POST',
                }),
            }),
            postActionWarehouse: build.mutation<void, WarehouseVM>({
                query: (body) => ({
                    url: '/warehouses/action',
                    method: 'POST',
                    body,
                }),
            }),
            getDirectories: build.query<WarehouseDirectories, void>({
                query: () => '/directories/appeal',
            }),
        };
    },
});

export const {
    useLazyGetWarehousesQuery,
    useGetDirectoriesQuery,
    useCreateWarehouseMutation,
    usePostActionWarehouseMutation,
} = WarehouseApi;
