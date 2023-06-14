import { UserInterface } from 'interfaces'

export interface TaskInterface {
  assignees?: UserInterface | string
  date?: string
  description?: string | null
  _id?: string
  id?: string
  link?: string | null
  projectId?: string
  status?: string
  title?: string | null
}

export interface TicketInterface {
  assignees?: UserInterface
  createAt?: string
  description?: string
  projectId?: string
  status?: string
  title?: string
  dueDate?: string
  link?: string
  updatedAt?: string
  createdBy?: UserInterface
  _v?: number
  _id?: string
}

export interface TicketStatusChangeParams {
  id: string
  item: TaskInterface
  sourceCategory: keyof TicketInterface | null
  targetCategory: keyof TicketInterface | string
}

export type KeyOfTicketStatusType = keyof TicketInterface
export interface TicketDetailInterface {
  getAllTicket: TicketInterface
  setGetAllTicket: React.Dispatch<React.SetStateAction<TicketInterface[]>>
  ticketDetail: TaskInterface
  ticketsStatus: KeyOfTicketStatusType | string
}

export interface CreateTicketInterface {
  concatenatedString?: (str: string) => string
  getAllTicket?: TicketInterface
  projectId?: string
  setGetAllTicket?: React.Dispatch<React.SetStateAction<TicketInterface>>
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
  buttonText?: string
  buttonClassName?: string
}

export interface TicketStatusChangeFunc {
  item?: TicketInterface
  sourceCategory?: KeyOfTicketStatusType
  targetCategory?: KeyOfTicketStatusType
  ticketId?: string
}
export interface TicketDetailPropsInterface {
  concatenatedString?: (str: string) => string
  getAllTicket?: TicketInterface[]
  ref?: any
  setGetAllTicket?: React.Dispatch<React.SetStateAction<TicketInterface[]>>
  splitCamelCaseToWords?: (str: string) => string
  ticketDetail?: TicketInterface
  ticketsStatus?: KeyOfTicketStatusType | string
}
