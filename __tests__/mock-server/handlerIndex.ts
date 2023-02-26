import { calendarHandlers } from './handlers/calendarHandlers'
import { chatHandlers } from './handlers/chatHandlers'
import { kanbanHandlers } from './handlers/kanbanHandlers'
import { userHandlers } from './handlers/userHandlers'

export const handlers = [
  ...calendarHandlers,
  ...chatHandlers,
  ...kanbanHandlers,
  ...userHandlers,
]
