import { api } from './apiConfig'
import { buildSandboxEvent } from 'utils/helpers'
import { EventInfo } from 'interfaces'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const createEvent = async (calendarId: string, eventInfo: EventInfo) => {
  try {
    if (calendarId === 'sandbox') {
      return buildSandboxEvent(eventInfo)
    } else {
      const res = await api.post(
        `/calendar/${calendarId}/createEvent`,
        eventInfo
      )
      return res.data
    }
  } catch (error) {
    throw error
  }
}

export const updateEvent = async (calendarId: string, eventId, eventInfo) => {
  try {
    if (calendarId === 'sandbox') {
      return buildSandboxEvent(eventInfo, eventId)
    } else {
      const res = await api.put(
        `/calendar/${calendarId}/updateEvent/${eventId}`,
        eventInfo
      )
      return res.data
    }
  } catch (error) {
    throw error
  }
}

export const deleteEvent = async (calendarId: string, eventId) => {
  try {
    if (isSandboxId(calendarId)) {
      return
    }

    const res = await api.delete(
      `/calendar/${calendarId}/fetchEvent/${eventId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteRecurringEvents = async (calendarId: string, eventId) => {
  try {
    if (isSandboxId(calendarId)) {
      return
    }

    const response = await api.delete(
      `/calendar/${calendarId}/recurringEvents/${eventId}`
    )

    if (response) {
      console.log('Instance deleted successfully.')
      // Update UI accordingly
    } else {
      console.error('Error deleting instance.')
    }
  } catch (error) {
    console.error('Error deleting instance:', error)
  }
}

export const fetchRecurringEvents = async (calendarId: string, eventId) => {
  try {
    const instances = await api.get(
      `/calendar/${calendarId}/recurringEvents/${eventId}`
    )

    if (!instances) {
      console.error('No instances found in response.')
      return
    }

    return instances.data
  } catch (error) {
    console.error('Error fetching instance:', error)
  }
}

export const deleteSpecificInstance = async (
  calendarId: string,
  recurringEventId: string,
  startDateTime: string
) => {
  try {
    const instances = await fetchRecurringEvents(calendarId, recurringEventId)
    console.log(instances)
    const instanceToDelete = instances.find(instance => {
      const instanceTimezone = instance.timeZone

      let targetStart = dayjs
        .tz(startDateTime, instanceTimezone)
        .format('YYYY-MM-DDTHH:mm:ssZ') // Convert target start to the same time zone
      let instanceStart = instance.start
      console.log(targetStart, instanceStart)
      return targetStart === instanceStart
    })

    console.log(instanceToDelete)

    if (instanceToDelete) {
      await deleteEvent(calendarId, instanceToDelete.eventId)
      return instanceToDelete.eventId
    } else {
      console.error('No instance found to delete.')
      return null
    }
  } catch (error) {
    console.error('Error deleting specific instance:', error)
    return null
  }
}
