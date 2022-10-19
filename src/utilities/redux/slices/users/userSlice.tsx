import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOneUser, getAllUsers } from '../../../api/users';
import { UserInterface } from '../../../Interface/UserInterface';
import { RootState } from '../../store';

export interface UserState {
  authUser: UserInterface | null;
}

const initialState: UserState = {
  authUser: null,
};

const usersSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hi: (state, action: PayloadAction<any>) => {
      console.log(state.authUser, 'hello');
    },
    setAuthUser: (state, action: PayloadAction<UserInterface>) => {
      state.authUser = action.payload;
    },
  },
});

export const selectAuthUser = (state: RootState) => state.ui.authUser;
export const { hi, setAuthUser } = usersSlice.actions;
export default usersSlice.reducer;
