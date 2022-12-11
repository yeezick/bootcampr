import { CustomUrlInterface, SignUpInterface, UiSliceInterface, UserInterface } from '../types/UserInterface';

export const initialState: UiSliceInterface = {
  auth: {
    user: {
      bio: '',
      customProfileLinks: [{ _id: '', customUrlLink: '', customUrlName: '' }],
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

export const emptyUrl: CustomUrlInterface = {
  _id: '',
  customUrlLink: '',
  customUrlName: '',
};

export const emptyUser: UserInterface = {
  bio: '',
  customProfileLinks: [emptyUrl],
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

export const emptySignUp: SignUpInterface = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};
