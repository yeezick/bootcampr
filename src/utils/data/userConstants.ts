import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import {
  AvailabilityInterface,
  SignUpInterface,
  UiSliceInterface,
  UserInterface,
} from 'interfaces/UserInterface'

export const defaultAvailability: AvailabilityInterface = {
  SUN: {
    available: false,
    availability: [],
  },
  MON: {
    available: false,
    availability: [],
  },
  TUE: {
    available: false,
    availability: [],
  },
  WED: {
    available: false,
    availability: [],
  },
  THU: {
    available: false,
    availability: [],
  },
  FRI: {
    available: false,
    availability: [],
  },
  SAT: {
    available: false,
    availability: [],
  },
}

export const emptyUser: UserInterface = {
  availability: defaultAvailability,
  bio: '',
  email: '',
  firstName: '',
  lastName: '',
  links: {
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
  },
  profilePicture: '',
  defaultProfilePicture: '',
  hasProfilePicture: false,
  payment: {
    experience: 'unchosen',
    paid: false,
  },
  projects: {
    activeProject: null,
    projects: [],
  },
  role: '',
  unreadMessages: {},
  _id: '',
}

export const initialUserSliceState: UiSliceInterface = {
  auth: {
    user: emptyUser,
  },
  // these would ideally be its own "requestSlice" ; isAuthenticated would remain here
  status: {
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: {
      status: false,
      message: '',
    },
  },
}

export const emptySignUp: SignUpInterface = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
}

export const emptyPasswordData: PasswordFormData = {
  password: '',
  currentPassword: '',
  confirmPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}
