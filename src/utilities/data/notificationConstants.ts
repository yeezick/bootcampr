import { NotificationState } from '../types/NotificationInterface';

export const notificationInitialState: NotificationState = {
  open: false,
  type: 'info',
  message: '',
  timeout: 5000,
};
