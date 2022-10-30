import { ProjectInterface } from './ProjectInterface';

export interface UserInterface {
  about: string;
  email: string;
  member_of_projects: ProjectInterface[] | null;
  first_name: string;
  fun_fact: string;
  interested_projects: string[] | null; // ID of projects
  last_name: string;
  portfolio_projects: object | null; 
  portfolio_link: string;
  show_portfolio: boolean;
  rejected_projects: string[] | null; // ID of projects
  role: string;
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
      status: boolean;
      messsage: string;
    };
  };
}

// export interface PortfolioProjectInterface {

// }