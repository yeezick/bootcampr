import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CalendarInterface,
  ConvertedEvent,
  MeetingModalInfo,
  MeetingModalVisibility,
} from 'interfaces/CalendarInterfaces'
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
    addNewEvent: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEventsAsArr = [
        ...state.convertedEventsAsArr,
        action.payload[0],
      ]
      for (const singleEvent of action.payload) {
        state.convertedEventsById[singleEvent.id] = singleEvent
      }
    },
    toggleMeetingModal: (
      state,
      action: PayloadAction<MeetingModalVisibility>
    ) => {
      state.currentEvent.visibility = action.payload
    },
    storeConvertedEvents: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEventsAsArr = action.payload
      for (const singleEvent of action.payload) {
        state.convertedEventsById[singleEvent.id] = singleEvent
      }
    },

    setCurrentEvent: (state, action: PayloadAction<MeetingModalInfo>) => {
      state.currentEvent = action.payload
    },
  },
})

export const selectConvertedEventsAsArr = (state: RootState) =>
  state.calendar.convertedEventsAsArr

export const selectConvertedEventsById = (state: RootState) =>
  state.calendar.convertedEventsById

export const selectCurrentEvent = (state: RootState) =>
  state.calendar.currentEvent
export const {
  addNewEvent,
  setCurrentEvent,
  storeConvertedEvents,
  toggleMeetingModal,
} = calendarSlice.actions
export default calendarSlice.reducer
