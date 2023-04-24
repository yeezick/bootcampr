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
  assignees?: UserInterface
  createAt?: string
  description?: string
  projectId?: string
  status?: string
  title?: string
  updatedAt?: string
  _v?: number
  _id?: string
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
