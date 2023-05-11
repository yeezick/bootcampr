import {
  Availability,
  SignUpInterface,
  UiSliceInterface,
  UserInterface,
} from 'interfaces/UserInterface'

export const defaultAvailability: Availability = {
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

export const initialState: UiSliceInterface = {
  auth: {
    user: {
      availability: defaultAvailability,
      bio: '',
      email: '',
      firstName: '',
      githubUrl: '',
      lastName: '',
      linkedinUrl: '',
      portfolioUrl: '',
      profilePicture: '',
      role: '',
      __v: 0,
      _id: '',
    },
  },
  sidebar: {
    visibleSidebar: false,
  },
  chat: {
    visibleChat: false,
    _id: '',
    isGroup: false,
    participants: [],
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

export const emptyUser: UserInterface = {
  availability: defaultAvailability,
  bio: '',
  email: '',
  firstName: '',
  githubUrl: '',
  lastName: '',
  linkedinUrl: '',
  ownerOfProjects: [],
  portfolioUrl: '',
  profilePicture: '',
  role: '',
  _id: '',
}

export const emptySignUp: SignUpInterface = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
}
