import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit'
import {
  AvailabilityInterface,
  Payment,
  SignUpInterface,
  UserInterface,
} from 'interfaces/UserInterface'
import { signUp, updateUser } from 'utils/api/users'
import { emptyUser, initialUserSliceState } from 'utils/data/userConstants'
import { RootState } from 'utils/redux/store'
import { TimezonesUTC } from 'utils/data/timeZoneConstants'
import { UpdateUserReducer } from 'interfaces/UserReducers'
import { produce } from 'immer'
import { generateDefaultPicture } from 'utils/helpers'
import { selectCompletedInfo } from './projectSlice'

// todo: auth.status should be its own slice
// todo: sidemenu & ui like notifications should be its own slice
// todo: avatar should be consolidated with user slice
// todo: lint errors can be fixed by renaming this module with .ts, this causes an issue with SVG component below.

export const register = createAsyncThunk(
  'users/signUp',
  async (user: SignUpInterface | any, thunkAPI: any) => {
    try {
      const res = await signUp(user)
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to register!')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'users/updateUser',
  async (user: UserInterface, thunkAPI) => {
    try {
      const res = await updateUser(user._id, user)
      if (res) {
        reset()
        return res
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to update user!')
    }
  }
)

const userSlice = createSlice({
  name: 'ui',
  initialState: initialUserSliceState,
  reducers: {
    clearStates: state => {},
    logoutAuthUser: state => {
      state.auth.user = emptyUser
    },
    setAuthUser: (state, action: PayloadAction<UserInterface>) => {
      const authUserPayload = produce(action.payload, draft => {
        const user = action.payload
        const sandboxOrWaitlistUser =
          !user.projects.activeProject && !user.projects.projects.length
        if (sandboxOrWaitlistUser) {
          draft.projects.activeProject = 'sandbox'
        }
      })
      state.auth.user = authUserPayload
    },
    setAuthUserLoading: (state, action) => {
      state.status.isLoading = action.payload
    },
    updateAuthUser: (state, action: PayloadAction<UpdateUserReducer>) => {
      state.auth.user = {
        ...state.auth.user,
        ...action.payload,
      }
    },
    updateUserExperience: (state, action: PayloadAction<Payment>) => {
      state.auth.user.payment = action.payload
    },
    updateUserProject: (state, action: PayloadAction<string>) => {
      state.auth.user.projects.activeProject = action.payload
    },
    setConfirmationEmailAddress: (state, action: PayloadAction<string>) => {
      state.auth.user.email = action.payload
    },
    setUserAvailability: (
      state,
      action: PayloadAction<AvailabilityInterface>
    ) => {
      state.auth.user.availability = action.payload
    },
    setUserTimezone: (state, action: PayloadAction<TimezonesUTC>) => {
      state.auth.user.timezone = action.payload
    },
    updateUnreadMessagesObj: (state, action: PayloadAction<object>) => {
      state.auth.user.unreadMessages = action.payload
    },
    reset: state => {
      state.status.isLoading = false
      state.status.isSuccess = false
      state.status.isError = { status: false }
    },
    setUploadedImage: (state, action: PayloadAction<string | null>) => {
      const uploadedImage = action.payload
      state.auth.user.profilePicture = uploadedImage
    },
    setDefaultProfilePicture: (state, action: PayloadAction<boolean>) => {
      if (!state.auth.user.profilePicture) {
        state.auth.user.profilePicture = generateDefaultPicture(
          state.auth.user.firstName,
          state.auth.user.lastName
        )
      }
    },
  },
  extraReducers: builder => {
    builder
      // REGISTER
      .addCase(register.pending, state => {
        state.status.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status.isLoading = false
        state.status.isSuccess = true
        state.status.isAuthenticated = false
      })
      .addCase(register.rejected, state => {
        state.status.isLoading = false
        state.status.isError = { status: true, message: register }
      })
      // UPDATE USER
      .addCase(updateProfile.pending, state => {
        state.status.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status.isLoading = false
        state.status.isSuccess = true
        state.status.isAuthenticated = true
        state.auth.user = action.payload
      })
      .addCase(updateProfile.rejected, state => {
        state.status.isLoading = false
        state.status.isError = { status: true }
      })
  },
})

export const selectUserAvailability = (state: RootState) =>
  state.ui.auth.user.availability
export const getUserTimezone = (state: RootState) => state.ui.auth.user.timezone
export const getUserProfileImage = (state: RootState) =>
  state.ui.auth.user.profilePicture
export const selectAuthUser = (state: RootState) => state.ui.auth.user
export const selectUserEmail = (state: RootState) => state.ui.auth.user.email
export const selectUserProjectId = (state: RootState) =>
  state.ui.auth.user.projects.activeProject
export const selectUserId = (state: RootState) => state.ui.auth.user._id
export const selectUserExperience = (state: RootState) =>
  state.ui.auth.user.payment.experience
export const selectUserPayment = (state: RootState) =>
  state.ui.auth.user.payment
export const uiStatus = (state: RootState) => state.ui.status

// user status
export const selectIsActiveUser = createSelector(
  [selectUserPayment],
  payment => payment.experience === 'active' && payment.paid
)

export const selectIsInactiveUser = createSelector(
  [selectUserPayment],
  payment => payment.experience === 'inactive' && !payment.paid
)

export const selectIsRecurringUser = createSelector(
  [selectUserPayment],
  payment => payment.experience === 'recurring' && payment.paid
)

export const selectIsRecurringUnpaidUser = createSelector(
  [selectCompletedInfo, selectUserPayment],
  (projectCompletion, payment) => {
    const projectSubmitted =
      projectCompletion.presenting !== null &&
      projectCompletion.deployedUrl?.length !== 0
    const unpaidUser = payment.experience === 'recurring' && !payment.paid
    return projectSubmitted && unpaidUser
  }
)

export const selectUserHasMultipleProjects = createSelector(
  [selectAuthUser],
  user => user.projects.projects.length > 1
)

export const selectUserProjectList = createSelector(
  [selectAuthUser, selectIsRecurringUser],
  (user, isRecurringUser) => {
    const projectsWithSandbox = isRecurringUser
      ? [...user.projects.projects, 'waitlist']
      : user.projects.projects

    return projectsWithSandbox.reduce((projects, id, index) => {
      projects.push({ label: `Project ${index + 1}`, projectId: id })
      return projects
    }, [])
  }
)

export const {
  setAuthUser,
  setAuthUserLoading,
  updateAuthUser,
  updateUserExperience,
  updateUserProject,
  setUserAvailability,
  setUserTimezone,
  reset,
  logoutAuthUser,
  updateUnreadMessagesObj,
  setUploadedImage,
  setDefaultProfilePicture,
  clearStates,
} = userSlice.actions
export default userSlice.reducer
