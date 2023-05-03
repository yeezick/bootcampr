import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { TicketInterface } from 'interfaces/TicketInterFace'

type SingleSelectProps = {
  handleOnChange?: (e: SelectChangeEvent) => void
  ticketDetail?: TicketInterface | null
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
}
const SingleSelect = ({
  handleOnChange,
  ticketDetail = null,
  splitCamelCaseToWords,
  ticketsStatus,
}: SingleSelectProps) => {
  return (
    <Box sx={{ minWidth: 10 }}>
      <FormControl fullWidth sx={{ width: '100%', paddingBottom: '20px' }}>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='status'
          name='status'
          defaultValue={
            ticketDetail
              ? splitCamelCaseToWords(ticketDetail?.status)
              : ticketsStatus
          }
          onChange={(e, value) => {
            handleOnChange(e)
          }}
        >
          <MenuItem value={'to Do'}>To Do</MenuItem>
          <MenuItem value={'in Progress'}>In progress</MenuItem>
          <MenuItem value={'under Review'}>Under Review</MenuItem>
          <MenuItem value={'completed'}>Completed </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SingleSelect
