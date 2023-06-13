import { combineReducers, Reducer } from 'redux'
import avatarReducer from 'utils/redux/slices/avatarSlice'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import userReducer from 'utils/redux/slices/userSlice'
import chatReducer from 'utils/redux/slices/chatSlice'

export type RootState = {
  avatar: ReturnType<typeof avatarReducer>
  ui: ReturnType<typeof userReducer>
  chat: ReturnType<typeof chatReducer>
  notification: ReturnType<typeof notificationReducer>
}

/**
 * Combines all the reducers into a single rootReducer.
 */
const rootReducer: Reducer<RootState> = combineReducers({
  avatar: avatarReducer,
  ui: userReducer,
  chat: chatReducer,
  notification: notificationReducer,
})

export default rootReducer
