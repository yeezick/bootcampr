import { Button } from '@mui/material'
import { CommonButton, ConditionalButtonProps } from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'

export const PrimaryButton = ({
  children,
  handler,
  startIcon,
  startIconProps,
  endIcon,
  endIconProps,
  text,
  ...MuiProps
}: CommonButton) => {
  const { disabled, sx: customStyles } = MuiProps
  const conditionalProps: ConditionalButtonProps = { ...MuiProps }
  if (startIcon)
    conditionalProps.startIcon = fetchIcon(startIcon, startIconProps)
  if (endIcon) conditionalProps.endIcon = fetchIcon(endIcon, endIconProps)
  if (customStyles) conditionalProps.sx = customStyles
  conditionalProps.sx = {
    ...primaryButtonStyle,
    ...conditionalProps.sx,
    cursor: disabled ? 'not-allowed' : '',
    opacity: disabled ? 0.38 : 1,
    textTransform: 'none', // textTransform can't be added to secondaryButtonSx or it throws a type error?
  }
  return (
    <Button onClick={handler} variant='contained' {...conditionalProps}>
      {text}
      {children}
    </Button>
  )
}

const primaryButtonStyle = {
  backgroundColor: '#FFA726',
  boxShadow: 'none',
  color: '#1A237E',
  '&:disabled': {
    backgroundColor: '#FFE0B2',
    color: '#C5CAE9',
  },
  fontWeight: '600',
  marginLeft: '8px',
  minWidth: '150px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#FFA726',
    boxShadow: 'none',
    color: '#1A237E',
  },
}
