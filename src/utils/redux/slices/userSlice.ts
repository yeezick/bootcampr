import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  SignUpInterface,
  UiSliceInterface,
  UserInterface,
} from 'interfaces/UserInterface'
import { signUp, updateUser } from 'utils/api/users'
import { defaultAvailability } from 'utils/data/userConstants'
import { RootState } from 'utils/redux/store'

const initialState: UiSliceInterface = {
  auth: {
    user: {
      availability: defaultAvailability,
      bio: '',
      email: '',
      firstName: '',
      githubUrl: '',
      lastName: '',
      linkedinUrl: '',
      portfolioUrl: '',
      profilePicture: '',
      role: '',
      __v: 0,
      _id: '',
    },
  },
  sidebar: {
    visibleSidebar: false,
  },
  chat: {
    visibleChat: false,
    _id: '',
    isGroup: false,
    participants: [],
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
      state.auth.user = action.payload
    },
    toggleSidebar: state => {
      state.sidebar.visibleSidebar = !state.sidebar.visibleSidebar
    },
    toggleSidebarClose: state => {
      state.sidebar.visibleSidebar = false
    },
    toggleChat: state => {
      state.chat.visibleChat = !state.chat.visibleChat
    },
    toggleChatClose: state => {
      state.chat.visibleChat = false
    },
    setCurrentConversation: (
      state,
      action: PayloadAction<{
        _id: string
        isGroup: boolean
        participants: any
      }>
    ) => {
      state.chat._id = action.payload._id
      state.chat.isGroup = action.payload.isGroup
      state.chat.participants = action.payload.participants
    },
    reset: state => {
      state.status.isLoading = false
      state.status.isSuccess = false
      state.status.isError = { status: false }
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
export const chatStatus = (state: RootState) => state.ui.chat.visibleChat
export const selectConversation = (state: RootState) => state.ui.chat
export const uiStatus = (state: RootState) => state.ui.status
export const {
  setAuthUser,
  updateAuthUser,
  reset,
  logoutAuthUser,
  toggleSidebar,
  toggleSidebarClose,
  toggleChat,
  toggleChatClose,
  setCurrentConversation,
} = userSlice.actions
export default userSlice.reducer
