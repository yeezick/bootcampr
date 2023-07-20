import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { SnackBarToastInterface } from 'interfaces/SnackBarToast'

export interface SnackBarToastProps {
  snackbarDescription?: React.Dispatch<
    React.SetStateAction<SnackBarToastInterface>
  >
  snackBar?: SnackBarToastInterface
  snackbarStyle?: string
}

export const SnackBarToast = ({
  snackbarDescription,
  snackBar,
  snackbarStyle,
}: SnackBarToastProps) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    snackbarDescription({ isOpen: false })
  }

  return (
    <div>
      <Snackbar
        className={snackbarStyle}
        open={snackBar.isOpen}
        autoHideDuration={snackBar.duration ?? 6000}
        onClose={handleClose}
        message={snackBar.message}
        anchorOrigin={{
          vertical: snackBar.vertical ?? 'bottom',
          horizontal: snackBar.horizontal ?? 'left',
        }}
      />
    </div>
  )
}
