import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

type SingleSelectProps = {
  handleOnChange?: (e: SelectChangeEvent) => void
  ticketDetail?: any | null
  splitCamelCaseToWords?: (str: string) => string
}
function SingleSelect({
  handleOnChange,
  ticketDetail = null,
  splitCamelCaseToWords,
}: SingleSelectProps) {
  return (
    <Box sx={{ minWidth: 10 }}>
      <FormControl fullWidth sx={{ width: '100%', paddingBottom: '20px' }}>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='status'
          name='status'
          defaultValue={splitCamelCaseToWords(ticketDetail?.status) ?? 'To Do'}
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
