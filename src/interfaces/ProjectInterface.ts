import { TicketInterface } from './TicketInterFace'
import { UserInterface } from './UserInterface'

export interface ProjectInterface {
  createAt?: string

  meetingCadence?: number
  duration?: string
  overview: string
  projectOwner?: UserInterface
  roles?: {
    engineer?: any
    design?: any
  }
  status?: string
  tools?: string[]
  title?: string
  projectTracker?: {
    toDo?: TicketInterface[]
    inProgress?: TicketInterface[]
    underReview?: TicketInterface[]
    completed?: TicketInterface[]
  }
  __v: 16
  _id?: string
}
