import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { Roles } from '../../../redux/types';

type AuthStateType = {
    token: string | null;
    tokenData: AuthTokenData;
};

export const getToken = () => {
    const sessionToken = sessionStorage.getItem('token');
    return sessionToken;
};

interface AuthTokenData {
    sub: string | null; // userName
    jti: string | null; // custom guid
    aud: string | null;
    exp: number | null;
    iss: string | null;
    role: Roles | null;
    userId: string | null;
    fullname: string | null;
    refresh_token: string | null;
    expires: string | null; // expires datetime
}

export const getTokenData = (token: string | null): AuthTokenData => {
    if (!token)
        return {
            sub: null,
            jti: null,
            aud: null,
            exp: null,
            iss: null,
            role: null,
            userId: null,
            fullname: null,
            refresh_token: null,
            expires: null,
        };

    return jwt_decode<AuthTokenData>(token);
};

const AuthState: AuthStateType = {
    token: sessionStorage.getItem('token'),
    tokenData: getTokenData(sessionStorage.getItem('token')),
};

const AuthSlice = createSlice<
    AuthStateType,
    {
        setToken: (
            state: AuthStateType,
            action: {
                payload: string | null;
            },
        ) => void;
    },
    'Auth'
>({
    name: 'Auth',
    initialState: AuthState,
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload;
            state.tokenData = getTokenData(payload);
            if (payload === null) {
                sessionStorage.clear();
            } else {
                sessionStorage.setItem('token', payload);
            }
        },
    },
});

export const selectToken = (state: RootState) => state.Auth.token;

export const selectTokenData =
    <T extends keyof AuthTokenData>(key: T) =>
    (state: RootState): AuthTokenData[T] | null =>
        state.Auth.tokenData?.[key] || null;

export const useToken = () => {
    const token = useAppSelector(selectToken);
    return token;
};

export const useTokenData = <T extends keyof AuthTokenData>(key: T): AuthTokenData[T] | null => {
    const token = useAppSelector(selectTokenData(key));
    return token;
};

export const { setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
