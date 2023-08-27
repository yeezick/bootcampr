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
  eventMap: {},
  convertedEvents: [],
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEvents = [...state.convertedEvents, action.payload[0]]
      const { id: eventId } = action.payload[0]
      state.eventMap[eventId] = state.convertedEvents.length
    },
    toggleMeetingModal: (
      state,
      action: PayloadAction<MeetingModalVisibility>
    ) => {
      state.currentEvent.visibility = action.payload
    },
    storeConvertedEvents: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEvents = action.payload
      for (let idx = 0; idx < action.payload.length; idx++) {
        const { id: eventId } = action.payload[idx]
        state.eventMap[eventId] = idx
      }
    },
    setCurrentEvent: (state, action: PayloadAction<MeetingModalInfo>) => {
      state.currentEvent = action.payload
    },
  },
})

export const selectConvertedEventsAsArr = (state: RootState) =>
  state.calendar.convertedEvents

export const selectConvertedEventsById = (state: RootState) =>
  state.calendar.eventMap

export const selectCurrentEvent = (state: RootState) =>
  state.calendar.currentEvent
export const {
  addNewEvent,
  setCurrentEvent,
  storeConvertedEvents,
  toggleMeetingModal,
} = calendarSlice.actions
export default calendarSlice.reducer
