import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SingleSelect({
  handleOnChange,
  fakeDataDetail = null,
  statusRef,
}: any) {
  return (
    <Box sx={{ minWidth: 10 }}>
      <FormControl fullWidth sx={{ width: '100%', paddingBottom: '20px' }}>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='status'
          name='status'
          defaultValue={fakeDataDetail.status}
          onChange={(e, value: any) => {
            handleOnChange(e)
          }}
        >
          <MenuItem value={'To Do'}>To Do</MenuItem>
          <MenuItem value={'In progress'}>In progress</MenuItem>
          <MenuItem value={'Under Review'}>Under Review</MenuItem>
          <MenuItem value={'Completed'}>Completed </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SingleSelect
