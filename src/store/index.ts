import { useDispatch } from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import imgsReducer from 'features/image/imageSlice';
import domainReducer from 'features/domain/domainSlice';

// getDefaultMiddleware - Redux Toolkit 참고

export const store = configureStore({
    reducer: {
        // 리듀서 들을 정의합니다.
        user: userReducer,
        imgs: imgsReducer,
        domain: domainReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production', // devTool 의 옵션을 선택합니다.
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
