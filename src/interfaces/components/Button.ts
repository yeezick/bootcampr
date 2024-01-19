export interface ButtonProps {
  children?: React.ReactNode
  className?: string
  handler?: any
  isDisabled?: boolean
  paginatorBtn?: boolean
  disabled?: boolean
  customStyle?: object
  text?: string
  type?: 'button' | 'reset' | 'submit'
}
