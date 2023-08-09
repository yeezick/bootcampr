import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { SnackBarToastProps } from 'interfaces/SnackBarToast'
import { Alert } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export const SnackBarToast = ({
  snackbarDescription,
  snackBar,
  snackbarStyle,
}: SnackBarToastProps) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
        anchorOrigin={{
          vertical: snackBar.vertical ?? 'bottom',
          horizontal: snackBar.horizontal ?? 'left',
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          iconMapping={{
            success: <CheckCircleOutline fontSize='inherit' />,
            warning: <WarningAmberIcon fontSize='inherit' />,
            error: <ErrorOutlineIcon fontSize='inherit' />,
          }}
          sx={{ width: '100%' }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
