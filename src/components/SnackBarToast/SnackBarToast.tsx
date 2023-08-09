import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const SnackBarToast = () => {
  const snackBarState = useAppSelector(state => state.snackBar)
  const dispatch = useDispatch()

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(createSnackBar({ isOpen: false }))
  }

  return (
    <div>
      <Snackbar
        open={snackBarState.isOpen}
        autoHideDuration={snackBarState.duration ?? 6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: snackBarState.vertical ?? 'bottom',
          horizontal: snackBarState.horizontal ?? 'left',
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
