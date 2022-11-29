import { CustomUrlInterface, SignUpInterface, UiSliceInterface, UserInterface } from '../types/UserInterface';

export const initialState: UiSliceInterface = {
  auth: {
    user: {
      bio: '',
      customProfileLinks: [],
      email: '',
      firstName: '',
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
  status: {
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: {
      status: false,
      message: '',
    },
  },
};

export const emptyUser: UserInterface = {
  bio: '',
  customProfileLinks: [],
  email: '',
  firstName: '',
  lastName: '',
  linkedinUrl: '',
  ownerOfProjects: [],
  portfolioUrl: '',
  profilePicture: '',
  role: '',
  _id: '',
};

export const emptyUrl: CustomUrlInterface = {
  _id: '',
  customUrlLink: '',
  customUrlName: '',
};

export const emptySignUp: SignUpInterface = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};
