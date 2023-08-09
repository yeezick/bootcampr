export interface SnackBarToastInterface {
  isOpen?: boolean
  message?: string
  duration?: number
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
  snackbarStyle?: string
  severity?: 'success' | 'error' | 'warning' | 'info'
}
