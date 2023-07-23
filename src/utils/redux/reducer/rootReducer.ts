import { combineReducers, Reducer } from 'redux'
import avatarReducer from 'utils/redux/slices/avatarSlice'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import userReducer from 'utils/redux/slices/userSlice'
import chatReducer from 'utils/redux/slices/chatSlice'
import projectReducer from 'utils/redux/slices/projectSlice'

export type RootState = {
  avatar: ReturnType<typeof avatarReducer>
  chat: ReturnType<typeof chatReducer>
  notification: ReturnType<typeof notificationReducer>
  project: ReturnType<typeof projectReducer>
  ui: ReturnType<typeof userReducer>
}

/**
 * Combines all the reducers into a single rootReducer.
 */
const rootReducer: Reducer<RootState> = combineReducers({
  avatar: avatarReducer,
  chat: chatReducer,
  notification: notificationReducer,
  project: projectReducer,
  ui: userReducer,
})

export default rootReducer
