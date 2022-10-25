import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../../../api/users";
import { UserInterface } from "../../../Interface/UserInterface"

export interface UserState {
  users: UserInterface[] | null;
  loading: boolean;
  singleUser: UserInterface | null
}

const initialState: UserState = {
  users: [],
  singleUser: null,
  loading: false
}

// actions are processes that get data from backend
// const getUsers = createAsyncThunk<UserInterface[]>(
//   'users/getUsers',
//   async (_, thunkAPI) => {
//     try {
//       const res = await getAllUsers();
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//   }
// )

// reducers -> reduce to a specific state -> changes state
const newUserProfileSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInterface[]>) => {
      state.users = action.payload
    }
  }
})

export const { setUsers } = newUserProfileSlice.actions
export default newUserProfileSlice.reducer
