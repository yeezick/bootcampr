import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SingleSelect({ gettingStatus, setGettingStatus }: any) {
  return (
    <Box sx={{ minWidth: 10 }}>
      <FormControl fullWidth sx={{ width: '100%', 'padding-bottom': '20px' }}>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Status'
          name='type'
          defaultValue='To Do'
          // value={editForm?.type}
          onChange={(e, val: any) => setGettingStatus(val.props.value)}
        >
          <MenuItem value={'To Do'}>To Do</MenuItem>
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Under Review'}>Under Review</MenuItem>
          <MenuItem value={'Completed'}>Completed </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SingleSelect
