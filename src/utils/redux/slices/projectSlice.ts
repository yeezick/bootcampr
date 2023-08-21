import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { ProjectInterface } from 'interfaces/ProjectInterface'
// import { mapMembersByEmail } from 'utils/helpers'
import { RootState } from 'utils/redux/store'

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
/**
 * Creates a slice for project with a single reducer to set the image URL.
 */

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      const updatedProject = produce(action.payload, draft => {
        const membersAsArray = [
          ...draft.members.designers,
          ...draft.members.engineers,
        ]

        draft.members = {
          ...draft.members,
          all: membersAsArray,
          mappedByEmail: mapMembersByEmail(membersAsArray),
        }
      })
      return updatedProject
    },
  },
})

export const selectMembersAsTeam = (state: RootState) => [
  ...state.project.members.designers,
  ...state.project.members.engineers,
]

export const selectMembersByEmail = (state: RootState) =>
  state.project.members.mappedByEmail
export const selectMembersByRole = (state: RootState) => state.project.members
export const selectCalendarId = (state: RootState) => state.project.calendarId

export const { setProject } = projectSlice.actions
export default projectSlice.reducer

/**TODO: moving this function to calendarHelpers breaks the app, need to look into why */
export const mapMembersByEmail = members => {
  const teamObject = {}
  for (const member of members) {
    teamObject[member.email] = member
  }
  return teamObject
}
