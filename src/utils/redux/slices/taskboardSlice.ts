import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectTrackerInterface, TaskInterface } from 'interfaces'
import { RootState } from '../rootReducer'
import { filterUserTickets } from 'utils/helpers/taskHelpers'
import { store } from '../store'

type TicketDialogState = '' | 'create' | 'edit'

export interface TaskBoardInterface {
  displayAllTickets: boolean
  ticketDialogState: TicketDialogState
  ticketFields: TicketFieldsInterface
  visibleTickets: ProjectTrackerInterface
  visibleTicketDialog: boolean
}

export interface TicketFieldsInterface extends TaskInterface {
  oldStatus?: string
}

export const emptyTicketFields = {
  assignee: '',
  comments: [],
  createdBy: '',
  description: '',
  dueDate: '',
  image: '',
  link: '',
  projectId: '',
  status: '',
  title: '',
}

const initialState: TaskBoardInterface = {
  displayAllTickets: true,
  ticketDialogState: '',
  ticketFields: emptyTicketFields,
  visibleTickets: {
    completed: [],
    inProgress: [],
    toDo: [],
    underReview: [],
  },
  visibleTicketDialog: false,
}

export interface SetVisibleTicketsReducer {
  projectTracker: ProjectTrackerInterface
  userId?: string
  changeVisibleTicketType?: boolean
}

export interface SetVisibleTicketDialogReducer {
  ticketDialogState: TicketDialogState
  visibleTicketDialog: boolean
}

/**
 * Creates a slice for taskBoard with a single reducer to set the image URL.
 */
const taskBoardSlice = createSlice({
  name: 'taskBoard',
  initialState,
  reducers: {
    setInitialVisibleTickets: (
      state,
      action: PayloadAction<ProjectTrackerInterface>
    ) => {
      state.visibleTickets = action.payload
    },
    setVisibleTickets: (
      state,
      action: PayloadAction<SetVisibleTicketsReducer>
    ) => {
      const { changeVisibleTicketType, projectTracker, userId } = action.payload
      const shouldDisplayAllTickets = changeVisibleTicketType
        ? !state.displayAllTickets
        : state.displayAllTickets
      console.log('shouldDisplayAll', shouldDisplayAllTickets)

      if (shouldDisplayAllTickets) {
        state.visibleTickets = projectTracker
      } else {
        state.visibleTickets = filterUserTickets(projectTracker, userId)
      }
      state.displayAllTickets = shouldDisplayAllTickets
    },
    setVisibleTicketDialog: (
      state,
      action: PayloadAction<TicketDialogState>
    ) => {
      switch (action.payload) {
        case 'create':
        case 'edit':
          state.ticketDialogState = action.payload
          state.visibleTicketDialog = true
          break

        default:
          state.ticketDialogState = ''
          state.visibleTicketDialog = false
          break
      }
    },
    setTicketFields: (state, action: PayloadAction<TaskInterface>) => {
      state.ticketFields = { ...state.ticketFields, ...action.payload }
    },
  },
})

export const selectDisplayAllTickets = (state: RootState) =>
  state.taskBoard.displayAllTickets
export const selectTicketDialogState = (state: RootState) =>
  state.taskBoard.ticketDialogState
export const selectTicketFields = (state: RootState) =>
  state.taskBoard.ticketFields
export const selectVisibleTicketDialog = (state: RootState) =>
  state.taskBoard.visibleTicketDialog
export const selectVisibleTickets = (state: RootState) =>
  state.taskBoard.visibleTickets

export const {
  setInitialVisibleTickets,
  setTicketFields,
  setVisibleTickets,
  setVisibleTicketDialog,
} = taskBoardSlice.actions
export default taskBoardSlice.reducer
