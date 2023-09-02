import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { UserInterface } from 'interfaces'
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
        const { engineers, designers } = draft.members

        draft.members = {
          ...draft.members,
          emailMap: mapMembersByEmail([engineers, designers]),
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

/**
 *
 * @param {string[]} emails Takes an array of user emails,
 *     then looks that user up using the role and index stored in the emailMap.
 * @returns An array of user objects
 */
export const selectMembersByEmail = emails => (state: RootState) => {
  const allMembers = []
  for (const email of emails) {
    const { index, role } = state.project.members.emailMap[email]
    allMembers.push(state.project.members[role][index])
  }
  return allMembers
}

export const selectMembersByRole = (state: RootState) => state.project.members
export const selectCalendarId = (state: RootState) => state.project.calendarId

export const { setProject } = projectSlice.actions
export default projectSlice.reducer

/** Helpers */
/**
 * @param {array} roles Array of roles in a project (Engineers, Designers)
 * @returns A map to identify that user by their role and index when using selectMembersByEmail()
 */
// TODO: moving this function to calendarHelpers breaks the app, need to look into why
export const mapMembersByEmail = roles => {
  const emailMap = {}
  for (const role of roles) {
    for (let i = 0; i < role.length; i++) {
      const currMember = role[i]
      emailMap[currMember.email] = {
        role: determineRole(currMember.role),
        index: i,
      }
    }
  }
  return emailMap
}

const determineRole = roleStr => {
  if (roleStr === 'UX Designer') {
    return 'designers'
  } else if (roleStr === 'Software Engineer') {
    return 'engineers'
  }
}
