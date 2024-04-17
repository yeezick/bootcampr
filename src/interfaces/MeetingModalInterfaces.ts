export type AttendeeList = {
  email: string
  responseStatus?: string
  comment?: string
}

export interface DateFieldsInterface {
  date: string
  end: string
  start: string
  eventTimezone: string
}

interface GoogleAttendees {
  email: string
  responseStatus: string
  comment: string
}

export interface EventInfo {
  attendees: AttendeeList[]
  description: string
  googleMeetingInfo: {
    enabled: boolean
    hangoutLink?: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  start: {
    dateTime: string
    timeZone: string
  }
  summary: string
  projectId: string
}

export interface MeetingModalInfo {
  attendees: GoogleAttendees[]
  creator: {
    email: string
  }
  description: string
  dateFields: {
    date: string
    end: string
    start: string
    timeZone: string
  }
  eventId: string
  googleDateFields: {
    endTime: string
    startTime: string
  }
  hangoutLink?: string
  location?: string
  summary: string
  metadata: any
}

export interface MeetingText {
  description: string
  meetingLink?: string
  summary: string
}

export interface DeleteEvent {
  eventId: string
}

export type ModalDisplayStatus = 'display' | 'edit' | 'create' | false
