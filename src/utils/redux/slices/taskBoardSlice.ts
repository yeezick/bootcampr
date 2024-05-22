import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectTrackerInterface, TicketInterface } from 'interfaces'
import { RootState } from '../rootReducer'
import { filterUserTickets } from 'utils/helpers/taskHelpers'
import { initialTaskBoardState } from 'utils/data/taskBoardConstants'
import {
  ConfirmationDialogType,
  SetVisibleTicketsReducer,
  TicketDialogState,
} from 'interfaces/TaskBoardInterface'
import { emptyTicketFields } from 'utils/data/taskBoardConstants'

const taskBoardSlice = createSlice({
  name: 'taskBoard',
  initialState: initialTaskBoardState,
  reducers: {
    resetTicketFields: (state, action: PayloadAction<TicketInterface>) => {
      state.ticketFields = { ...emptyTicketFields, ...action.payload }
    },
    setConfirmationDialogType: (
      state,
      action: PayloadAction<ConfirmationDialogType>
    ) => {
      return { ...state, confirmationDialogType: action.payload } // BC-699
    },
    setInitialVisibleTickets: (
      state,
      action: PayloadAction<ProjectTrackerInterface>
    ) => {
      state.visibleTickets = action.payload
    },
    setTicketFields: (state, action: PayloadAction<TicketInterface>) => {
      state.ticketFields = { ...state.ticketFields, ...action.payload }
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
    setVisibleTickets: (
      state,
      action: PayloadAction<SetVisibleTicketsReducer>
    ) => {
      const { changeVisibleTicketType, projectTracker, userId } = action.payload
      const shouldDisplayAllTickets = changeVisibleTicketType
        ? !state.displayAllTickets
        : state.displayAllTickets

      if (shouldDisplayAllTickets) {
        state.visibleTickets = projectTracker
      } else {
        state.visibleTickets = filterUserTickets(projectTracker, userId)
      }
      state.displayAllTickets = shouldDisplayAllTickets
    },
    setConflictTicket: (state, action) => {
      const { ticket, dialogState } = action.payload
      state.conflictedTicket.ticket = ticket
      state.conflictedTicket.dialogState = dialogState
    },
  },
})

export const selectConfirmationDialogType = (state: RootState) =>
  state.taskBoard.confirmationDialogType
export const selectConflictedTicket = (state: RootState) =>
  state.taskBoard.conflictedTicket
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
  resetTicketFields,
  setConfirmationDialogType,
  setInitialVisibleTickets,
  setTicketFields,
  setVisibleTickets,
  setVisibleTicketDialog,
  setConflictTicket,
} = taskBoardSlice.actions
export default taskBoardSlice.reducer
