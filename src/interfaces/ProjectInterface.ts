import { TicketInterface, UserInterface } from 'interfaces'
import dayjs from 'dayjs'

export interface ProjectInterface {
  calendarId: string
  chats: string[]
  createdAt?: string
  goal: string
  meetings: string[]
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
  timeline: {
    startDate: string
    endDate: string
  }
  title?: string
  _id?: string
  _v?: number
}

export interface DateFieldsInterface {
  date: dayjs.Dayjs
  end: dayjs.Dayjs
  start: dayjs.Dayjs
  timeZone: string | dayjs.Dayjs
}
