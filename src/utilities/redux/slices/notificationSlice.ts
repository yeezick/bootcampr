import { useDispatch } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notificationInitialState } from 'utilities/data/notificationConstants'
import { NotificationState } from 'interfaces/NotificationInterface'

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    addNotification: (_state, action: PayloadAction<NotificationState>) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: _state => ({ ..._state, open: false }),
  },
})

export const useNotification = () => {
  const dispatch = useDispatch()
  const displayNotification = (notification: NotificationState) =>
    dispatch(NotificationActions.addNotification(notification))
  const clearNotification = () =>
    dispatch(NotificationActions.clearNotification())
  return { displayNotification, clearNotification } as const
}

export const NotificationActions = NotificationSlice.actions
export default NotificationSlice.reducer
