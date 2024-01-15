import { Button } from '@mui/material'
import { CommonButton, ConditionalButtonProps } from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'

export const SecondaryButton = ({
  handler,
  startIcon,
  endIcon,
  text,
}: CommonButton) => {
  const conditionalProps: ConditionalButtonProps = {}
  if (startIcon) conditionalProps.startIcon = fetchIcon(startIcon)
  if (endIcon) conditionalProps.endIcon = fetchIcon(endIcon)
  return (
    <Button
      onClick={handler}
      sx={{
        borderColor: '#5C6BC0',
        color: '#1A237E',
        height: '40px',
        marginRight: '8px',
        textTransform: 'none',
      }}
      variant='outlined'
    >
      {text}
    </Button>
  )
}
