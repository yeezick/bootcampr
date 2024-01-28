import { Button } from '@mui/material'
import { CommonButton, ConditionalButtonProps } from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'

export const PrimaryButton = ({
  handler,
  startIcon,
  endIcon,
  text,
  ...MuiProps
}: CommonButton) => {
  const conditionalProps: ConditionalButtonProps = { ...MuiProps }
  if (startIcon) conditionalProps.startIcon = fetchIcon(startIcon)
  if (endIcon) conditionalProps.endIcon = fetchIcon(endIcon)
  if (MuiProps.sx) conditionalProps.sx = MuiProps.sx
  conditionalProps.sx = {
    ...primaryButtonSx,
    ...conditionalProps.sx,
    textTransform: 'none', // textTransform can't be added to secondaryButtonSx or it throws a type error?
  }

  return (
    <Button onClick={handler} variant='contained' {...conditionalProps}>
      {text}
    </Button>
  )
}

const primaryButtonSx = {
  backgroundColor: '#FFA726',
  color: '#1A237E',
  height: '40px',
  marginLeft: '8px',
  textTransform: 'none',
}
