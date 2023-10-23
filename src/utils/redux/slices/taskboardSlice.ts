import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskInterface } from 'interfaces'
import { RootState } from '../rootReducer'

type TicketDialogState = '' | 'create' | 'edit'

export interface TaskBoardInterface {
  displayAllTickets: boolean
  ticketDialogState: TicketDialogState
  ticketFields: TaskInterface
  visibleTickets: TaskInterface[]
  visibleTicketDialog: boolean
}

const initialState: TaskBoardInterface = {
  displayAllTickets: true,
  ticketDialogState: '',
  ticketFields: {
    assignee: '',
    date: '',
    description: '',
    _id: '',
    id: '',
    link: '',
    projectId: '',
    status: '',
    title: '',
  },
  visibleTickets: [],
  visibleTicketDialog: false,
}

export interface SetVisibleTicketsReducer {
  visibleTickets: TaskInterface[]
  displayAllTickets: boolean
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
    setVisibleTickets: (
      state,
      action: PayloadAction<SetVisibleTicketsReducer>
    ) => {
      const { displayAllTickets, visibleTickets } = action.payload
      state.displayAllTickets = displayAllTickets
      state.visibleTickets = visibleTickets
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

export const selectVisibleTicketDialog = (state: RootState) =>
  state.taskBoard.visibleTicketDialog
export const selectTicketDialogState = (state: RootState) =>
  state.taskBoard.ticketDialogState
export const selectTicketFields = (state: RootState) =>
  state.taskBoard.ticketFields

export const { setTicketFields, setVisibleTickets, setVisibleTicketDialog } =
  taskBoardSlice.actions
export default taskBoardSlice.reducer
