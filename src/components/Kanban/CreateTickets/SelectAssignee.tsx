import { useState } from 'react'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

export const SelectAssignee = ({ ticketDetail = null, setAssignees }: any) => {
  const [assigneesData] = useState([
    { title: 'Reina', id: 456, image: 'image' },
    { title: 'Koffi', id: 123, image: 'image' },
    { title: 'Hector', id: 33, image: 'image' },
    { title: 'Zena', id: 1213, image: 'image' },
  ])
  const [ticketDetailAssignee] = useState(ticketDetail?.assignees.id)

  const handleChange = (event: SelectChangeEvent) => {
    const findTheUser = assigneesData.find(
      user => event.target.value === String(user.id)
    )
    setAssignees({
      value: event.target.value as string,
      user: findTheUser,
    })
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>assignees</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          onChange={handleChange}
          defaultValue={ticketDetailAssignee ?? '256'}
        >
          {assigneesData.map(assignees => (
            <MenuItem key={assignees.id} value={String(assignees.id)}>
              {assignees.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
