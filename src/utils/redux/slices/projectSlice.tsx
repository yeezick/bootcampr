import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectInterface } from 'interfaces'
import { AvatarState } from 'interfaces/ProfileImageInterfaces'
// todo: may be preferable to move project tracker into its own model and slice?

const initialState: ProjectInterface = {
  chats: [],
  calendarId: '',
  goal: '',
  meetings: [],
  members: {
    engineers: [],
    designers: [],
  },
  problem: '',
  timeline: {
    startDate: '',
    endDate: '',
  },
  title: '',
  projectTracker: {
    toDo: [],
    inProgress: [],
    underReview: [],
    completed: [],
  },
}

const projectslice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectInfo: (state, action: PayloadAction<ProjectInterface>) => {
      return action.payload
    },
  },
})

export const selectCalendarId = state => state.project.calendarId
export const { setProjectInfo } = projectslice.actions

export default projectslice.reducer
