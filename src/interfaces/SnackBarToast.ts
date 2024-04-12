export interface SnackbarInterface {
  isOpen: boolean
  message?: string
  severity?: SnackBarSeverity
}

export interface CreateSnackbarPayload {
  message?: string
  severity?: SnackBarSeverity
}

export type SnackBarSeverity = 'success' | 'error' | 'warning' | 'info'
