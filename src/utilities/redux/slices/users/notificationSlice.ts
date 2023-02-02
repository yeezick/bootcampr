import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationInitialState } from '../../../data/notificationConstants';
import { NotificationState } from '../../../types/NotificationInterface';

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    addNotification: (_state, action: PayloadAction<NotificationState>) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (_state) => ({ ..._state, open: false }),
  },
});

export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;
