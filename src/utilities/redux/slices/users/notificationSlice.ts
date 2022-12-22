import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationInitialState } from '../../../data/notificationConstants';
import { NotificationInterface } from '../../../types/NotificationInterface';

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    addNotification: (_state, action: PayloadAction<NotificationInterface>) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({ ...state, open: false }),
  },
});

export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;
