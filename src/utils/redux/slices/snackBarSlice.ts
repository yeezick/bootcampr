import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CreateSnackbarPayload,
  SnackbarInterface,
} from 'interfaces/SnackBarToast'

const initialState: SnackbarInterface = {
  isOpen: false,
  message: '',
  severity: 'success',
}

const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    closeSnackBar: state => {
      return { isOpen: false, message: '', severity: state.severity }
    },
    createSnackBar: (state, action: PayloadAction<CreateSnackbarPayload>) => {
      state.isOpen = true
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
  },
})

export const { closeSnackBar, createSnackBar } = snackBarSlice.actions

export default snackBarSlice.reducer
