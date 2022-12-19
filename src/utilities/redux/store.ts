import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { NotificationReducers } from './slices/users/notificationSlice';
import userSlice from './slices/users/userSlice';

export const store = configureStore({
  reducer: {
    ui: userSlice,
    notification: NotificationReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
