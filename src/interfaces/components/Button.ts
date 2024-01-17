export interface ButtonProps {
  children?: React.ReactNode
  className?: string
  handler?: any
  isDisabled?: boolean
  paginatorBtn?: boolean
  text?: string
  type?: 'button' | 'reset' | 'submit'
}
