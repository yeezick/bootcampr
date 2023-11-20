import { RxText } from 'react-icons/rx'
import { useAppSelector } from 'utils/redux/hooks'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { EditableText } from './EditableText'
import { TbPencilMinus } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import { Comments } from 'components/Kanban/Components/Comments'
import { Box } from '@mui/material'

export const TicketDetailInputsAndComments = () => {
  const { _id: ticketId } = useAppSelector(selectTicketFields)

  return (
    <Box sx={{ width: '50%', margin: '25px' }}>
      <EditableText inputIcon={<RxText />} label='Title' field={'title'} />
      <EditableText
        inputIcon={<TbPencilMinus />}
        label='Description'
        field={'description'}
      />

      <EditableText inputIcon={<BiLink />} label='Link' field={'link'} />
      {/* Comments should not be here? maybe in a higher level component */}
      <Comments ticketId={ticketId} />
    </Box>
  )
}
