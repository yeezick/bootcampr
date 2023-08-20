import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CalendarInterface, ConvertedEvent } from 'interfaces/CalendarInterface'
import { RootState } from 'utils/redux/store'
/** Context:
 * Used to manage the MeetingModal open/close state & rendered info.
 * This state should be empty if the Modal is not open.
 * On render will populate the relevant information.
 */

const initialState: CalendarInterface = {
  convertedEventsById: {},
  convertedEventsAsArr: [],
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    storeConvertedEvents: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEventsAsArr = action.payload
      for (const singleEvent of action.payload) {
        state.convertedEventsById[singleEvent.id] = singleEvent
      }
    },
    addNewEvent: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEventsAsArr = [
        ...state.convertedEventsAsArr,
        action.payload[0],
      ]
      for (const singleEvent of action.payload) {
        state.convertedEventsById[singleEvent.id] = singleEvent
      }
    },
  },
})

export const selectArrayOfConvertedEvents = (state: RootState) =>
  state.calendar.convertedEventsAsArr
export const { addNewEvent, storeConvertedEvents } = calendarSlice.actions
export default calendarSlice.reducer
