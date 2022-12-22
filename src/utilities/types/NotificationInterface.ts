import { AlertColor } from '@mui/material';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  open?: boolean;
  type?: AlertColor;
  message?: string;
  timeout?: number | null;
}
