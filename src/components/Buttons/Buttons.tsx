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
    children,
    colorScheme = 'primary',
    endIcon,
    //TODO: remove handler prop and utilize onClick instead. Implement during app-wide button refactor
    handler,
    startIcon,
    text,
    ...MuiProps
  } = props

  const conditionalProps: ConditionalButtonProps = {
    ...MuiProps,
    disableElevation: true,
    disableRipple: true,
    onClick: handler,
    style: MuiProps.style,
    variant: MuiProps.variant,
    ...(startIcon && { startIcon: fetchIcon(startIcon) }),
    ...(endIcon && { endIcon: fetchIcon(endIcon) }),
  }

  return (
    <Button className={`common-button ${colorScheme}`} {...conditionalProps}>
      {text}
      {children}
    </Button>
  )
}

/**
 * Returns an MUI IconButton component with several default props in place to adhere to BC styling, as well as accepting a number of custom props to define the button's appearance.
 *
 * @see {@link 'src/components/Buttons/ButtonVariants.ts'} for example usage.
 */
export const createIconButton = (props: IconBtnProps) => {
  const { handler, filled, icon, iconSize, ...MuiProps } = props
  const conditionalProps = {
    ...MuiProps,
    children: fetchIcon(icon),
    disableRipple: true,
    onClick: handler,
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
