import { combineReducers, Reducer } from 'redux'
import avatarReducer from 'utils/redux/slices/avatarSlice'
import calendarReducer from 'utils/redux/slices/calendarSlice'
import chatReducer from 'utils/redux/slices/chatSlice'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import projectReducer from 'utils/redux/slices/projectSlice'
import userReducer from 'utils/redux/slices/userSlice'
import snackBarSlice from './slices/snackBarSlice'

export type RootState = {
  avatar: ReturnType<typeof avatarReducer>
  calendar: ReturnType<typeof calendarReducer>
  chat: ReturnType<typeof chatReducer>
  notification: ReturnType<typeof notificationReducer>
  project: ReturnType<typeof projectReducer>
  snackBar: ReturnType<typeof snackBarSlice>
  ui: ReturnType<typeof userReducer>
}

/**
 * Combines all the reducers into a single rootReducer.
 */
const rootReducer: Reducer<RootState> = combineReducers({
  avatar: avatarReducer,
  calendar: calendarReducer,
  chat: chatReducer,
  notification: notificationReducer,
  project: projectReducer,
  ui: userReducer,
  snackBar: snackBarSlice,
})

export default rootReducer
