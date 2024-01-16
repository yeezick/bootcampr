import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ButtonProps } from 'interfaces/components'

export const PrimaryButton = ({
  handler,
  paginatorBtn,
  text,
  disabled,
  customStyle,
}: ButtonProps) => {
  return (
    <Button
      sx={{ ...primaryButtonStyle, ...customStyle }}
      onClick={handler}
      variant='contained'
      disabled={disabled}
    >
      {text}
      {paginatorBtn && <ArrowForwardIcon sx={{ marginLeft: '8px' }} />}
    </Button>
  )
}

const primaryButtonStyle = {
  backgroundColor: '#FFA726',
  color: '#1A237E',
  '&:disabled': {
    backgroundColor: '#FFE0B2',
    color: '#C5CAE9',
  },
  fontWeight: '600',
  marginLeft: '8px',
  minWidth: '150px',
  textTransform: 'none',
}
