import { UserInterface } from './UserInterface'

export interface TaskInterface {
  id: string
  title?: string | null
  status: string
  description?: string | null
  assignees: {
    title: string
    id: number
    image: string
  }
  date?: string
  link?: string | null
}
export interface ticketInterface {
  'To Do': TaskInterface[]
  'In progress': TaskInterface[]
  'Under Review': TaskInterface[]
  Completed: TaskInterface[]
}

export interface TicketStatusChangeParams {
  sourceCategory: keyof ticketInterface | null
  targetCategory: keyof ticketInterface | string
  item: TaskInterface
  id: string
}

export type TicketStatusType = keyof ticketInterface
export interface TicketDetailInterface {
  ticketDetail: TaskInterface
  getAllTicket: ticketInterface
  setGetAllTicket: any
  ticketsStatus: TicketStatusType | string
}
