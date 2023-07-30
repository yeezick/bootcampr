import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  Availability,
  SignUpInterface,
  UiSliceInterface,
  UserInterface,
} from 'interfaces/UserInterface'
import { signUp, updateUser } from 'utils/api/users'
import { defaultAvailability } from 'utils/data/userConstants'
import { RootState } from 'utils/redux/store'
import PersonIcon from '@mui/icons-material/Person'

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
      project: '', // should be projetId
      development
      role: '',
      __v: 0,
      _id: '',
    },
  },
  sidebar: {
    visibleSidebar: false,
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
    toggleSidebar: state => {
      state.sidebar.visibleSidebar = !state.sidebar.visibleSidebar
    },
    toggleSidebarClose: state => {
      state.sidebar.visibleSidebar = false
    },
    reset: state => {
      state.status.isLoading = false
      state.status.isSuccess = false
      state.status.isError = { status: false }
    },
    setUploadedImage: (state, action: PayloadAction<string | null>) => {
      state.auth.user.profilePicture = action.payload
    },
    removeUploadedImage: state => {
      const personIconSvg = renderToStaticMarkup(
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <PersonIcon fill='#afadad' />
        </svg>
      )

      const personIconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
        personIconSvg
      )}`
      state.auth.user.profilePicture = personIconUrl
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
export const selectUserId = (state: RootState) => state.ui.auth.user._id
export const getUserAvailability = (state: RootState) =>
  state.ui.auth.user.availability
export const uiStatus = (state: RootState) => state.ui.status
export const getUserProfileImage = (state: RootState) =>
  state.ui.auth.user.profilePicture
export const {
  setAuthUser,
  updateAuthUser,
  setUserAvailability,
  reset,
  logoutAuthUser,
  toggleSidebar,
  toggleSidebarClose,
  setUploadedImage,
  removeUploadedImage,
} = userSlice.actions
export default userSlice.reducer
