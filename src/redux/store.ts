import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import AuthSlice from '../modules/Auth/AuthApi/AuthSlice';
import { MainApi } from './api';

export const store = configureStore({
    reducer: {
        [MainApi.reducerPath]: MainApi.reducer,
        Auth: AuthSlice,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat([MainApi.middleware]),
});

export type AppThunkConfig = {
    state: RootState;
    dispatch: AppDispatch;
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
