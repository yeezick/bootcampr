import { RxText } from 'react-icons/rx'
import { EditableText } from './EditableText'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import { Box } from '@mui/material'

export const TicketInputFields = () => {
  return (
    <Box sx={{ width: '50%', margin: '25px' }}>
      <EditableText inputIcon={<RxText />} label='Title' field={'title'} />
      <EditableText
        inputIcon={<TbPencilMinus />}
        label='Description'
        field={'description'}
      />

      <EditableText inputIcon={<BiLink />} label='Link' field={'link'} />
    </Box>
  )
}
