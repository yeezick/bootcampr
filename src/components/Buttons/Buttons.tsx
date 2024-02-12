import { Button } from '@mui/material'
import {
  CommonButtonProps,
  ConditionalButtonProps,
} from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'
import './Buttons.scss'

export const createButton = (props: CommonButtonProps) => {
  const {
    children,
    colorScheme = 'primary',
    endIcon,
    handler,
    paginatorBtn,
    startIcon,
    text,
    ...MuiProps
  } = props
  const { disabled, style, variant } = MuiProps
  const conditionalProps: ConditionalButtonProps = { ...MuiProps }

  if (startIcon) conditionalProps.startIcon = fetchIcon(startIcon)
  if (endIcon) conditionalProps.endIcon = fetchIcon(endIcon)
  if (paginatorBtn && variant === 'contained') {
    conditionalProps.endIcon = fetchIcon('rightArrow')
  } else if (paginatorBtn && variant === 'outlined')
    conditionalProps.startIcon = fetchIcon('leftArrow')

  return (
    <Button
      aria-disabled={disabled}
      className={`common-button ${colorScheme}`}
      disableElevation
      disableRipple
      onClick={handler}
      variant={variant}
      style={style}
      {...conditionalProps}
    >
      {text}
      {children}
    </Button>
  )
}
