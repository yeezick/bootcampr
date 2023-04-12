import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import notificationReducer from './slices/notificationSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    ui: userReducer,
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
