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
    setLogoutModalIsOpen(false)

    const { innerText } = e.target
    if (innerText === 'My profile') {
      window.open(`/users/${userId}`)
    } else if (innerText === 'Settings') {
      buildPortal(dispatch, 'settings', userId)
      navigateToDomain(navigate, `/users/${userId}/settings/email`, 'settings')
    } else if (innerText === 'Log out') {
      logOut()
      dispatch(clearStates())
      navigate('/')
    }
  }

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
        <MenuItem onClick={handleClose}>My profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={toggleModal}>Log out</MenuItem>
      </Menu>
      <CommonModal
        isOpen={logoutModalIsOpen}
        heading='Log out?'
        body='You worked hard. Enjoy yourself!'
        handleCancel={toggleModal}
        handleConfirm={handleClose}
        cancelButtonLabel='Cancel'
        confirmButtonLabel='Log out'
        customWidth={240}
      />
    </div>
  )
}
