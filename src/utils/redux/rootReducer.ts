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
  chatbox: ReturnType<typeof chatReducer>
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
const appReducer: Reducer<RootState> = combineReducers({
  calendar: calendarReducer,
  chatbox: chatReducer,
  notification: notificationReducer,
  project: projectReducer,
  snackBar: snackBarSlice,
  taskBoard: taskBoardSlice,
  ui: userReducer,
  userInterface: userInterfaceReducer,
})

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === 'ui/clearStates') {
    // Returning undefined to all reducers will trigger them to return their initial states
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
