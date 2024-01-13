import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectUrl: '',
  participation: null,
}

const projectCompletionSlice = createSlice({
  name: 'projectCompletion',
  initialState,
  reducers: {
    updateProjectUrl: (state, action) => {
      state.projectUrl = action.payload
    },
    updateParticipation: (state, action) => {
      state.participation = action.payload
    },
  },
})

export const selectProjectUrl = state => state.projectCompletion.projectUrl
export const selectParticipation = state =>
  state.projectCompletion.participation

export const { updateProjectUrl, updateParticipation } =
  projectCompletionSlice.actions

export default projectCompletionSlice.reducer
