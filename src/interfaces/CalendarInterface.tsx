import { BooleanObject } from './GenericInterfaces'
import { DateFieldsInterface } from './ProjectInterface'

export interface Attendee {
  email: string
  responseStatus: string
}
export interface CalendarInterface {
  convertedEventsById: EventObject
  convertedEventsAsArr: ConvertedEvent[]
  currentEvent?: {
    attendees: BooleanObject
    dateFields: DateFieldsInterface
    inviteAll: false
    meetingText: MeetingText
  }
}

export interface ConvertedEvent {
  attendees?: Attendee
  creator?: string
  end?: string
  id?: string
  start?: string
  timeZone?: string
  title?: string
}

export interface EventObject {
  [key: string]: ConvertedEvent
}

export interface MeetingText {
  description: string
  meetingLink: string
  summary: string
}
