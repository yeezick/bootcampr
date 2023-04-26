import { UserInterface } from './UserInterface'

export interface TaskInterface {
  id?: string
  title?: string | null
  status?: string
  description?: string | null
  assignees?:
    | {
        title: string
        id: number
        image: string
      }
    | string
  projectId?: string
  date?: string
  link?: string | null
  _id?: string
}
export interface TicketInterface {
  assignees?: UserInterface | string
  createAt?: string
  description?: string
  projectId?: string
  status?: string
  title?: string
  dueDate?: string
  link?: string
  updatedAt?: string
  ticketOwner?: UserInterface | string
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
  setGetAllTicket: React.Dispatch<React.SetStateAction<TicketInterface[]>>
  ticketsStatus: KeyOfTicketStatusType | string
}

export interface createTicketInterface {
  getAllTicket?: TicketInterface
  setGetAllTicket?: React.Dispatch<React.SetStateAction<TicketInterface>>
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
  concatenatedString?: (str: string) => string
  projectId?: string
}

export interface TicketStatusChangeFunc {
  sourceCategory?: KeyOfTicketStatusType
  targetCategory?: KeyOfTicketStatusType
  item?: TicketInterface
  ticketId?: string
}
export interface TicketDetailPropsInterface {
  ticketDetail?: TicketInterface
  getAllTicket?: TicketInterface[]
  setGetAllTicket?: React.Dispatch<React.SetStateAction<TicketInterface[]>>
  ticketsStatus?: KeyOfTicketStatusType | string
  splitCamelCaseToWords?: (str: string) => string
  concatenatedString?: (str: string) => string
}
