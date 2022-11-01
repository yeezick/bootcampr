import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SignUpInterface, UiSliceInterface, UserInterface } from '../../../types/UserInterface';
import { signUp } from '../../../api/users';
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
    isLoading: false,
    isSuccess: false,
    isError: {
      status: false,
      message: ''
    }
  },
};

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

const usersSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<UserInterface>) => {
      state.auth.user = action.payload;
    },
    reset: (state) => {
      state.status.isLoading = false;
      state.status.isSuccess = false;
      state.status.isError = { status: false };
    }
    
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.status.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.status.isSuccess = true;
        state.auth.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.status.isLoading = false;
        state.status.isError = { status: true };
      })
  }
});

export const selectAuthUser = (state: RootState) => state.ui.auth.user;
export const { setAuthUser, reset } = usersSlice.actions;
export default usersSlice.reducer;
