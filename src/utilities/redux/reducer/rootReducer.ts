/**
 * Imports required dependencies and combines reducers into a single rootReducer.
 */
import { combineReducers } from '@reduxjs/toolkit'
import avatarReducer from '../slices/avatarSlice'
import notificationReducer from '../slices/notificationSlice'
import userReducer from '../slices/userSlice'
import profileReducer from '../slices/profileSlice'

/**
 * Combines all the reducers into a single rootReducer.
 */
const rootReducer = combineReducers({
  avatar: avatarReducer,
  profile: profileReducer,
  ui: userReducer,
  notification: notificationReducer,
})

/**
 * RootState type is defined as the return type of rootReducer.
 */
export type RootState = ReturnType<typeof rootReducer>

/**
 * Exports the rootReducer.
 */
export default rootReducer
