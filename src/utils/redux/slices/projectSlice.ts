import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectInterface } from 'interfaces/ProjectInterface'
import { RootState } from 'utils/redux/store'

const initialState: ProjectInterface = {
  calendarId: '',
  chats: [],
  goal: '',
  members: {
    designers: [],
    engineers: [],
  },
  meetings: [],
  problem: '',
  timeline: {
    startDate: '',
    endDate: '',
  },
  projectPortal: {
    renderProjectPortal: false,
  },
}
/**
 * Creates a slice for project with a single reducer to set the image URL.
 */
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      return action.payload
    },
    renderProjectPortal: state => {
      state.projectPortal.renderProjectPortal =
        !state.projectPortal.renderProjectPortal
    },
    closeProjectPortal: state => {
      state.projectPortal.renderProjectPortal = false
    },
  },
})

export const selectProjectMembersAsTeam = (state: RootState) => {
  return [
    ...state.project.members.designers,
    ...state.project.members.engineers,
  ]
}
export const selectProjectMembersByRole = (state: RootState) =>
  state.project.members
export const selectCalendarId = (state: RootState) => state.project.calendarId

export const { setProject, renderProjectPortal, closeProjectPortal } =
  projectSlice.actions
export default projectSlice.reducer
