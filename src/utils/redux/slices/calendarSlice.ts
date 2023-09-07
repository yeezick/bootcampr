import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CalendarInterface,
  ConvertedEvent,
  MeetingModalInfo,
  ModalDisplayStatus,
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
  modalDisplayStatus: false,
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addNewEvent: (state, action: PayloadAction<ConvertedEvent[]>) => {
      state.convertedEvents = [...state.convertedEvents, action.payload[0]]
      const { eventId } = action.payload[0]
      state.eventMap[eventId] = state.convertedEvents.length
    },
    updateExistingEvent: (state, action: PayloadAction<ConvertedEvent[]>) => {
      const convertedEventIdx = state.eventMap[action.payload[0].eventId]
      state.convertedEvents[convertedEventIdx] = action.payload[0]
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
  },
})

export const selectConvertedEventsAsArr = (state: RootState) =>
  state.calendar.convertedEvents

export const selectConvertedEventsById = (state: RootState) =>
  state.calendar.eventMap

export const selectDisplayedEvent = (state: RootState) =>
  state.calendar.displayedEvent

export const selectModalDisplayStatus = (state: RootState) =>
  state.calendar.modalDisplayStatus

export const {
  addNewEvent,
  updateExistingEvent,
  setDisplayedEvent,
  storeConvertedEvents,
  setModalDisplayStatus,
} = calendarSlice.actions

export default calendarSlice.reducer
