import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
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
          vertical: snackBar.vertical ?? 'top',
          horizontal: snackBar.horizontal ?? 'right',
        }}
      />
    </div>
  )
}
