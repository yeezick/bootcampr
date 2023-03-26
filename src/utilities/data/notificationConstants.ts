import {
  NotificationInterface,
  NotificationState,
} from '../../interfaces/NotificationInterface'

export const notificationInitialState: NotificationState = {
  message: '',
  open: false,
  timeout: 5000,
  type: 'info',
}

export const emptyNotification: NotificationInterface = {
  message: '',
  read: false,
  title: '',
  type: 0,
  user: '',
  _id: '',
}
