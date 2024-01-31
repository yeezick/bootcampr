import { Badge } from '@mui/material'
import { BadgeInterface } from 'interfaces/components'

export const CustomBadge: React.FC<BadgeInterface> = ({
  content,
  invisible = false,
  variant = 'standard',
  children,
}) => {
  return (
    <div>
      <Badge
        color='secondary'
        badgeContent={content}
        variant={variant}
        invisible={invisible}
      >
        {children}
      </Badge>
    </div>
  )
}
