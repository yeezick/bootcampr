import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  Availability,
  SignUpInterface,
  UiSliceInterface,
  UserInterface,
} from 'interfaces/UserInterface'
import { signUp, updateUser } from 'utils/api/users'
import { defaultAvailability } from 'utils/data/userConstants'
import { RootState } from 'utils/redux/store'

// todo: auth.status should be its own slice
// todo: sidebar & ui like notifications should be its own slice
// todo: avatar should be consolidated with user slice

const initialState: UiSliceInterface = {
  auth: {
    user: {
      availability: defaultAvailability,
      bio: '',
      email: '',
      firstName: '',
      lastName: '',
      links: {
        githubUrl: '',
        linkedinUrl: '',
        portfolioUrl: null,
      },
      profilePicture: '',
      hasUploadedProfilePicture: true,
      project: '',
      role: '',
      unreadMessages: {},
      __v: 0,
      _id: '',
    },
  },
  status: {
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: {
      status: false,
      message: '',
    },
  },
}

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
  initialState,
  reducers: {
    logoutAuthUser: state => {
      // resetting authuser state
      state.auth.user = initialState.auth.user
    },
    setAuthUser: (state, action: PayloadAction<UserInterface>) => {
      state.auth.user = action.payload
    },
    updateAuthUser: (state, action: PayloadAction<UserInterface>) => {
      state.auth.user = {
        ...state.auth.user,
        ...action.payload,
      }
    },
    setUserAvailability: (state, action: PayloadAction<Availability>) => {
      state.auth.user.availability = action.payload
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
      state.auth.user.profilePicture = action.payload
    },
    setDefaultProfilePicture: state => {
      if (!state.auth.user.profilePicture) {
        const defaultProfilePicture = `${state.auth.user.firstName.charAt(
          0
        )}${state.auth.user.lastName.charAt(0)}`
        state.auth.user.profilePicture = defaultProfilePicture
        state.auth.user.hasUploadedProfilePicture = false
      }
    },
  },
  extraReducers: builder => {
    builder
      // REGISTER
      .addCase(register.pending, state => {
        state.status.isLoading = false
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

export const selectAuthUser = (state: RootState) => state.ui.auth.user
export const selectUserEmail = (state: RootState) => state.ui.auth.user.email
export const selectProjectId = (state: RootState) => state.ui.auth.user.project
export const selectUserId = (state: RootState) => state.ui.auth.user._id
export const getUserAvailability = (state: RootState) =>
  state.ui.auth.user.availability
export const uiStatus = (state: RootState) => state.ui.status
export const getUserProfileImage = (state: RootState) =>
  state.ui.auth.user.profilePicture
export const selectHasUploadedProfilePicture = (state: RootState) => {
  // console.log('hasUploadedProfilePicture in slice:', state.ui.auth.user.hasUploadedProfilePicture);
  return state.ui.auth.user.hasUploadedProfilePicture
}

export const {
  setAuthUser,
  updateAuthUser,
  setUserAvailability,
  reset,
  logoutAuthUser,
  updateUnreadMessagesObj,
  setUploadedImage,
  setDefaultProfilePicture,
} = userSlice.actions
export default userSlice.reducer
