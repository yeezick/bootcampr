import { AlertColor } from '@mui/material';

export interface NotificationState {
  message?: string;
  open?: boolean;
  timeout?: number | null;
  type?: AlertColor;
}

export interface NotificationInterface {
  message: string;
  title: string;
  read: boolean;
  type: number;
  user: string;
  _id: string;
}
