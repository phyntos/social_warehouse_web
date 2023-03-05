import { MainApi } from '../../../redux/api';
import { setToken } from './AuthSlice';

export type LoginVM = {
    login: string;
    password: string;
};

export const AppealApi = MainApi.injectEndpoints({
    endpoints: (build) => {
        return {
            login: build.mutation<{ crmToken: string }, LoginVM>({
                query: (body) => ({
                    url: '/account/login',
                    method: 'POST',
                    body,
                }),
                onQueryStarted: async (arg, api) => {
                    const response = await api.queryFulfilled;
                    api.dispatch(setToken(response.data.crmToken));
                },
            }),
        };
    },
});

export const { useLoginMutation } = AppealApi;
