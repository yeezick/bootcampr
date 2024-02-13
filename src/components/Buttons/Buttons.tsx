import { Button, IconButton } from '@mui/material'
import {
  CommonButtonProps,
  ConditionalButtonProps,
  IconBtnProps,
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

  const conditionalProps: ConditionalButtonProps = {
    ...MuiProps,
    onClick: handler,
    variant: MuiProps.variant,
    disableRipple: true,
    style: MuiProps.style,
    'aria-disabled': MuiProps.disabled,
    ...(startIcon && { startIcon: fetchIcon(startIcon) }),
    ...(endIcon && { endIcon: fetchIcon(endIcon) }),
  }

  if (paginatorBtn && conditionalProps.variant === 'contained') {
    conditionalProps.endIcon = fetchIcon('rightArrow')
  } else if (paginatorBtn && conditionalProps.variant === 'outlined')
    conditionalProps.startIcon = fetchIcon('leftArrow')

  return (
    <Button
      className={`common-button ${colorScheme}`}
      {...conditionalProps}
      disableElevation
    >
      {text}
      {children}
    </Button>
  )
}

export const createIconButton = (props: IconBtnProps) => {
  const { handler, filled, icon, iconSize, ...MuiProps } = props
  const conditionalProps = {
    ...MuiProps,
    onClick: handler,
    disableRipple: true,
    style: MuiProps.style,
    'aria-disabled': MuiProps.disabled,
    children: fetchIcon(icon),
  }

  return (
    <IconButton
      className={`common-button icon-button ${iconSize} ${
        filled ? 'filled' : ''
      }`}
      {...conditionalProps}
    >
      {conditionalProps.children}
    </IconButton>
  )
}
