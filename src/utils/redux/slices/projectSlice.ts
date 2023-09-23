import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
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
      const updatedProject = produce(action.payload, draft => {
        const { engineers, designers } = draft.members
        draft.members.emailMap = mapMembersByEmail([engineers, designers])
        draft.projectPortal = { renderProjectPortal: false }
      })
      return updatedProject
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
    },
    renderProjectPortal: state => {
      state.projectPortal.renderProjectPortal =
        !state.projectPortal.renderProjectPortal
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
export const selectProject = (state: RootState) => state.project
export const selectProjectId = (state: RootState) => state.project._id
export const selectCompletedInfo = (state: RootState) =>
  state.project.completedInfo
export const selectRenderProjectPortal = (state: RootState) =>
  state.project.projectPortal.renderProjectPortal

export const {
  setProject,
  updateProject,
  updateParticipatingMembers,
  updateDeployedUrl,
  setProjectStart,
  setProjectSuccess,
  setProjectFailure,
  renderProjectPortal,
} = projectSlice.actions

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
