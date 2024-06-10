import {
  createSelector,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit'
import { produce } from 'immer'
import { TicketInterface } from 'interfaces'
import { ProjectInterface } from 'interfaces/ProjectInterface'
import { generateDayJs } from 'utils/helpers'
import { RootState } from 'utils/redux/store'

// TODO: Make project tracker its own model and add to taskboard slice

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
  projectPresented: false,
}

export interface AddCommentToTicketReducer {
  commentId: string
  ticketId: string
  ticketStatus: string
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

export interface DeleteTicketReducer {
  status: string
  ticketId: string
}

export interface UpdateTicketReducer {
  initialStatus: string
  updatedTicket: TicketInterface
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addCommentToTicket: (
      state,
      action: PayloadAction<AddCommentToTicketReducer>
    ) => {
      const { commentId, ticketId, ticketStatus } = action.payload
      const updatedTracker = state.projectTracker[ticketStatus].map(ticket => {
        if (ticket._id === ticketId) {
          ticket.comments.push(commentId)
        }
        return ticket
      })
      state.projectTracker[ticketStatus] = updatedTracker
    },
    addTicketToStatus: (state, action: PayloadAction<AddTicketReducer>) => {
      const newTicket = action.payload
      state.projectTracker[newTicket.status].push(newTicket)
    },
    updateTicket: (state, action: PayloadAction<UpdateTicketReducer>) => {
      const { initialStatus, updatedTicket } = action.payload
      const projectTracker = state.projectTracker
      const ticketIdx = state.projectTracker[initialStatus].findIndex(
        ticket => ticket._id === updatedTicket._id
      )
      const locatedTicket = state.projectTracker[initialStatus][ticketIdx]

      if (locatedTicket.status === updatedTicket.status) {
        state.projectTracker[initialStatus][ticketIdx] = updatedTicket
      } else {
        changeTicketStatus(initialStatus, projectTracker, state, updatedTicket)
      }
    },
    reorderColumn: (state, action) => {
      const { columnId, reorderedColumn } = action.payload
      state.projectTracker[columnId] = reorderedColumn
    },
    moveTicketBetweenColumns: (state, action) => {
      const { newColumnId, newColumn, oldColumnId, oldColumn } = action.payload
      state.projectTracker[newColumnId] = newColumn
      state.projectTracker[oldColumnId] = oldColumn
    },
    updateTicketStatus: (state, action: PayloadAction<UpdateTicketReducer>) => {
      const { initialStatus, updatedTicket } = action.payload
      const projectTracker = state.projectTracker

      changeTicketStatus(initialStatus, projectTracker, state, updatedTicket)
    },
    deleteTicket: (state, action: PayloadAction<DeleteTicketReducer>) => {
      const { status, ticketId } = action.payload
      state.projectTracker[status] = state.projectTracker[status].filter(
        ticket => ticket._id !== ticketId
      )
    },
    deleteCommentFromTicket: (
      state,
      action: PayloadAction<AddCommentToTicketReducer>
    ) => {
      const { commentId, ticketId, ticketStatus } = action.payload
      const updatedTracker = state.projectTracker[ticketStatus].map(ticket => {
        if (ticket._id === ticketId) {
          ticket.comments = ticket.comments.filter(
            comment => comment !== commentId
          )
        }
        return ticket
      })
      state.projectTracker[ticketStatus] = updatedTracker
    },
    updateProject: (state, action: PayloadAction<ProjectInterface>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    updatePresenting: (
      state,
      action: PayloadAction<ProjectInterface['completedInfo']['presenting']>
    ) => {
      state.completedInfo.presenting = action.payload
    },
    updateDeployedUrl: (
      state,
      action: PayloadAction<ProjectInterface['completedInfo']['deployedUrl']>
    ) => {
      state.completedInfo.deployedUrl = action.payload
    },
    setProject: (state, action: PayloadAction<ProjectInterface>) => {
      const updatedProject = produce(action.payload, draft => {
        // assign the new instance to the initial state
        Object.assign(draft, action.payload)
        if (action.payload._id && action.payload._id !== 'waitlist') {
          const { engineers, designers, productManagers } = draft.members
          draft.members.emailMap = mapMembersByEmail([
            engineers,
            designers,
            productManagers,
          ])
          draft.members.idMap = mapMembersById([
            engineers,
            designers,
            productManagers,
          ])

          draft.projectPortal = { renderProjectPortal: false }
          draft.projectPresented = false
        }
      })
      return updatedProject
    },
    setProjectLoading: (state, action) => {
      state.loading = action.payload
    },
    // TODO: should we create more generic loading state and component?
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
    setProjectPresented: (state, action) => {
      const { projectId, isPresented } = action.payload
      if (state._id === projectId) {
        state.projectPresented = isPresented
      }
    },
    renderProjectPortal: state => {
      state.projectPortal.renderProjectPortal =
        !state.projectPortal.renderProjectPortal
    },
  },
})

