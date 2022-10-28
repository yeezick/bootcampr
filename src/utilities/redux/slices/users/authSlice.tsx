import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignUpInterface } from '../../../Interface/SignUpInterface';
import { signUp } from "../../../api/users";
import { RootState } from '../../store'

// TODO: move higher
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: SignUpInterface | null
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const register = createAsyncThunk(
  'sign-up',
  async (user: SignUpInterface, thunkAPI) => {
    try {
      return await signUp(user)
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to register!')
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
  }
})

export const { reset } = authSlice.actions

export const selectedUser = (state: RootState) => {
  return state.auth
}

export default authSlice.reducer