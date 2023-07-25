import { TicketInterface } from 'interfaces'
import { ProjectMemberInterface } from 'interfaces/UserInterface'

export interface ProjectInterface {
  loading?: boolean
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
    participatingMembers?: { user: ProjectMemberInterface; decision: string }[]
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
  user: ProjectMemberInterface
  url: string
}
