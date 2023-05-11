import { TicketInterface } from 'interfaces'

export interface ProjectInterface {
  _v?: number
  createAt?: string
  duration?: string
  _id?: string
  meetingCadence?: number
  overview: string
  projectTracker?: {
    completed?: TicketInterface[]
    inProgress?: TicketInterface[]
    toDo?: TicketInterface[]
    underReview?: TicketInterface[]
  }
  members?: {
    design?: any
    engineer?: any
  }
  status?: string
  title?: string
  tools?: string[]
}
