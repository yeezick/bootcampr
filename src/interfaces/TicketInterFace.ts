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
  _id?: string
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

export type KeyOfTicketStatusType = keyof TicketInterface
export interface TicketDetailInterface {
  ticketDetail: TaskInterface
  getAllTicket: TicketInterface
  setGetAllTicket: any
  ticketsStatus: KeyOfTicketStatusType | string
}

export interface createTicketInterface {
  getAllTicket?: TicketInterface
  setGetAllTicket?: any
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
}
export interface AllTicket {
  projectTracker?: any
  projectDetail?: any
  setProjectDetails?: any
}
export interface TicketStatusChangeFunc {
  sourceCategory?: KeyOfTicketStatusType
  targetCategory?: KeyOfTicketStatusType
  item?: TicketInterface
  ticketId?: string
}
export interface TicketDetailPropsInterface {
  ticketDetail?: any
  getAllTicket?: TicketInterface[]
  setGetAllTicket?: any
  ticketsStatus?: KeyOfTicketStatusType | string
  splitCamelCaseToWords?: (str: string) => string
  concatenatedString?: (str: string) => string
}
