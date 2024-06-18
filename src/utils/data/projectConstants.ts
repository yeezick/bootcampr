import { ProjectInterface } from 'interfaces/ProjectInterface'

export const emptyProject: ProjectInterface = {
  loading: false,
  _v: 0,
  createAt: '',
  duration: '',
  _id: '',
  chats: [],
  calendarId: '',
  goal: '',
  meetings: [],
  meetingCadence: 0,
  problem: '',
  overview: '',
  timeline: {
    startDate: '',
    projectSubmissionDate: '',
    endDate: '',
  },
  projectTracker: {
    completed: [],
    inProgress: [],
    toDo: [],
    underReview: [],
  },
  completedInfo: {
    presenting: null,
    deployedUrl: '',
  },
  members: {
    designers: [],
    engineers: [],
    productManagers: [],
  },
  title: '',
  projectPortal: {
    renderProjectPortal: false,
  },
  completed: false,
}

// export const emptyProject = {
//   duration: '',
//   meeting_cadence: '',
//   overview: '',
//   project_owner: '',
//   status: '',
//   technologies_used: [],
//   title: '',
// }

// export const emptyProjectOwner = {
//   firstName: '',
//   lastName: '',
//   _id: '',
// }

export enum ProjectIcons {
  Unassigned = 'https://tinyurl.com/4wbe9hp2',
}
