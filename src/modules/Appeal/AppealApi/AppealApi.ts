import { ModalField } from '../../../common/ProHeader/ProHeader';
import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';

export type AppealListVM = {
    id: string;
};

export type ActionVM = {
    code: string;
    name: string;
    modalFields: ModalField[];
};
export type AppealVM = {
    id: string;
    code: string;
    createdDate: string;
    actions: ActionVM[];
};

export type AppealListParams = {
    id: string;
};

export type DirectoryVM = { label: string; value: string };

export type AppealDirectories = {
    statuses: DirectoryVM[];
};

type AppealListPaginationResponse = PaginationResponse<AppealListVM>;
type AppealListPaginationParams = PaginationParams<AppealListParams>;

export const AppealApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getAppeals: build.query<AppealListPaginationResponse, AppealListPaginationParams>({
                query: (params) => ({
                    url: '/deliveryOrder',
                    method: 'GET',
                    params,
                }),
            }),
            getDirectories: build.query<AppealDirectories, void>({
                query: () => '/directories/deliveryOrder',
            }),
            getAppealById: build.query<AppealVM, string>({
                query: (id) => ({
                    url: '/deliveryOrder/' + id,
                    method: 'GET',
                }),
                providesTags: (res, err, req) => [{ type: 'Appeal', id: req }],
            }),
        };
    },
});

export const { useLazyGetAppealsQuery, useGetDirectoriesQuery, useGetAppealByIdQuery } = AppealApi;
