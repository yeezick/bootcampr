import { TicketInterface, UserInterface } from 'interfaces'

export interface UserMap {
  [key: string]: {
    role: string
    index: number
  }
}
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
    designers?: UserInterface[]
    emailMap?: UserMap
    engineers?: UserInterface[]
    idMap?: UserMap
  }
  problem: string
  projectTracker?: ProjectTrackerInterface
  completedInfo?: {
    presenting?: boolean
    deployedUrl?: string
  }
  timeline?: {
    startDate?: string
    projectSubmissionDate?: string
    endDate?: string
  }
  title?: string
  projectPortal: {
    renderProjectPortal: boolean
  }
}

export interface ProjectTrackerInterface {
  completed: TicketInterface[]
  inProgress: TicketInterface[]
  toDo: TicketInterface[]
  underReview: TicketInterface[]
}

export interface TeamWithdrawalModal {
  onOpenModal?: () => void
  openModal?: boolean
  onCloseAll?: () => void
  openMenu?: boolean
  onCloseMenu?: () => void
  anchorEl?: HTMLElement | null
}

export type ProjectParams = {
  projectId: string
}
