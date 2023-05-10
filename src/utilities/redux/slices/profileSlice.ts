import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileState } from 'utilities/types/ProfileImageInterfaces'

const initialState: ProfileState = {
  uploadedImage: null,
}

/**
 * Creates a slice for profile with two reducers: one to set the uploaded image and another to remove it.
 */
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUploadedImage: (state, action: PayloadAction<string>) => {
      state.uploadedImage = action.payload
    },
    removeUploadedImage: state => {
      state.uploadedImage = null
    },
  },
})

export const { setUploadedImage, removeUploadedImage } = profileSlice.actions

export default profileSlice.reducer
