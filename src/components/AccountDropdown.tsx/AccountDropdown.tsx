import { Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logoutAuthUser, selectUserId } from 'utils/redux/slices/userSlice'
import { logOut } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { buildPortal, navigateToDomain } from 'utils/helpers'
import { toggleChatClose } from 'utils/redux/slices/chatSlice'

export const AccountDropdown = ({ anchorEl, setAnchorEl }) => {
  const userId = useSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleClose = e => {
    setAnchorEl(null)

    const { innerText } = e.target
    if (innerText === 'View Profile') {
      window.open(`/users/${userId}`)
    } else if (innerText === 'Settings') {
      buildPortal(dispatch, 'settings', userId)
      navigateToDomain(navigate, `/users/${userId}/settings/email`, 'settings')
    } else if (innerText === 'Log out') {
      logOut()
      dispatch(logoutAuthUser())
      dispatch(toggleChatClose())
      navigate('/')
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={e => handleClose(e)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='custom-menu-paper'
      sx={{ margin: '13px 25px' }}
      autoFocus={false}
    >
      <MenuItem onClick={handleClose}>View Profile</MenuItem>
      <MenuItem onClick={handleClose}>Settings</MenuItem>
      <MenuItem onClick={handleClose}>Log out</MenuItem>
    </Menu>
  )
}
