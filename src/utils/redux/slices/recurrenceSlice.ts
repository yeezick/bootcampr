import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'utils/redux/store'

interface CustomRecurrence {
  recurrenceLabel: string
  daysOfWeek: string[]
  userId: string
}

interface RecurrenceState {
  recurrence: string
  customRecurrences: CustomRecurrence[]
}

const initialState: RecurrenceState = {
  recurrence: 'one-time',
  customRecurrences: [],
}

const recurrenceSlice = createSlice({
  name: 'recurrence',
  initialState,
  reducers: {
    setRecurrence: (state, action: PayloadAction<string>) => {
      state.recurrence = action.payload
    },
    addCustomRecurrence: (state, action: PayloadAction<CustomRecurrence>) => {
      state.customRecurrences.push(action.payload)
    },
    setCustomRecurrences: (
      state,
      action: PayloadAction<CustomRecurrence[]>
    ) => {
      state.customRecurrences = action.payload
    },
  },
})

export const selectRecurrence = (state: RootState) =>
  state.recurrence.recurrence
export const selectCustomRecurrences = (state: RootState) =>
  state.recurrence.customRecurrences

export const { setRecurrence, addCustomRecurrence, setCustomRecurrences } =
  recurrenceSlice.actions

export default recurrenceSlice.reducer
