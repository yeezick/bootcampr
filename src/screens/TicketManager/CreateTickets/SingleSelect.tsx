import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SingleSelect({ editForm, handleEditChange }: any) {
  const [age, setAge] = React.useState('')

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
          value={editForm.type}
          onChange={handleEditChange}
        >
          <MenuItem value={10}>To Do</MenuItem>
          <MenuItem value={20}>In Progress</MenuItem>
          <MenuItem value={30}>Under Review</MenuItem>
          <MenuItem value={40}>Completed </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SingleSelect
