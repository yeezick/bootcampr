import { Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { clearStates, selectUserId } from 'utils/redux/slices/userSlice'
import { logOut } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { buildPortal, navigateToDomain } from 'utils/helpers'

export const AccountDropdown = ({ anchorEl, setAnchorEl }) => {
  const userId = useSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleClose = e => {
    setAnchorEl(null)

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
      autoFocus={false}
    >
      <MenuItem onClick={handleClose}>My profile</MenuItem>
      <MenuItem onClick={handleClose}>Settings</MenuItem>
      <MenuItem onClick={handleClose}>Log out</MenuItem>
    </Menu>
  )
}
