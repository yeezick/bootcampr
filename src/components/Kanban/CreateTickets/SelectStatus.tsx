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
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          onChange={handleOnChange}
          defaultValue={
            ticketDetail
              ? splitCamelCaseToWords(ticketDetail?.status)
              : ticketsStatus
          }
          inputProps={{ 'aria-label': 'Without label' }}
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
