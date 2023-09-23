import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SideMenuInterface, UiInterface } from 'interfaces'

const initialState: UiInterface = {
  sideMenu: {
    active: false,
    title: '',
    links: [],
  },
}

const userInterface = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    setSideMenu: (state, action: PayloadAction<SideMenuInterface>) => {
      state.sideMenu = action.payload
    },
    resetSideMenu: state => {
      state.sideMenu = {
        active: false,
        title: '',
        links: [],
      }
    },
  },
})

export const selectSideMenu = state => state.userInterface.sideMenu
export const { setSideMenu, resetSideMenu } = userInterface.actions
export default userInterface.reducer
