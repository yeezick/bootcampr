import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import userReducer from 'utils/redux/slices/userSlice'
import chatReducer from 'utils/redux/slices/chatSlice'

export const store = configureStore({
  reducer: {
    ui: userReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
