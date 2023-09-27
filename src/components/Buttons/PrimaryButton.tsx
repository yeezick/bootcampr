import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ButtonProps } from 'interfaces/components'

export const PrimaryButton = ({ handler, paginatorBtn, text }: ButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: '#FFA726',
        color: '#1A237E',
        marginLeft: '8px',
        textTransform: 'none',
      }}
      onClick={handler}
      variant='contained'
    >
      {text}
      {paginatorBtn && <ArrowForwardIcon sx={{ marginLeft: '8px' }} />}
    </Button>
  )
}
