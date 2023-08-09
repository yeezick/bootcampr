export interface SnackBarToastInterface {
  isOpen?: boolean
  message?: string
  duration?: number
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
  snackbarStyle?: string
  severity?: 'success' | 'error' | 'warning' | 'info'
}
export interface SnackBarToastProps {
  snackbarDescription?: React.Dispatch<
    React.SetStateAction<SnackBarToastInterface>
  >
  snackBar?: SnackBarToastInterface
  snackbarStyle?: string
}
