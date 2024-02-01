import { useEffect, useState } from 'react'
import { Menu, MenuItem, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logoutAuthUser, selectUserId } from 'utils/redux/slices/userSlice'
import { logOut } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { buildPortal, navigateToDomain } from 'utils/helpers'

export const AccountDropdown = ({ anchorEl, closeDropdown }) => {
  const [open, setOpen] = useState(false)
  const userId = useSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (anchorEl) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [anchorEl])

  const handleClose = (e, bypassSelection?) => {
    closeDropdown()
    setOpen(false)
    if (bypassSelection) return

    const { innerText } = e.target
    if (innerText === 'View Profile') {
      navigate(`/users/${userId}`)
    } else if (innerText === 'Settings') {
      buildPortal(dispatch, 'settings', userId)
      navigateToDomain(navigate, `/users/${userId}/settings/email`, 'settings')
    } else if (innerText === 'Log out') {
      logOut()
      dispatch(logoutAuthUser())
      navigate('/')
    }
  }

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={e => handleClose(e, false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          paper: 'custom-menu-paper',
        }}
      >
        <MenuItem onClick={handleClose}>View Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Log out</MenuItem>
      </Menu>
    </div>
  )
}
