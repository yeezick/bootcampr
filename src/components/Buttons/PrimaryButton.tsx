import { Button } from '@mui/material'
import { ButtonProps } from 'interfaces/components'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export const PrimaryButton = ({
  children,
  className,
  handler,
  isDisabled,
  paginatorBtn,
  text,
  type,
}: ButtonProps) => {
  return (
    <Button
      className={className}
      onClick={handler}
      sx={{
        backgroundColor: '#FFA726',
        boxShadow: 'none',
        color: '#1A237E',
        cursor: isDisabled ? 'not-allowed' : '',
        marginLeft: '8px',
        opacity: isDisabled ? 0.38 : 1,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#FFA726',
          boxShadow: 'none',
          color: '#1A237E',
        },
      }}
      type={type}
      variant='contained'
    >
      {text}
      {children}
      {paginatorBtn && (
        <KeyboardBackspaceIcon
          sx={{
            marginLeft: '8px',
            transform: 'scaleX(-1)',
            WebkitTransform: 'scaleX(-1)', //included for broader browser compatibility
          }}
        />
      )}
    </Button>
  )
}
