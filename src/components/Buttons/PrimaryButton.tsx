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

  return (
    <Button
      sx={{
        backgroundColor: '#FFA726',
        color: '#1A237E',
        height: '40px',
        marginLeft: '8px',
        textTransform: 'none',
      }}
      onClick={handler}
      variant='contained'
      {...conditionalProps}
    >
      {text}
    </Button>
  )
}
