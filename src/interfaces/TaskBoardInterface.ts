import { ProjectTrackerInterface } from './ProjectInterface'
import { TicketInterface } from './TicketInterFace'
import { UserInterface } from './UserInterface'

/* Reducers */
export interface SetVisibleTicketDialogReducer {
  ticketDialogState: TicketDialogState
  visibleTicketDialog: boolean
}

export interface SetVisibleTicketsReducer {
  changeVisibleTicketType?: boolean
  projectTracker: ProjectTrackerInterface
  userId?: string
}

/* Interfaces */
export type ConfirmationDialogType = '' | 'cancel' | 'delete'

export interface TaskBoardInterface {
  confirmationDialogType: ConfirmationDialogType
  displayAllTickets: boolean
  ticketDialogState: TicketDialogState
  ticketFields: TicketFieldsInterface
  visibleTickets: ProjectTrackerInterface
  visibleTicketDialog: boolean
  conflictedTicket: {
    ticket: TicketInterface
    dialogState: '' | 'delete' | 'edit'
  }
  fetchComments: boolean
}

export type TicketDialogState = '' | 'create' | 'edit'

export interface TicketFieldsInterface extends TicketInterface {
  oldStatus?: string
}

export interface TaskBoardSocketStateInterface {
  userId: string
  visibleTicketDialog: boolean
  projectTracker: ProjectTrackerInterface
  members: UserInterface[]
  currentTicketFields: TicketFieldsInterface
  currentProjectId: string
}
