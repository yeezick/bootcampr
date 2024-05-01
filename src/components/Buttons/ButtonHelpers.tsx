import { Button, IconButton } from '@mui/material'
import {
  CommonButtonProps,
  ConditionalButtonProps,
  IconBtnProps,
} from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'
import './Buttons.scss'

/**
 * Returns an MUI Button component with several default props in place to adhere to BC styling, as well as accepting a number of custom props to define the button's appearance.
 *
 * @see {@link 'src/components/Buttons/ButtonVariants.ts'} for example usage.
 */

export const createButton = (props: CommonButtonProps) => {
  const {
    colorScheme = 'primary',
    endIcon,
    startIcon,
    label,
    ...MuiProps
  } = props

  const conditionalProps: ConditionalButtonProps = {
    ...MuiProps,
    'aria-label': label + ' button',
    disableElevation: true,
    disableRipple: true,
    style: MuiProps.style,
    variant: MuiProps.variant,
    ...(startIcon && { startIcon: fetchIcon(startIcon) }),
    ...(endIcon && { endIcon: fetchIcon(endIcon) }),
  }

  return (
    <Button className={`common-button ${colorScheme}`} {...conditionalProps}>
      {label}
    </Button>
  )
}

/**
 * Returns an MUI IconButton component with several default props in place to adhere to BC styling, as well as accepting a number of custom props to define the button's appearance.
 *
 * @see {@link 'src/components/Buttons/ButtonVariants.ts'} for example usage.
 */
export const createIconButton = (props: IconBtnProps) => {
  const { filled, icon, iconSize, ...MuiProps } = props
  const conditionalProps = {
    ...MuiProps,
    children: fetchIcon(icon),
    disableRipple: true,
    style: MuiProps.style,
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
