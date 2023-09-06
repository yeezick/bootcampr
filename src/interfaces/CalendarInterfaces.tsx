import { BooleanObject, NumberObject } from './GenericInterfaces'
import dayjs from 'dayjs'

export interface Attendee {
  email: string
  responseStatus: string
}
export interface CalendarInterface {
  convertedEvents: ConvertedEvent[]
  displayedEvent?: MeetingModalInfo
  eventMap: NumberObject
  modalDisplayStatus: ModalDisplayStatus
}

export interface ConvertedEvent {
  attendees?: Attendee
  creator?: string
  description?: string
  gDateFields: {
    endTime: string
    startTime: string
  }
  end?: string
  eventId?: string
  location: string
  metadata: any
  start?: string
  timeZone?: string
  title?: string
}

export interface DateFieldsAsDayjs {
  date: dayjs.Dayjs
  end: dayjs.Dayjs
  start: dayjs.Dayjs
  timeZone: dayjs.Dayjs | string
}

export interface DateFieldsInterface {
  date: string
  end: string
  start: string
  timeZone: string
}

export interface MeetingText {
  description: string
  meetingLink?: string
  summary: string
}

export interface MeetingModalInfo {
  attendees: gAttendees[]
  description: string
  creator: {
    email: string
  }
  dateFields: {
    date: string
    end: string
    start: string
    timeZone: string
  }
  eventId: string
  gDateFields: {
    endTime: string
    startTime: string
  }
  location?: string
  summary: string
  metadata: any
}

interface gAttendees {
  email: string
  responseStatus: string
}

export type ModalDisplayStatus = 'display' | 'edit' | 'create' | false
