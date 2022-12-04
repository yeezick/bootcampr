import { UserInterface } from './UserInterface';

export interface ProjectInterface {
  createdAt?: string;
  duration: string;
  meetingCadence: number;
  overview: string;
  projectOwner: string | UserInterface;
  roles?: Role[];
  status: string;
  technologiesUsed?: string[];
  title: string;
  updatedAt?: string;
  _id?: string;
  __v?: number;
}

export interface Role {
  interestedApplicants: string[],
  status: string,
  title: string,
  description: string,
  skills: string,
  maxHeadcount: number,
};
