import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';
import { BaseVM } from '../../../redux/types';

export interface ShopListVM extends BaseVM {
    id: string;
    name: string;
    address: string;
}

export type ShopListParams = {
    code?: string;
    status?: string;
    shopName?: string;
    createdAfter?: string;
    createdBefore?: string;
};

type ShopListPaginationResponse = PaginationResponse<ShopListVM>;
type ShopListPaginationParams = PaginationParams<ShopListParams>;

export const ShopApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getShops: build.query<ShopListPaginationResponse, ShopListPaginationParams>({
                query: (params) => ({
                    url: '/shops',
                    method: 'GET',
                    params,
                }),
            }),
            createShop: build.mutation<string, void>({
                query: () => ({
                    url: '/shops',
                    method: 'POST',
                }),
            }),
            getShop: build.query<ShopListVM, string>({
                query: (id) => ({
                    url: '/shops/' + id,
                    method: 'GET',
                }),
            }),
        };
    },
});

export const { useLazyGetShopsQuery, useCreateShopMutation, useGetShopQuery } = ShopApi;
