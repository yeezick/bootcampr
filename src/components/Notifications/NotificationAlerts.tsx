import { useNotification } from 'utils/redux/slices/notificationSlice'
import { useSelector } from 'react-redux'
import { RootState } from 'utils/redux/store'
import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material'

export const NotificationAlerts = () => {
  const notification = useSelector((state: RootState) => state.notification)
  const { clearNotification } = useNotification()

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) => {
    reason !== 'clickaway' && clearNotification()
  }

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}
