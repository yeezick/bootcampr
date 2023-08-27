import { BooleanObject, NumberObject } from './GenericInterfaces'
import dayjs from 'dayjs'

export interface Attendee {
  email: string
  responseStatus: string
}
export interface CalendarInterface {
  eventMap: NumberObject
  convertedEvents: ConvertedEvent[]
  currentEvent?: MeetingModalInfo
}

export interface ConvertedEvent {
  attendees?: Attendee
  creator?: string
  description?: string
  end?: string
  id?: string
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

export interface DateFieldsAsString {
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
  attendees: BooleanObject
  creator: string
  dateFields: {
    date: string
    end: string
    start: string
    timeZone: string
  }
  meetingText: MeetingText
  visibility: MeetingModalVisibility
}

export type MeetingModalVisibility = 'display' | 'edit' | 'create' | false
