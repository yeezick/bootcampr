import { TicketInterface, UserInterface } from 'interfaces'
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
    all?: UserInterface[]
    designers?: UserInterface[]
    emailMap?: EmailMap
    engineers?: UserInterface[]
  }
  problem: string
  projectTracker?: {
    completed?: TicketInterface[]
    inProgress?: TicketInterface[]
    toDo?: TicketInterface[]
    underReview?: TicketInterface[]
  }
  completedInfo?: {
    participatingMembers?: { user: ProjectMemberInterface; decision: string }[]
    deployedUrl?: {
      [key: string]: string
    }
  }
  timeline?: {
    startDate?: string
    endDate?: string
  }
  title?: string
  projectPortal: {
    renderProjectPortal: boolean
  }
}

export interface EmailMap {
  [key: string]: {
    role: string
    index: number
  }
}

export interface TeamWithdrawalModal {
  onOpenModal?: () => void
  openModal?: boolean
  onCloseAll?: () => void
  openMenu?: boolean
  onCloseMenu?: () => void
  anchorEl?: HTMLElement | null
}
