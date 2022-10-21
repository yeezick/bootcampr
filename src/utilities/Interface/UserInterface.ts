import { ProjectInterface } from './ProjectInterface';
export interface UserInterface {
  about: string;
  email: string;
  member_of_projects: ProjectInterface[];
  first_name: string;
  fun_fact: string;
  interested_projects: Array<1>;
  last_name: string;
  portfolio_projects: object;
  portfolio_link: string;
  show_portfolio: boolean;
  rejected_projects: Array<1>;
  role: string;
  __v?: number;
  _id: string;
}
