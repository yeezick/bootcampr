import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectInterface } from 'interfaces/ProjectInterface'
import { RootState } from 'utils/redux/store'

const initialState: ProjectInterface = {
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
    endDate: '',
  },
  projectTracker: {
    completed: [],
    inProgress: [],
    toDo: [],
    underReview: [],
  },
  completedInfo: {
    participatingMembers: [],
    deployedUrl: {},
  },
  members: {
    designers: [],
    engineers: [],
  },
  title: '',
  projectPortal: {
    renderProjectPortal: false,
  },
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      return action.payload
    },
    updateProject: (state, action: PayloadAction<ProjectInterface>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    updateParticipatingMembers: (
      state,
      action: PayloadAction<
        ProjectInterface['completedInfo']['participatingMembers']
      >
    ) => {
      state.completedInfo.participatingMembers = action.payload
    },
    updateDeployedUrl: (
      state,
      action: PayloadAction<ProjectInterface['completedInfo']['deployedUrl']>
    ) => {
      state.completedInfo.deployedUrl = action.payload
    },
    setProjectStart: state => {
      state.loading = true
    },
    setProjectSuccess: (state, action: PayloadAction<ProjectInterface>) => {
      state.loading = false
      return action.payload
    },
    setProjectFailure: state => {
      state.loading = false
    renderProjectPortal: state => {
      state.projectPortal.renderProjectPortal =
        !state.projectPortal.renderProjectPortal
    },
    closeProjectPortal: state => {
      state.projectPortal.renderProjectPortal = false
    },
  },
})

export const selectProject = (state: RootState) => state.project

export const selectProjectId = (state: RootState) => state.project._id

export const selectCompletedInfo = (state: RootState) =>
  state.project.completedInfo

export const selectCalendarId = state => state.project.calendarId

export const selectProjectMembersAsTeam = (state: RootState) => {
  return [
    ...state.project.members.designers,
    ...state.project.members.engineers,
  ]
}
export const selectProjectMembersByRole = (state: RootState) =>
  state.project.members

export const {
  setProject,
  updateProject,
  updateParticipatingMembers,
  updateDeployedUrl,
  setProjectStart,
  setProjectSuccess,
  setProjectFailure,
  renderProjectPortal, 
  closeProjectPortal
} = projectSlice.actions

export default projectSlice.reducer