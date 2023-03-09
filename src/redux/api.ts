import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import qs from 'qs';
import { selectToken } from '../modules/Auth/AuthApi/AuthSlice';
import { RootState } from './store';

export interface ActionMethodResult<T> {
    isSuccessed: boolean;
    code: string;
    title: string;
    text: string;
    data: T;
    exception: any;
}

const getBaseUrl = () => {
    let url = window.location.host;

    if (url.includes('3004')) url = 'localhost:8001';

    return 'https://' + url + '/api';
};

const commonQuery = fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = selectToken(state);
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    },
});

const showNotification = (
    data: ActionMethodResult<any>,
    status?: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR',
) => {
    const config: ArgsProps = { message: '' };

    if (data.title) {
        config.message = data?.title;
        if (data.text) {
            config.description = data?.text;
        }
    } else if (data.text) {
        config.message = data?.text;
    }

    if (data.code === 'SUCCESS' && data.isSuccessed) {
        notification.success(config);
    } else {
        if (!config.message) {
            config.message = 'Произошла ошибка';
            config.description = 'Код ошибки: ' + status;
        }
        notification.error(config);
    }
};

// type EndPoints = 'login';

// const mockQuery = (
//     endpoint: EndPoints,
// ): QueryReturnValue<ActionMethodResult<any>, FetchBaseQueryError, FetchBaseQueryMeta> => {
//     switch (endpoint) {
//         case 'login':
//             return {
//                 data: {
//                     code: 'SUCCESS',
//                     isSuccessed: true,
//                     data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b3Mtb3BlcmF0b3JAYWlrZXkua3oiLCJqdGkiOiI5NjZhZjJhMS0yYjdiLTQ0YWEtYTlmZS04YzNiMGIxZjExMDUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE2NTNhM2QyLTQ3NmItNDdlOC04NjdkLTY0NDFjNDNlZjVjOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRPUy1vcGVyYXRvciIsInJvbGUiOiJUT1Mtb3BlcmF0b3IiLCJ1c2VySWQiOiJhNjUzYTNkMi00NzZiLTQ3ZTgtODY3ZC02NDQxYzQzZWY1YzkiLCJmdWxsbmFtZSI6InRvcyBvcGVyYXRvciIsInJlZnJlc2hfdG9rZW4iOiIxMTE0ZDE3MjcyNDU0NmViOGQ5OWJlZmM0OTU4MjkzZCIsImNvbXBhbnlJZCI6IiIsImlyc1Rva2VuIjoiIiwic3Vic2l0dXRpb25Sb2xlIjoiICIsImV4cCI6MTY3ODA0MzM3MCwiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.FpRk6nfahKtDLWf8ghdCMLp_AoBQuXVdNT514hPLb2M',
//                     exception: '',
//                     text: '',
//                     title: '',
//                 },
//             };
//     }
// };

export const baseQuery: typeof commonQuery = async (args, api, extraOptions) => {
    const result = (await commonQuery(args, api, extraOptions)) as QueryReturnValue<
        ActionMethodResult<any>,
        FetchBaseQueryError,
        FetchBaseQueryMeta
    >;
    // const result = mockQuery(api.endpoint as EndPoints);
    if (result.data) {
        if (result.data.code === 'SUCCESS' && result.data.isSuccessed) {
            if (result.data.text) showNotification(result.data);
            result.data = result.data.data;
        } else {
            /* @ts-ignore */
            result.error = { data: result.data, status: 400 };
            /* @ts-ignore */
            result.data = undefined;
        }
    }

    if (result.error) showNotification(result.error.data as ActionMethodResult<any>, result.error.status);

    return result;
};

export const MainApi = createApi({
    reducerPath: 'MainApi',
    tagTypes: ['Appeal', 'Operation'],
    baseQuery,
    endpoints: () => ({}),
});
