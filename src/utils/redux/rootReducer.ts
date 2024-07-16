import { combineReducers, Reducer } from 'redux'
import calendarReducer from 'utils/redux/slices/calendarSlice'
import chatReducer from 'utils/redux/slices/chatSlice'
import notificationReducer from 'utils/redux/slices/notificationSlice'
import projectReducer from 'utils/redux/slices/projectSlice'
import userReducer from 'utils/redux/slices/userSlice'
import snackBarSlice from './slices/snackBarSlice'
import userInterfaceReducer from './slices/userInterfaceSlice'
import taskBoardSlice from './slices/taskBoardSlice'
import teamMembersReducer from './slices/teamMembersSlice'
import recurrenceSlice from './slices/recurrenceSlice'

export type RootState = {
  calendar: ReturnType<typeof calendarReducer>
  chatbox: ReturnType<typeof chatReducer>
  notification: ReturnType<typeof notificationReducer>
  project: ReturnType<typeof projectReducer>
  snackBar: ReturnType<typeof snackBarSlice>
  taskBoard: ReturnType<typeof taskBoardSlice>
  recurrence: ReturnType<typeof recurrenceSlice>
  ui: ReturnType<typeof userReducer> // todo: rename to user
  userInterface: ReturnType<typeof userInterfaceReducer>
  teamMembers: ReturnType<typeof teamMembersReducer>
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
  recurrence: recurrenceSlice,
  ui: userReducer,
  userInterface: userInterfaceReducer,
  teamMembers: teamMembersReducer,
})

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === 'ui/clearStates') {
    // Returning undefined to all reducers will trigger them to return their initial states
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
