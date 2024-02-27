import { Card, CardActionArea, SxProps } from '@mui/material'
import { CardInterface } from 'interfaces/components/Card'

export const CustomCard = ({
  style,
  onClick,
  isSelected = false,
  children,
  ...otherProps
}: CardInterface) => {
  const cardContent = onClick ? (
    <CardActionArea onClick={onClick} disableRipple>
      {children}
    </CardActionArea>
  ) : (
    <>{children}</>
  )
  const selectedStyle = isSelected && {
    background: '#F2F4FF',
    outline: isSelected ? '1px solid #1A237E' : 'none',
  }

  const cardStyleSx: SxProps = {
    alignItems: 'center',
    boxShadow:
      '0px 1px 2px rgba(26, 35, 126, 0.3), 0px 2px 6px 2px rgba(26, 35, 126, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      outline: '2px solid #1A237E',
    },
    ...selectedStyle,
    ...style,
  }

  return (
    <Card sx={cardStyleSx} {...otherProps}>
      {cardContent}
    </Card>
  )
}
