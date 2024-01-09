import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ButtonProps } from 'interfaces/components'

export const SecondaryButton = ({
  handler,
  paginatorBtn,
  text,
}: ButtonProps) => {
  return (
    <Button
      onClick={handler}
      sx={{
        borderColor: '#5C6BC0',
        color: '#1A237E',
        marginRight: '8px',
        textTransform: 'none',
        minWidth: '150px',
      }}
      variant='outlined'
    >
      {paginatorBtn && <ArrowBackIcon sx={{ marginRight: '8px' }} />}
      {text}
    </Button>
  )
}
