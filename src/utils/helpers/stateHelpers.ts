import { CalendarEvent } from 'interfaces/CalendarInterface'
import { getOneProject } from 'utils/api'
import { setProject } from 'utils/redux/slices/projectSlice'

export const handleFormInputChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setFormValues
) => {
  const { name, value } = e.target
  setFormValues(currForm => {
    return { ...currForm, [name]: value }
  })
}

export const storeUserProject = async (dispatch, projectId) => {
  if (projectId) {
    const randomUserProject = await getOneProject(projectId)
    dispatch(setProject(randomUserProject))
  }
}

export const convertGoogleEventsForCalendar = googleEvents => {
  const convertedEvents = []
  for (const singleEvent of googleEvents) {
    let currentEvent: CalendarEvent = {}
    const { start, end, summary } = singleEvent
    currentEvent.start = start.dateTime
    currentEvent.end = end.dateTime
    currentEvent.title = summary
    convertedEvents.push(currentEvent)
  }
  return convertedEvents
}
