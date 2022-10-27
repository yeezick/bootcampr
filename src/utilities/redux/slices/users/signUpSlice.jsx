import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpInterface } from '../../../Interface/SignUpInterface';
import { signUp } from "../../../api/users";

export interface SignupState{
  signUpUser: SignUpInterface | null
}

const initialState: SignupState = {
  signUpUser: null
}

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers:{
    signUpUser: (state, action: PayloadAction<SignUpInterface>) => {
      const authUser = action.payload
      console.log(authUser);
      const successfulSignUp = async() => {
      const newUser = await signUp({authUser})
      }
      successfulSignUp()
    }
  }
})

export const {signUpUser} = signUpSlice.actions
export default signUpSlice.reducer