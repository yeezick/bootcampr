import { Button } from '@mui/material'
import {
  CommonButtonProps,
  ConditionalButtonProps,
} from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'

export const SecondaryButton = ({
  children,
  className,
  handler,
  startIcon,
  endIcon,
  text,
  icon,
  ...MuiProps
}: CommonButtonProps) => {
  const conditionalProps: ConditionalButtonProps = { ...MuiProps }
  if (startIcon) conditionalProps.startIcon = fetchIcon(startIcon)
  if (endIcon) conditionalProps.endIcon = fetchIcon(endIcon)
  if (MuiProps.sx) conditionalProps.sx = MuiProps.sx
  conditionalProps.sx = {
    ...secondaryButtonSx,
    ...conditionalProps.sx,
    textTransform: 'none', // textTransform can't be added to secondaryButtonSx or it throws a type error?
  }

  return (
    <Button
      className={className}
      onClick={handler}
      variant='outlined'
      {...conditionalProps}
    >
      {text}
      {children}
    </Button>
  )
}

const secondaryButtonSx = {
  backgroundColor: '#ffffff',
  borderColor: '#5C6BC0',
  color: '#1A237E',
  marginRight: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#1A237E',
  },
}
