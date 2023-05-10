import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AvatarState } from 'utilities/types/ProfileImageInterfaces'

const initialState: AvatarState = {
  imageUrl: null,
}

/**
 * Creates a slice for avatar with a single reducer to set the image URL.
 */
const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string | null>) => {
      state.imageUrl = action.payload
    },
  },
})

export const { setImageUrl } = avatarSlice.actions

export default avatarSlice.reducer
