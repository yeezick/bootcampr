import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SnackBarToastInterface } from 'interfaces/SnackBarToast'

const initialState: SnackBarToastInterface = {
  isOpen: false,
  message: '',
  duration: 3000,
  vertical: 'top',
  horizontal: 'center',
  snackbarStyle: '',
  severity: 'success',
}

/**
 * Creates a slice for avatar with a single reducer to set the image URL.
 */
const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    createSnackBar: (state, action: PayloadAction<SnackBarToastInterface>) => {
      state.isOpen = action.payload.isOpen
      state.message = action.payload.message
      state.duration = action.payload.duration
      state.vertical = action.payload.vertical
      state.horizontal = action.payload.horizontal
      state.snackbarStyle = action.payload.snackbarStyle
      state.severity = action.payload.severity
    },
  },
})

export const { createSnackBar } = snackBarSlice.actions

export default snackBarSlice.reducer
