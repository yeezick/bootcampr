import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { SnackBarToastInterface } from 'interfaces/SnackBarToast'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
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
            error: <ErrorOutlineIcon fontSize='inherit' />,
            success: <CheckIcon fontSize='inherit' />,
            warning: <WarningAmberIcon fontSize='inherit' />,
          }}
          sx={{ width: '100%' }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
