import { CustomProfileLinkInterface, SignUpInterface, UiSliceInterface, UserInterface } from '../types/UserInterface';

export const initialState: UiSliceInterface = {
  auth: {
    user: {
      bio: '',
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

export const emptyUserLinks: CustomProfileLinkInterface = {
  bio: '',
  customProfileLinks: {
    customUrlName: '',
    customUrlLink: '',
  },
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
