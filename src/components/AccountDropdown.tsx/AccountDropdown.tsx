import { useEffect, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const AccountDropdown = ({ anchorEl, onSelection, closeDropdown }) => {
  const [open, setOpen] = useState(false)
  const userId = useSelector(selectUserId)

  useEffect(() => {
    if (anchorEl) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [anchorEl])

  const handleClose = (executeSelection?) => {
    if (executeSelection) {
      onSelection()
    }
    closeDropdown()
    setOpen(false)
  }

  return (
    <div>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(false)}>
        <MenuItem onClick={handleClose}>
          <Link to={`/users/${userId}`}>View Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={`/users/${userId}/settings`}>Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={`/users/${userId}/`}>Log out</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}
