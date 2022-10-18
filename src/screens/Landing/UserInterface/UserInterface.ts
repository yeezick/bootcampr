export interface UserInterface {
  about: string;
  email: string;
  member_of_projects: Project[];
  first_name: string;
  fun_fact: string;
  interested_projects: Array<1>;
  last_name: string;
  password_digest: string;
  portfolio_projects: object;
  portfolio_link: string;
  show_portfolio: boolean;
  rejected_projects: Array<1>;
  role: string;
}
interface Project {
  createdAt: string;
  description: string;
  designer_count: number;
  engineer_count: number;
  interested_applicants: string[];
  owner: string;
  seeking: boolean;
  team_members: string[];
  time_commitment: string;
  title: string;
  tools: any;
  updatedAt: string;
}
