import { Button, IconButton } from '@mui/material'
import {
  CommonButtonProps,
  ConditionalButtonProps,
} from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'
import './Buttons.scss'
import { ReactElement } from 'react'

export const createButton = (props: CommonButtonProps) => {
  const {
    children,
    colorScheme = 'primary',
    endIcon,
    filled,
    handler,
    icon,
    iconSize,
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
    ...(icon && { children: fetchIcon(icon) }),
    ...(startIcon && { startIcon: fetchIcon(startIcon) }),
    ...(endIcon && { endIcon: fetchIcon(endIcon) }),
  }

  if (paginatorBtn && conditionalProps.variant === 'contained') {
    conditionalProps.endIcon = fetchIcon('rightArrow')
  } else if (paginatorBtn && conditionalProps.variant === 'outlined')
    conditionalProps.startIcon = fetchIcon('leftArrow')

  return (
    <>
      {icon ? (
        <IconButton
          className={`common-button icon-button ${iconSize} ${
            filled ? 'filled' : ''
          }`}
          {...conditionalProps}
        >
          {conditionalProps.children}
        </IconButton>
      ) : (
        <Button
          className={`common-button ${colorScheme}`}
          {...conditionalProps}
          disableElevation
        >
          {text}
          {children}
        </Button>
      )}
    </>
  )
}
