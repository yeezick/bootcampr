import { TicketInterface } from 'interfaces'
import dayjs from 'dayjs'

export interface ProjectInterface {
  _v?: number
  createdAt?: string
  calendarId?: string
  duration?: string
  _id?: string
  meetingCadence?: number
  overview: string
  projectTracker?: {
    completed?: TicketInterface[]
    inProgress?: TicketInterface[]
    toDo?: TicketInterface[]
    underReview?: TicketInterface[]
  }
  members?: {
    designers?: any
    engineers?: any
  }
  status?: string
  title?: string
  tools?: string[]
}

export interface DateFieldsInterface {
  date: dayjs.Dayjs
  end: dayjs.Dayjs
  start: dayjs.Dayjs
  timeZone: string | dayjs.Dayjs
}
