import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SideMenuInterface, UiInterface } from 'interfaces'

const initialState: UiInterface = {
  sideMenu: {
    active: false,
    links: [],
    pageTitle: '',
    title: '',
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
        links: [],
        pageTitle: '',
        title: '',
      }
    },
  },
})

export const selectSideMenu = state => state.userInterface.sideMenu
export const { setSideMenu, resetSideMenu } = userInterface.actions
export default userInterface.reducer
