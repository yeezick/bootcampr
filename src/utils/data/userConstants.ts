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
  role: '',
  unreadMessages: {},
  _id: '',
}

export const initialState: UiSliceInterface = {
  auth: {
    user: emptyUser,
  },
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
