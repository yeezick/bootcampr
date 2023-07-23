import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectInterface } from 'interfaces/ProjectInterface'
import { RootState } from 'utils/redux/store'

const initialState: ProjectInterface = {
  overview: '',
  members: {
    designers: [],
    engineers: [],
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

export const { setProject } = projectSlice.actions
export default projectSlice.reducer
