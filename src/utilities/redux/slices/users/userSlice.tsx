import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiSliceInterface, UserInterface } from '../../../types/UserInterface';
import { RootState } from '../../store';

const initialState: UiSliceInterface = {
  auth: {
    user: {
      bio: '',
      email: '',
      firstName: '',
      lastName: '',
      linkedinUrl: '',
      portfolioUrl: '',
      profilePicture: '',
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
