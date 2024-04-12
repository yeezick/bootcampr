import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { closeSnackBar } from 'utils/redux/slices/snackBarSlice'

export const SnackBarToast = () => {
  const snackBarState = useAppSelector(state => state.snackBar)
  const dispatch = useAppDispatch()

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(closeSnackBar())
  }

  return (
    <div>
      <Snackbar
        open={snackBarState.isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarState.severity}
          iconMapping={{
            success: <CheckCircleOutline fontSize='inherit' />,
            warning: <WarningAmberIcon fontSize='inherit' />,
            error: <ErrorOutlineIcon fontSize='inherit' />,
          }}
          sx={{ width: '100%' }}
        >
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
