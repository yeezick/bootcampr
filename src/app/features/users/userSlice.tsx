import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOneUser } from '../../../api/users';

export interface UserState {
  users: any;
}

const initialState: UserState = {
  users: getOneUser(),
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getCurrentUser: (state, action: PayloadAction<any>) => {
      return state.users;
    },
  },
});

export const { getCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
