import { UserInterface } from 'interfaces'

export interface TaskInterface {
  assignees?:
    | {
        title: string
        id: number
        image: string
      }
    | string
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

export interface createTicketInterface {
  concatenatedString?: (str: string) => string
  getAllTicket?: TicketInterface
  projectId?: string
  setGetAllTicket?: React.Dispatch<React.SetStateAction<TicketInterface>>
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
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
  setGetAllTicket?: React.Dispatch<React.SetStateAction<TicketInterface[]>>
  splitCamelCaseToWords?: (str: string) => string
  ticketDetail?: TicketInterface
  ticketsStatus?: KeyOfTicketStatusType | string
}
