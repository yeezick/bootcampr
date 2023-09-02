import { TicketInterface, UserInterface } from 'interfaces'

export interface ProjectInterface {
  calendarId: string
  chats: string[]
  createdAt?: string
  goal: string
  meetings: string[]
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
  timeline: {
    startDate: string
    endDate: string
  }
  title?: string
  _id?: string
  _v?: number
}

export interface EmailMap {
  [key: string]: {
    role: string
    index: number
  }
}
