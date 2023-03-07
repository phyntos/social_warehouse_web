import { PaginationParams, PaginationResponse } from '../../../functions';
import { MainApi } from '../../../redux/api';

export type AppealPositionVM = {
    id: string;
    name?: string;
    count?: number;
};

export type AppealPositionParams = {
    appealId?: string;
    name?: string;
    count?: number;
};

export type DirectoryVM = { label: string; value: string };

type AppealPositionPaginationResponse = PaginationResponse<AppealPositionVM>;
type AppealPositionPaginationParams = PaginationParams<AppealPositionParams>;

export const AppealPositionApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getAppealPositions: build.query<AppealPositionPaginationResponse, AppealPositionPaginationParams>({
                query: (params) => ({
                    url: '/appealPositions',
                    method: 'GET',
                    params,
                }),
            }),
            createAppealPosition: build.mutation<string, string>({
                query: (appealId) => ({
                    url: '/appealPositions',
                    method: 'POST',
                    body: { appealId },
                }),
            }),
            updateAppealPosition: build.mutation<void, AppealPositionVM>({
                query: (body) => ({
                    url: '/appealPositions',
                    method: 'PUT',
                    body,
                }),
            }),
            deleteAppealPosition: build.mutation<void, string>({
                query: (id) => ({
                    url: '/appealPositions/' + id,
                    method: 'DELETE',
                }),
            }),
        };
    },
});

export const {
    useLazyGetAppealPositionsQuery,
    useCreateAppealPositionMutation,
    useUpdateAppealPositionMutation,
    useDeleteAppealPositionMutation,
} = AppealPositionApi;
