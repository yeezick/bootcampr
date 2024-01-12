import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  isDisabled: true,
  projectUrl: '',
}

const projectCompletionSlice = createSlice({
  name: 'projectCompletion',
  initialState,
  reducers: {
    setIsLoadingTrue: state => {
      state.isLoading = true
    },
    setIsLoadingFalse: state => {
      state.isLoading = false
    },
    setIsDisabledTrue: state => {
      state.isDisabled = true
    },
    setIsDisabledFalse: state => {
      state.isDisabled = false
    },
    updateProjectUrl: (state, action) => {
      state.projectUrl = action.payload
    },
  },
})

export const selectIsLoading = state => state.projectCompletion.isLoading
export const selectIsDisabled = state => state.projectCompletion.isDisabled
export const selectProjectUrl = state => state.projectCompletion.projectUrl

export const {
  setIsLoadingTrue,
  setIsLoadingFalse,
  setIsDisabledTrue,
  setIsDisabledFalse,
  updateProjectUrl,
} = projectCompletionSlice.actions

export default projectCompletionSlice.reducer
