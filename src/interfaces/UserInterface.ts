import { ProjectInterface } from 'interfaces'

export interface UserInterface {
  availability?: Availability
  bio?: string
  declinedProjects?: ProjectInterface[]
  email: string
  firstName: string
  interestedProjects?: ProjectInterface[]
  lastName: string
  links: {
    githubUrl?: string
    linkedinUrl: string
    portfolioUrl: string
  }
  onboarded?: boolean
  profilePicture?: string | null
  project?: string
  role?: string
  savedProjects?: ProjectInterface[]
  verified?: Boolean
  __v?: number
  _id?: string
}

export interface UiSliceInterface {
  auth: {
    user: UserInterface
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
  SUN:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
  MON:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
  TUE:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
  WED:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
  THU:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
  FRI:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
  SAT:
    | string
    | {
        available: boolean
        availability: TimeOption[][]
      }
}

export interface ProjectMemberInterface {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  profilePicture: string
}
