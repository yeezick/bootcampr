import { AlertColor } from '@mui/material';

export interface NotificationInterface {
  open?: boolean;
  type?: AlertColor;
  message?: string;
  timeout?: number | null;
}

export interface NotificationState {
  user: string;
  notification: string;
  message: string;
  read: boolean;
  _id: string;
}
