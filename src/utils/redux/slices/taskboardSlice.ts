import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskInterface } from 'interfaces'
import { AvatarState } from 'interfaces/ProfileImageInterfaces'

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
      action: PayloadAction<SetVisibleTicketDialogReducer>
    ) => {
      const { ticketDialogState, visibleTicketDialog } = action.payload
      state.ticketDialogState = ticketDialogState
      state.visibleTicketDialog = visibleTicketDialog
    },
  },
})

export const { setVisibleTickets, setVisibleTicketDialog } =
  taskBoardSlice.actions

export default taskBoardSlice.reducer
