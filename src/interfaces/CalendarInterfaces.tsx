import { NumberObject } from './GenericInterfaces'
import dayjs from 'dayjs'
import { MeetingModalInfo, ModalDisplayStatus } from './MeetingModalInterfaces'

export interface Attendee {
  email: string
  responseStatus: string
  comment: string
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
  googleDateFields: {
    endTime: string
    startTime: string
  }
  hangoutLink?: string
  end?: string
  eventId?: string
  location?: string
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
