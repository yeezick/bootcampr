import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '../../../types/UserInterface';
import { ProjectInterface } from '../../../types/ProjectInterface';
import { RootState } from '../../store';
import { stat } from 'fs';

interface UserProperties {
  about?: string;
  email?: string;
  member_of_projects?: ProjectInterface[];
  first_name?: string;
  fun_fact?: string;
  interested_projects?: string[]; // ID of projects
  last_name?: string;
  portfolio_projects?: object;
  portfolio_link?: string;
  show_portfolio?: boolean;
  rejected_projects?: string[]; // ID of projects
  role?: string;
  _id?: string;
}

interface UserState {
  // do we need this type?
  authUser: UserInterface | null;
}

const initialState: UserState = {
  authUser: null,
};

const usersSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<UserInterface>) => {
      state.authUser = action.payload;
    },
  },
});

export const selectAuthUser = (state: RootState) => state.ui.authUser;
export const { setAuthUser } = usersSlice.actions;
export default usersSlice.reducer;
