import { UserInterface } from './UserInterface'

export interface TaskInterface {
  id?: string
  title?: string | null
  status?: string
  description?: string | null
  assignees?: {
    title: string
    id: number
    image: string
  }
  date?: string
  link?: string | null
}
export interface TicketInterface {
  'To Do': TaskInterface[]
  'In progress': TaskInterface[]
  'Under Review': TaskInterface[]
  Completed: TaskInterface[]
}

export interface TicketStatusChangeParams {
  sourceCategory: keyof TicketInterface | null
  targetCategory: keyof TicketInterface | string
  item: TaskInterface
  id: string
}

export type TicketStatusType = keyof TicketInterface
export interface TicketDetailInterface {
  ticketDetail: TaskInterface
  getAllTicket: TicketInterface
  setGetAllTicket: any
  ticketsStatus: TicketStatusType | string
}

export interface createTicketInterface {
  getAllTicket: TicketInterface
  setGetAllTicket: any
}
