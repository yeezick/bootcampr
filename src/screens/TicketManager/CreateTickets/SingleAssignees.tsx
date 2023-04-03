import { useState } from 'react'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
function SingleAssignees({ handleOnChange, editTicketForm }: any) {
  const [assignees, setAssignees] = useState(editTicketForm.assignees.title)

  const [assigneesData] = useState([
    { title: 'Reina', id: 456, image: 'image' },
    { title: 'Koffi', id: 123, image: 'image' },
    { title: 'Hector', id: 33, image: 'image' },
    { title: 'Zena', id: 1213, image: 'image' },
  ])

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event)

    setAssignees(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>assignees</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          onChange={handleChange}
          defaultValue={editTicketForm.assignees.id}
          name={assignees}
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
export default SingleAssignees
