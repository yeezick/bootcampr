import { Button } from '@mui/material'
import { ButtonProps } from 'interfaces/components'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export const SecondaryButton = ({
  className,
  handler,
  paginatorBtn,
  text,
}: ButtonProps) => {
  return (
    <Button
      className={className}
      onClick={handler}
      sx={{
        backgroundColor: '#ffffff',
        borderColor: '#5C6BC0',
        color: '#1A237E',
        marginRight: '8px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#ffffff',
          color: '#1A237E',
        },
      }}
      variant='outlined'
    >
      {paginatorBtn && <KeyboardBackspaceIcon sx={{ marginRight: '8px' }} />}
      {text}
    </Button>
  )
}
