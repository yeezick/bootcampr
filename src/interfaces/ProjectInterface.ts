import { TicketInterface, UserInterface } from 'interfaces'
import { ProjectMemberInterface } from 'interfaces/UserInterface'
import dayjs from 'dayjs'

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

export interface DateFieldsInterface {
  date: dayjs.Dayjs
  end: dayjs.Dayjs
  start: dayjs.Dayjs
  timeZone: string | dayjs.Dayjs
}
