import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { Banner, BuildPortal, UiInterface } from 'interfaces'

const initialState: UiInterface = {
  banner: {
    active: false,
    type: '',
  },
  portal: {
    active: false,
  },
  sideMenu: {
    active: false,
    links: [],
  },
}

// maybe "LayoutSlice" is a better name
const userInterface = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    resetPortal: state => {
      return initialState
    },
    setBanner: (state, action: PayloadAction<Banner>) => {
      return { ...state, banner: action.payload }
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

export const selectBanner = state => state.userInterface.banner
export const selectSideMenu = state => state.userInterface.sideMenu
export const selectPortal = state => state.userInterface.portal
export const { resetPortal, setBanner, setPortal, setPortalPage } =
  userInterface.actions
export default userInterface.reducer
