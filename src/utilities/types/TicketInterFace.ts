import { UserInterface } from './UserInterface'

export interface TaskInterface {
  id: string
  title: string
  status: string
  description: string
  assignees: {
    title: string
    id: number
    image: string
  }
  date: string
  link: string
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
