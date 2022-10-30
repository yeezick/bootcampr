import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { UiSliceInterface, UserInterface } from '../../../types/UserInterface';
import { RootState } from '../../store';

const initialState: UiSliceInterface = {
  auth: {
    user: {
      about: '',
      email: '',
      member_of_projects: null,
      first_name: '',
      fun_fact: '',
      interested_projects: null, // ID of projects
      last_name: '',
      portfolio_projects: null,
      portfolio_link: '',
      show_portfolio: true,
      rejected_projects: null, // ID of projects
      role: '',
      __v: 0,
      _id: '',
    },
  },
  status: {
    isAuthenticated: false,
  },
};

const usersSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<UserInterface>) => {
      state.auth.user = action.payload;
    },
  },
});

export const selectAuthUser = (state: RootState) => state.ui.auth.user;
export const { setAuthUser } = usersSlice.actions;
export default usersSlice.reducer;
