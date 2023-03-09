import { WorkflowVM } from '../../../common/ProWorkflow/ProWorkflow';
import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';
import { ActionVM, BaseDirectory, BaseVM, ContactVM, DirectoryVM, LogVM, ShopVM } from '../../../redux/types';

export type AppealListVM = {
    id: string;
    code: string;
    status: string;
    statusCode: AppealStatusCodes;
    shopName?: string;
    created: string;
};

export interface AppealVM extends BaseVM {
    id: string;
    code?: string;
    createdDate?: string;
    actionCode?: AppealActionCodes;
    contact?: ContactVM & {
        shop?: ShopVM;
    };
    reason?: string;
    shop?: ShopVM;
    status?: BaseDirectory;
    statusCode?: AppealStatusCodes;
    logs?: LogVM;
    actions?: ActionVM<AppealActionCodes>[];
    workflows?: WorkflowVM<AppealStatusCodes>[];
}

export type AppealListParams = {
    code?: string;
    status?: string;
    shopName?: string;
    createdAfter?: string;
    createdBefore?: string;
};

export type AppealDirectories = {
    statuses: DirectoryVM[];
};

export type AppealActionCodes =
    /// Продавец отправляет на Удалено
    | 'DELETE_AT_DRAFT'
    /// Клиент отправляет на Классификацию
    | 'SEND_TO_CONFIRMATION'
    /// Согласовать
    | 'CONFIRM';

export type AppealStatusCodes =
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

type AppealListPaginationResponse = PaginationResponse<AppealListVM>;
type AppealListPaginationParams = PaginationParams<AppealListParams>;

export const AppealApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getAppeals: build.query<AppealListPaginationResponse, AppealListPaginationParams>({
                query: (params) => ({
                    url: '/appeals',
                    method: 'GET',
                    params,
                }),
            }),
            createAppeal: build.mutation<string, void>({
                query: () => ({
                    url: '/appeals',
                    method: 'POST',
                }),
            }),
            postActionAppeal: build.mutation<void, AppealVM>({
                query: (body) => ({
                    url: '/appeals/action',
                    method: 'POST',
                    body,
                }),
            }),
            getDirectories: build.query<AppealDirectories, void>({
                query: () => '/directories/appeal',
            }),
            getAppealById: build.query<AppealVM, string>({
                query: (id) => ({
                    url: '/appeals/' + id,
                    method: 'GET',
                }),
                providesTags: (res, err, req) => [{ type: 'Appeal', id: req }],
            }),
            updateAppeal: build.mutation<void, AppealVM>({
                query: (body) => ({
                    url: '/appeals',
                    method: 'PUT',
                    body,
                }),
                invalidatesTags: (res, err, req) => [{ type: 'Appeal', id: req.id }],
            }),
        };
    },
});

export const {
    useLazyGetAppealsQuery,
    useGetDirectoriesQuery,
    useGetAppealByIdQuery,
    useCreateAppealMutation,
    usePostActionAppealMutation,
    useUpdateAppealMutation,
} = AppealApi;
