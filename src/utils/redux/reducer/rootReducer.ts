import { combineReducers, Reducer } from 'redux'
import avatarReducer from '../slices/avatarSlice'
import notificationReducer from '../slices/notificationSlice'
import userReducer from '../slices/userSlice'

export type RootState = {
  avatar: ReturnType<typeof avatarReducer>
  ui: ReturnType<typeof userReducer>
  notification: ReturnType<typeof notificationReducer>
}

/**
 * Combines all the reducers into a single rootReducer.
 */
const rootReducer: Reducer<RootState> = combineReducers({
  avatar: avatarReducer,
  ui: userReducer,
  notification: notificationReducer,
})

export default rootReducer
