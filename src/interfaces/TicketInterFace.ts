import { ProjectTrackerInterface, UserInterface } from 'interfaces'
import { SnackBarToastInterface } from './SnackBarToast'

export interface TaskInterface {
  assignee?: string
  comments?: []
  createdBy?: string
  dueDate?: string
  description?: string
  image?: string
  link?: string
  projectId?: string
  status?: string
  title?: string
  _id?: string
}

export interface TicketInterface {
  assignee?: string
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
  getAllTicket?: ProjectTrackerInterface
  projectId?: string
  setGetAllTicket?: React.Dispatch<
    React.SetStateAction<ProjectTrackerInterface>
  >
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
  buttonText?: string
  buttonClassName?: string
  openSnackBar?: SnackBarToastInterface
  setOpenSnackBar?: React.Dispatch<React.SetStateAction<SnackBarToastInterface>>
}
