import { TicketInterface } from 'interfaces'
import { UserInterface, ProjectMemberInterface } from 'interfaces/UserInterface'

export interface ProjectInterface {
  _v?: number
  createAt?: string
  duration?: string
  _id?: string
  meetingCadence?: number
  overview?: string
  projectTracker?: {
    completed?: TicketInterface[]
    inProgress?: TicketInterface[]
    toDo?: TicketInterface[]
    underReview?: TicketInterface[]
  }
  completedInfo?: {
    participatingMembers?: ProjectMemberInterface[]
    deployedUrl?: CompletedUrl[]
  }
  members?: {
    design?: any
    engineer?: any
  }
  status?: string
  title?: string
  tools?: string[]
}

export interface CompletedUrl {
  user: Pick<UserInterface, '_id' | 'firstName' | 'lastName'>
  url: string
}
