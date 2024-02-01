import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuildPortal, UiInterface } from 'interfaces'

const initialState: UiInterface = {
  portal: {
    active: false,
  },
  sideMenu: {
    active: false,
    links: [],
  },
}

const userInterface = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    resetPortal: state => {
      state.portal = {
        active: false,
      }
      state.sideMenu = {
        active: false,
        links: [],
      }
    },
    setPortal: (state, action: PayloadAction<BuildPortal>) => {
      const { portal, sideMenu } = action.payload
      state.portal = portal
      state.sideMenu = sideMenu
    },
    setPortalPage: (state, action: PayloadAction<string>) => {
      state.portal.headerTitle = action.payload
    },
  },
})

export const selectSideMenu = state => state.userInterface.sideMenu
export const selectPortal = state => state.userInterface.portal
export const { resetPortal, setPortal, setPortalPage } = userInterface.actions
export default userInterface.reducer
