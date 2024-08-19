import { Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { clearStates, selectUserId } from 'utils/redux/slices/userSlice'
import { logOut } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { buildPortal, navigateToDomain } from 'utils/helpers'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { useState } from 'react'

export const AccountDropdown = ({ anchorEl, setAnchorEl }) => {
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState<boolean>(false)
  const userId = useSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleClose = e => {
    setAnchorEl(null)
  }

  const handleMenuClick = (action: string) => {
    setAnchorEl(null)
    setLogoutModalIsOpen(false)

    if (action === 'logout') {
      logOut()
      dispatch(clearStates())
      navigate('/')
    } else if (action === 'profile') {
      window.open(`/users/${userId}`)
    } else if (action === 'settings') {
      buildPortal(dispatch, 'settings', userId)
      navigateToDomain(navigate, `/users/${userId}/settings/email`, 'settings')
    }
  }

  const handleLogoutConfirm = () => handleMenuClick('logout')
  const handleProfileClick = () => handleMenuClick('profile')
  const handleSettingsClick = () => handleMenuClick('settings')
  const toggleModal = () => setLogoutModalIsOpen(!logoutModalIsOpen)

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id='custom-menu-paper'
        autoFocus={false}
        disableScrollLock
        style={{
          width: '164px',
        }}
      >
        <MenuItem onClick={handleProfileClick}>My profile</MenuItem>
        <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
        <MenuItem onClick={toggleModal}>Log out</MenuItem>
      </Menu>
      <CommonModal
        isOpen={logoutModalIsOpen}
        heading='Log out?'
        body='You worked hard. Enjoy yourself!'
        handleCancel={toggleModal}
        handleConfirm={handleLogoutConfirm}
        cancelButtonLabel='Cancel'
        confirmButtonLabel='Log out'
        customWidth={240}
      />
    </div>
  )
}
