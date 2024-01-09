import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ButtonProps } from 'interfaces/components'

export const PrimaryButton = ({
  handler,
  paginatorBtn,
  text,
  disabled,
}: ButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: '#FFA726',
        color: '#1A237E',
        '&:disabled': {
          backgroundColor: '#FFE0B2',
          color: '#C5CAE9',
        },
        marginLeft: '8px',
        textTransform: 'none',
        minWidth: '150px',
      }}
      onClick={handler}
      variant='contained'
      disabled={disabled}
    >
      {text}
      {paginatorBtn && <ArrowForwardIcon sx={{ marginLeft: '8px' }} />}
    </Button>
  )
}
