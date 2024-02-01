import { Badge } from '@mui/material'
import { BadgeInterface } from 'interfaces/components'

export const CustomBadge: React.FC<BadgeInterface> = ({
  content,
  invisible = false,
  variant = 'standard',
  children,
  maxValue,
}) => {
  //This is for the message component if we make it general Badge component we should handle position differently
  const customPosition = content && 'translate(8px, -28px)'
  return (
    <div>
      <Badge
        color='secondary'
        badgeContent={content}
        variant={variant}
        invisible={invisible}
        max={maxValue}
        sx={{
          '& .MuiBadge-badge': {
            color: '#212121',
            backgroundColor: '#fb8c00',
            transform: `${customPosition}`,
          },
        }}
      >
        {children}
      </Badge>
    </div>
  )
}
