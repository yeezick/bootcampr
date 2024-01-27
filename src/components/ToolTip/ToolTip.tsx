import { Tooltip } from '@mui/material'

export const BCToolTip = ({ text, child }) => {
  return (
    <Tooltip
      title={text}
      placement='top-end'
      componentsProps={{ tooltip: { sx: toolTipStyle } }}
    >
      {child}
    </Tooltip>
  )
}

const toolTipStyle = {
  bgcolor: 'rgba(0, 0, 0, 0.75)',
  '& .MuiTooltip-arrow': {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  fontSize: '14px',
  padding: '10px',
}
