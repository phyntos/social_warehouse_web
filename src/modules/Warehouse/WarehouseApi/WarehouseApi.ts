import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';
import { BaseVM } from '../../../redux/types';

export interface WarehouseListVM extends BaseVM {
    id: string;
    name: string;
    address: string;
}

export type WarehouseListParams = {
    code?: string;
    status?: string;
    shopName?: string;
    createdAfter?: string;
    createdBefore?: string;
};

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
            getWarehouse: build.query<WarehouseListVM, string>({
                query: (id) => ({
                    url: '/warehouses/' + id,
                    method: 'GET',
                }),
            }),
        };
    },
});

export const { useLazyGetWarehousesQuery, useCreateWarehouseMutation, useGetWarehouseQuery } = WarehouseApi;
