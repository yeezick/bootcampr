import { TicketInterface } from 'interfaces'

export interface ProjectInterface {
  calendarId: string
  chats: string[]
  createdAt?: string
  goal: string
  meetings: string[]
  members?: {
    designers?: string[]
    engineers?: string[]
  }
  problem: ''
  projectTracker?: {
    completed?: TicketInterface[]
    inProgress?: TicketInterface[]
    toDo?: TicketInterface[]
    underReview?: TicketInterface[]
  }
  timeline: {
    startDate: ''
    endDate: ''
  }
  title?: string
  _id?: string
  _v?: number
  projectPortal: {
    renderProjectPortal: boolean
  }
}
