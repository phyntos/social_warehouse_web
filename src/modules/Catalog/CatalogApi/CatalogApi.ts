import { ModalField } from '../../../common/ProHeader/ProHeader';
import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';

export type CatalogListVM = {
    id: string;
};

export type ActionVM = {
    code: string;
    name: string;
    modalFields: ModalField[];
};
export type CatalogVM = {
    id: string;
    code: string;
    createdDate: string;
    actions: ActionVM[];
};

export type CatalogListParams = {
    id: string;
};

export type DirectoryVM = { label: string; value: string };

export type CatalogDirectories = {
    statuses: DirectoryVM[];
};

type CatalogListPaginationResponse = PaginationResponse<CatalogListVM>;
type CatalogListPaginationParams = PaginationParams<CatalogListParams>;

export const CatalogApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getCatalogs: build.query<CatalogListPaginationResponse, CatalogListPaginationParams>({
                query: (params) => ({
                    url: '/catalogs',
                    method: 'GET',
                    params,
                }),
            }),
            getDirectories: build.query<CatalogDirectories, void>({
                query: () => '/directories/deliveryOrder',
            }),
        };
    },
});

export const { useLazyGetCatalogsQuery, useGetDirectoriesQuery } = CatalogApi;
