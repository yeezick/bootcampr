import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllTeamMembers } from 'utils/api'
import { RootState } from 'utils/redux/store'
import { fetchThreads } from './chatSlice'

export const fetchTeamMembers = createAsyncThunk(
  'teamMembers/fetchTeamMembers',
  async (authUserId: string, thunkAPI) => {
    try {
      const members = await getAllTeamMembers(authUserId)
      return members
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const initializeMembers = createAsyncThunk(
  'teamMembers/initialize',
  async (authUserId: string, thunkAPI) => {
    await thunkAPI.dispatch(fetchTeamMembers(authUserId))
    await thunkAPI.dispatch(fetchThreads())
  }
)

const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: {
    members: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeamMembers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.members = action.payload
        state.loading = false
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const selectMembers = (state: RootState) => state.teamMembers.members
export default teamMembersSlice.reducer
