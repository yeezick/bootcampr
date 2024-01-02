import { combineReducers, Reducer } from 'redux'
import calendarReducer from 'utils/redux/slices/calendarSlice'
import chatReducer from 'utils/redux/slices/chatSlice'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import projectReducer from 'utils/redux/slices/projectSlice'
import userReducer from 'utils/redux/slices/userSlice'
import snackBarSlice from './slices/snackBarSlice'
import userInterfaceReducer from './slices/userInterfaceSlice'
import taskBoardSlice from './slices/taskBoardSlice'

export type RootState = {
  calendar: ReturnType<typeof calendarReducer>
  chat: ReturnType<typeof chatReducer>
  notification: ReturnType<typeof notificationReducer>
  project: ReturnType<typeof projectReducer>
  snackBar: ReturnType<typeof snackBarSlice>
  taskBoard: ReturnType<typeof taskBoardSlice>
  ui: ReturnType<typeof userReducer> // todo: rename to user
  userInterface: ReturnType<typeof userInterfaceReducer>
}

/**
 * Combines all the reducers into a single rootReducer.
 */
const rootReducer: Reducer<RootState> = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  notification: notificationReducer,
  project: projectReducer,
  snackBar: snackBarSlice,
  taskBoard: taskBoardSlice,
  ui: userReducer,
  userInterface: userInterfaceReducer,
})

export default rootReducer
