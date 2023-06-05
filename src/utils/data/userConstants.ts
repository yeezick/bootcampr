import {
  Availability,
  ChatMessageInterface,
  SignUpInterface,
  UiSliceInterface,
  UserInterface,
} from 'interfaces/UserInterface'

export const defaultAvailability: Availability = {
  ['SUN']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['MON']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['TUE']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['WED']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['THU']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['FRI']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['SAT']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
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
    displayName: '',
    selectedMember: {
      _id: '',
      firstName: '',
      lastName: '',
      profilePicture: '',
    },
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

export const emptyChatText: ChatMessageInterface = {
  text: '',
}
