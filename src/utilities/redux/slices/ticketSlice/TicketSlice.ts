import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ticketInterface } from '../../../types/TicketInterFace'
import { UserInterface } from 'utilities/types/UserInterface'
import { RootState } from 'utilities/redux/store'
const initialState: ticketInterface = {
  ticket: {
    id: '',
    title: '',
    type: '',
    description: '',
    assignees: [],
  },
}
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
})
export const ticket = (state: RootState) => state.ui.auth.user
export const uiStatus = (state: RootState) => state.ui.status
