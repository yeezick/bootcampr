import { ProjectInterface } from 'interfaces'

export interface UserInterface {
  availability: Availability
  bio: string
  declinedProjects?: ProjectInterface[]
  email: string
  firstName: string
  githubUrl: string
  interestedProjects?: ProjectInterface[]
  lastName: string
  linkedinUrl: string
  memberOfProjects?: ProjectInterface[]
  ownerOfProjects?: ProjectInterface[]
  portfolioUrl: string
  portfolioProjects?: ProjectInterface[]
  profilePicture: string
  role: string
  savedProjects?: ProjectInterface[]
  __v?: number
  _id: string
}

export interface UiSliceInterface {
  auth: {
    user: UserInterface
  }
  sidebar: {
    visibleSidebar: boolean
  }
  chat: {
    visibleChat: boolean
    _id: string
    isGroup: boolean
    participants: []
  }
  status: {
    isAuthenticated: boolean
    isLoading?: boolean
    isSuccess?: boolean
    isError?: {
      // status + message should not be conditional? if there is an error. Any error should return the status and a message to describe it
      status?: boolean
      message?: string | object
    }
  }
}

export interface SignUpInterface {
  confirmPassword: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface SignInInterface {
  email: string
  password: string
}

export const timeOptions = [
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
]

export type TimeOption = (typeof timeOptions)[0]

export interface Availability {
  SUN: {
    available: boolean
    availability: TimeOption[][]
  }
  MON: {
    available: boolean
    availability: TimeOption[][]
  }
  TUE: {
    available: boolean
    availability: TimeOption[][]
  }
  WED: {
    available: boolean
    availability: TimeOption[][]
  }
  THU: {
    available: boolean
    availability: TimeOption[][]
  }
  FRI: {
    available: boolean
    availability: TimeOption[][]
  }
  SAT: {
    available: boolean
    availability: TimeOption[][]
  }
}
