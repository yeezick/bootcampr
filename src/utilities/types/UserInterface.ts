import { ProjectInterface } from './ProjectInterface';

export interface UserInterface  {
  bio: string;
  declinedProjects?: ProjectInterface[];
  email: string;
  firstName: string;
  interestedProjects?: ProjectInterface[];
  lastName: string;
  linkedinUrl: string;
  memberOfProjects?: ProjectInterface[];
  ownerOfProjects?: ProjectInterface[];
  portfolioUrl: string;
  portfolioProjects?: ProjectInterface[];
  profilePicture: string;
  role: string;
  savedProjects?: ProjectInterface[];
  __v?: number;
  _id: string;
}

export interface UiSliceInterface {
  auth: {
    user: UserInterface;
  };
  status: {
    isAuthenticated: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: {
      status?: boolean;
      message?: string;
    };
  };
}

export interface SignUpInterface {
  email: string | undefined,
  password: string | undefined,
  first_name: string | undefined,
  last_name: string | undefined,
  confirmPassword: string | undefined
}

// export interface PortfolioProjectInterface {

// }