import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CalendarInterface,
  ConvertedEvent,
  MeetingModalInfo,
  ModalDisplayStatus,
} from 'interfaces'
import { RootState } from 'utils/redux/store'

/** Context:
 * Used to manage the MeetingModal open/close state & rendered info.
 * This state should be empty if the Modal is not open.
 * On render will populate the relevant information.
 */
const initialState: CalendarInterface = {
  eventMap: {},
  convertedEvents: [],
  modalDisplayStatus: false,
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<ConvertedEvent>) => {
      state.convertedEvents = [...state.convertedEvents, action.payload]
      const { eventId } = action.payload
      state.eventMap[eventId] = state.convertedEvents.length
    },
    updateExistingEvent: (state, action: PayloadAction<ConvertedEvent>) => {
      state.convertedEvents = state.convertedEvents.map(event =>
        event.eventId === action.payload.eventId ? action.payload : event
      )
    },
    setModalDisplayStatus: (
      state,
      action: PayloadAction<ModalDisplayStatus>
    ) => {
      state.modalDisplayStatus = action.payload
    },
    storeConvertedEvents: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEvents = action.payload
      for (let idx = 0; idx < action.payload.length; idx++) {
        const { eventId } = action.payload[idx]
        state.eventMap[eventId] = idx
      }
    },
    setDisplayedEvent: (state, action: PayloadAction<MeetingModalInfo>) => {
      state.displayedEvent = action.payload
      state.modalDisplayStatus = 'display'
    },

    deleteEvent: (state, action) => {
      const { eventId } = action.payload
      state.convertedEvents.filter(event => event.eventId !== eventId)
    },
  },
})

export const selectConvertedEventsAsArr = (state: RootState) =>
  state.calendar.convertedEvents

export const selectConvertedEventsById = (state: RootState) =>
  state.calendar.eventMap

export const selectDisplayedEvent = (state: RootState) =>
  state.calendar.displayedEvent

export const selectHangoutLink = (state: RootState) =>
  state.calendar.displayedEvent.hangoutLink

export const selectModalDisplayStatus = (state: RootState) =>
  state.calendar.modalDisplayStatus

export const {
  addNewEvent,
  updateExistingEvent,
  setDisplayedEvent,
  storeConvertedEvents,
  setModalDisplayStatus,
  deleteEvent,
} = calendarSlice.actions

export default calendarSlice.reducer
