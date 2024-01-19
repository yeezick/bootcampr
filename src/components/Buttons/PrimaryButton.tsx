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
  disabled,
  customStyle,
}: ButtonProps) => {
  return (
    <Button
      className={className}
      onClick={handler}
      sx={{ ...primaryButtonStyle, ...customStyle }}
      type={type}
      variant='contained'
      disabled={disabled}
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

const primaryButtonStyle = {
  backgroundColor: '#FFA726',
  boxShadow: 'none',
  color: '#1A237E',
  '&:disabled': {
    backgroundColor: '#FFE0B2',
    color: '#C5CAE9',
  },
  cursor: isDisabled ? 'not-allowed' : '',
  fontWeight: '600',
  marginLeft: '8px',
  minWidth: '150px',
  opacity: isDisabled ? 0.38 : 1,
  textTransform: 'none',
  '&:hover': {
          backgroundColor: '#FFA726',
          boxShadow: 'none',
          color: '#1A237E',
        }
}
