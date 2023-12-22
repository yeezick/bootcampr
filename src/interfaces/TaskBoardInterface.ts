import { ProjectTrackerInterface } from './ProjectInterface'
import { TicketInterface } from './TicketInterFace'

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
/*  */

export interface TaskBoardInterface {
  displayAllTickets: boolean
  ticketDialogState: TicketDialogState
  ticketFields: TicketFieldsInterface
  visibleTickets: ProjectTrackerInterface
  visibleTicketDialog: boolean
}

export type TicketDialogState = '' | 'create' | 'edit'

export interface TicketFieldsInterface extends TicketInterface {
  oldStatus?: string
}