export const selectEngineerMembers = (state: RootState) =>
  state.project.members.engineers
export const selectDesignMembers = (state: RootState) =>
  state.project.members.designers
export const selectProductManagers = (state: RootState) =>
  state.project.members.productManagers

export const selectCalendarId = (state: RootState) => state.project.calendarId
export const selectCompletedInfo = (state: RootState) =>
  state.project.completedInfo

// TODO: Revisit this to replace the warning provoked by using selectMembersAsTeam
export const selectMembersAsTeam = createSelector(
  [selectDesignMembers, selectEngineerMembers, selectProductManagers],
  (engineers, designers, productManagers) => [
    ...designers,
    ...engineers,
    ...productManagers,
  ]
)

/**
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

export const selectUsersById = userIds => state => {
  return selectMembersById(state, userIds)
}

export const selectMembersByRole = createSelector(
  [selectEngineerMembers, selectDesignMembers, selectProductManagers],
  (engineers, designers, productManagers) => {
    return {
      engineers,
      designers,
      productManagers,
    }
  }
)

export const selectProject = (state: RootState) => state.project
export const selectProjectId = (state: RootState) => state.project._id
export const selectProjectPresented = (state: RootState) =>
  state.project.projectPresented
export const selectProjectTracker = (state: RootState) =>
  state.project.projectTracker
export const selectRenderProjectPortal = (state: RootState) =>
  state.project.projectPortal.renderProjectPortal
export const selectProjectTimeline = (state: RootState) =>
  state.project.timeline
export const selectProjectUiLoading = (state: RootState) =>
  state.project.loading

export const selectPresentationDate = createSelector(
  selectProjectTimeline,
  projectTimeline => {
    const presentationStartEST = generateDayJs(projectTimeline.endDate)
      .tz('America/New_York')
      .hour(13)
      .minute(0)
      .second(0)
      .add(7, 'day')
    const presentationEndEST = presentationStartEST.add(1, 'hour')

    return {
      startDateEST: presentationStartEST,
      endDateEST: presentationEndEST,
    }
  }
)

export const {
  addTicketToStatus,
  addCommentToTicket,
  updateTicketStatus,
  deleteTicket,
  deleteCommentFromTicket,
  moveTicketBetweenColumns,
  setProject,
  updateTicket,
  updateProject,
  updatePresenting,
  updateDeployedUrl,
  setProjectLoading,
  setProjectPresented,
  setProjectStart,
  setProjectSuccess,
  setProjectFailure,
  renderProjectPortal,
  reorderColumn,
} = projectSlice.actions

export default projectSlice.reducer

/**
 * Helpers
 *  moving this function to calendarHelpers breaks the app, need to look into why
 */

const determineRole = roleStr => {
  if (roleStr === 'UX Designer') {
    return 'designers'
  } else if (roleStr === 'Software Engineer') {
    return 'engineers'
  } else if (roleStr === 'Product Manager') {
    return 'productManagers'
  }
}

const changeTicketStatus = (
  initialStatus,
  projectTracker,
  state,
  updatedTicket
) => {
  const filteredInitialStatusColumn = projectTracker[initialStatus].filter(
    ticket => ticket._id !== updatedTicket._id
  )

  projectTracker[updatedTicket.status].push(updatedTicket)
  state.projectTracker[initialStatus] = filteredInitialStatusColumn
}

/**
 * @param {array} roles Array of roles in a project (Engineers, Designers)
 * @returns A map to identify that user by their role and index when using selectMembersByEmail()
 */
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

export const mapMembersById = roles => {
  const idMap = {}
  for (const role of roles) {
    for (let i = 0; i < role.length; i++) {
      const currMember = role[i]
      idMap[currMember._id] = {
        role: determineRole(currMember.role),
        index: i,
      }
    }
  }
  return idMap
}

/**
 * @param {string[]} ids Takes an array of user ids,
 *     then looks that user up using the role and index stored in the emailMap.
 * @returns An array of user objects
 */
const selectMembersById = createSelector(
  [state => state.project.members, (_, userIds: string[]) => userIds],
  (members, userIds) => {
    const { idMap } = members
    const noMembersPassed =
      !userIds ||
      userIds.length === 0 ||
      userIds[0] === 'Unassigned' ||
      userIds[0] === '' ||
      !idMap

    if (noMembersPassed) {
      return []
    }

    return userIds.reduce((allMembers, userId) => {
      const userInfo = idMap[userId]
      if (userInfo) {
        if (userInfo.role != null && userInfo.index != null) {
          const roleMembers = members[userInfo.role]
          if (roleMembers && roleMembers[userInfo.index]) {
            allMembers.push(roleMembers[userInfo.index])
          }
        }
      }
      return allMembers
    }, [])
  }
)
