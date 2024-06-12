import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from '@reduxjs/toolkit'
import { UserInterface } from 'interfaces'
import { getAllTeamMembers } from 'utils/api'
import { RootState } from 'utils/redux/store'

const initialState = {
  members: [],
  membersMap: {},
  loading: false,
  error: null,
}

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

const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: initialState,
  reducers: {
    updateMembersMap: (state, action: PayloadAction<UserInterface[]>) => {
      const newMembers = action.payload
      newMembers.forEach(member => {
        state.members = [...state.members, member]
        state.membersMap[member._id] = member
      })
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeamMembers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.members = action.payload
        state.membersMap = action.payload.reduce((normalizedMember, member) => {
          normalizedMember[member._id] = member
          return normalizedMember
        }, {})
        state.loading = false
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const { updateMembersMap } = teamMembersSlice.actions

export const selectMembers = (state: RootState) => state.teamMembers.members
export const selectMembersMap = (state: RootState) =>
  state.teamMembers.membersMap
export default teamMembersSlice.reducer
