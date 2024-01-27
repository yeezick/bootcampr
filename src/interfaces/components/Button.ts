export interface ButtonProps {
  children?: React.ReactNode
  className?: string
  handler?: any
  isDisabled?: boolean
  paginatorBtn?: boolean
  customStyle?: object
  text?: string
  type?: 'button' | 'reset' | 'submit'
}
