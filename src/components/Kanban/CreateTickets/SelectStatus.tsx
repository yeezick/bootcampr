import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { TicketInterface } from 'interfaces/TicketInterFace'

type SelectStatusProps = {
  handleOnChange?: (e: SelectChangeEvent) => void
  ticketDetail?: TicketInterface | null
  splitCamelCaseToWords?: (str: string) => string
  ticketsStatus?: string
}
export const SelectStatus = ({
  handleOnChange,
  ticketDetail = null,
  splitCamelCaseToWords,
  ticketsStatus,
}: SelectStatusProps) => {
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
          onChange={handleOnChange}
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
