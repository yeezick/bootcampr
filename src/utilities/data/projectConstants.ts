import { ProjectInterface } from '../types/ProjectInterface';
export const emptyProject: ProjectInterface = {
  duration: '',
  meeting_cadence: '',
  overview: '',
  project_owner: '',
  roles: {
    design: [],
    engineering: [],
  },
  status: '',
  technologies_used: [],
  title: '',
};

export const emptyProjectOwner = {
  firstName: '',
  lastName: '',
  _id: '',
};

export const emptyRole = {
  interestedApplicants: {
    design: [],
    engineering: [],
  },
  status: '',
  title: '',
  description: '',
  skills: [],
  maxHeadCount: 1,
};

export const allSkills = ['Select tools below', 'javascript', 'react', 'python', 'vs code', 'figma', 'miro'];
