import { UserInterface } from './UserInterface';

export interface ProjectInterface {
  createdAt?: string;
  duration: string;
  meetingCadence: string;
  overview: string;
  projectOwner: string | UserInterface;
  roles?: Roles[];
  status: string;
  technologiesUsed?: string[];
  title: string;
  updatedAt?: string;
  _id?: string;
  __v?: number;
}

export interface Roles {
  interestedApplicants: string[],
  status: string,
  title: string,
  description: string,
  skills: string,
  maxHeadcount: number,
};
