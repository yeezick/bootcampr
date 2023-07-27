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
  calendarId?: string
  chats?: string[]
  createdAt?: string
  goal?: string
  meetings?: string[]
  members?: {
    designers?: string[]
    engineers?: string[]
  }
  problem?: ''
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
  timeline?: {
    startDate?: ''
    endDate?: ''
  }
  title?: string
}

export interface CompletedUrl {
  user: ProjectMemberInterface
  url: string
}
