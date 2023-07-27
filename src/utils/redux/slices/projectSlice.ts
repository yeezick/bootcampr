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
    deployedUrl: [],
  },
  members: {
    designers: [],
    engineers: [],
  },
  title: '',
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      return action.payload
    },
    updateProject: (state, action: PayloadAction<ProjectInterface>) => {
      state = {
        ...state,
        ...action.payload,
      }
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
    },
  },
})

export const selectProject = (state: RootState) => state.project

export const selectProjectId = (state: RootState) => state.project._id

export const selectCompletedInfo = (state: RootState) =>
  state.project.completedInfo

export const selectCalendarId = state => state.project.calendarId

export const {
  setProject,
  updateProject,
  setProjectStart,
  setProjectSuccess,
  setProjectFailure,
} = projectSlice.actions

export default projectSlice.reducer
