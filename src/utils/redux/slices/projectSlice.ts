import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { TicketInterface } from 'interfaces'
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

export interface AddTicketReducer {
  status: string
  newTicket: TicketInterface
}

export interface ChangeTicketStatusReducer {
  initialStatus: string
  targetStatus: string
  targetTicketId: string
  updatedTicket: TicketInterface
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addTicketToStatus: (state, action: PayloadAction<AddTicketReducer>) => {
      const newTicket = action.payload
      state.projectTracker[newTicket.status].push(newTicket)
    },
    changeTicketStatus: (
      state,
      action: PayloadAction<ChangeTicketStatusReducer>
    ) => {
      const { initialStatus, targetStatus, targetTicketId, updatedTicket } =
        action.payload
      const projectTracker = state.projectTracker

      const filteredInitialStatusColumn = projectTracker[initialStatus].filter(
        ticket => ticket._id !== targetTicketId
      )

      projectTracker[targetStatus].push(updatedTicket)
      state.projectTracker[initialStatus] = filteredInitialStatusColumn
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
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      const updatedProject = produce(action.payload, draft => {
        const { engineers, designers } = draft.members
        draft.members.emailMap = mapMembersByEmail([engineers, designers])
        draft.projectPortal = { renderProjectPortal: false }
      })
      return updatedProject
    },
    setProjectFailure: state => {
      state.loading = false
    },
    setProjectStart: state => {
      state.loading = true
    },
    setProjectSuccess: (state, action: PayloadAction<ProjectInterface>) => {
      state.loading = false
      return action.payload
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

export const selectEngineerMembers = (state: RootState) =>
  state.project.members.engineers
export const selectDesignMembers = (state: RootState) =>
  state.project.members.designers

// TODO: Revisit this to replace the warning provoked by using selectMembersAsTeam
export const selectMembers = createSelector(
  [selectDesignMembers, selectEngineerMembers],
  (engineers, designers) => [...designers, ...engineers]
)

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

export const selectCalendarId = (state: RootState) => state.project.calendarId
export const selectCompletedInfo = (state: RootState) =>
  state.project.completedInfo
export const selectMembersByRole = (state: RootState) => state.project.members
export const selectProject = (state: RootState) => state.project
export const selectProjectId = (state: RootState) => state.project._id
export const selectProjectTracker = (state: RootState) =>
  state.project.projectTracker
export const selectRenderProjectPortal = (state: RootState) =>
  state.project.projectPortal.renderProjectPortal

export const {
  addTicketToStatus,
  changeTicketStatus,
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
