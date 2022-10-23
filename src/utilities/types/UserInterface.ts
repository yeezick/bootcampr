import { ProjectInterface } from './ProjectInterface';

export interface UserInterface {
  about: string;
  email: string;
  member_of_projects: ProjectInterface[];
  first_name: string;
  fun_fact: string;
  interested_projects: string[]; // ID of projects
  last_name: string;
  portfolio_projects: object; 
  portfolio_link: string;
  show_portfolio: boolean;
  rejected_projects: string[]; // ID of projects
  role: string;
  __v?: number;
  _id: string;
}

// export interface PortfolioProjectInterface {

// }