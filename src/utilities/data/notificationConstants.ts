import { NotificationInterface, NotificationState } from '../types/NotificationInterface';

export const notificationInitialState: NotificationInterface = {
  open: false,
  type: 'info',
  message: '',
  timeout: 5000,
};

export const emptyNotification: NotificationState = {
  user: '',
  notification: '',
  message: '',
  read: false,
  _id: '',
};
