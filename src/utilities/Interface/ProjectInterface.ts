import { UserInterface } from './UserInterface';

export interface ProjectInterface {
  createdAt: string | undefined;
  duration: string | undefined;
  id: string | undefined;
  meeting_cadence: string | undefined;
  overview: string | undefined;
  project_owner: {
    about: string;
    email: string;
    first_name: string;
    fun_fact: string;
    interested_projects: Array<1>;
    last_name: string;
    portfolio_projects: object;
    portfolio_link: string;
    show_portfolio: boolean;
    rejected_projects: Array<1>;
    role: string;
    _id: string;
  };
  technologies_used: string[] | undefined;
  title: string | undefined;
  updatedAt: string | undefined;
}
