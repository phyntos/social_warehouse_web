import { WorkflowVM } from '../../../common/ProWorkflow/ProWorkflow';
import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';
import { ActionVM, BaseDirectory, BaseVM, ContactVM, DirectoryVM, LogVM, ShopVM } from '../../../redux/types';

export type OperationListVM = {
    id: string;
    code: string;
    status: string;
    statusCode: OperationStatusCodes;
    shopName?: string;
    created: string;
};

export interface OperationVM extends BaseVM {
    id: string;
    code?: string;
    createdDate?: string;
    actionCode?: OperationActionCodes;
    contact?: ContactVM & {
        shop?: ShopVM;
    };
    reason?: string;
    shop?: ShopVM;
    status?: BaseDirectory;
    statusCode?: string;
    logs?: LogVM;
    actions?: ActionVM<OperationActionCodes>[];
    workflows?: WorkflowVM<OperationStatusCodes>[];
}

export type OperationListParams = {
    code?: string;
    status?: string;
    shopName?: string;
    createdAfter?: string;
    createdBefore?: string;
};

export type OperationDirectories = {
    statuses: DirectoryVM[];
};

export type OperationActionCodes =
    /// Продавец отправляет на Удалено
    | 'DELETE_AT_DRAFT'
    /// Клиент отправляет на Классификацию
    | 'SEND_TO_CONFIRMATION'
    /// Согласовать
    | 'CONFIRM';

export type OperationStatusCodes =
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

type OperationListPaginationResponse = PaginationResponse<OperationListVM>;
type OperationListPaginationParams = PaginationParams<OperationListParams>;

export const OperationApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getOperations: build.query<OperationListPaginationResponse, OperationListPaginationParams>({
                query: (params) => ({
                    url: '/operations',
                    method: 'GET',
                    params,
                }),
            }),
            createOperation: build.mutation<string, void>({
                query: () => ({
                    url: '/operations',
                    method: 'POST',
                }),
            }),
            postActionOperation: build.mutation<void, OperationVM>({
                query: () => ({
                    url: '/operations/action',
                    method: 'POST',
                }),
            }),
            getDirectories: build.query<OperationDirectories, void>({
                query: () => '/directories/appeal',
            }),
            getOperationById: build.query<OperationVM, string>({
                query: (id) => ({
                    url: '/operations/' + id,
                    method: 'GET',
                }),
                providesTags: (res, err, req) => [{ type: 'Operation', id: req }],
            }),
            updateOperation: build.mutation<void, OperationVM>({
                query: (body) => ({
                    url: '/operations',
                    method: 'PUT',
                    body,
                }),
                invalidatesTags: (res, err, req) => [{ type: 'Operation', id: req.id }],
            }),
        };
    },
});

export const {
    useLazyGetOperationsQuery,
    useGetDirectoriesQuery,
    useGetOperationByIdQuery,
    useCreateOperationMutation,
    usePostActionOperationMutation,
    useUpdateOperationMutation,
} = OperationApi;
