import React, { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Checkbox } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
function MultipleAssignees({ setAssignees, assignees }: any) {
  const userInTheProjects = [
    { title: 'koffi', id: 123, image: 'image' },
    { title: 'zena', id: 234, image: 'image' },
    { title: 'Erick', id: 345, image: 'image' },
    { title: 'Reina', id: 456, image: 'image' },
    { title: 'Jason', id: 567, image: 'image' },
  ]
  const [userData] = React.useState<any>(userInTheProjects)
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
  const checkedIcon = <CheckBoxIcon fontSize='small' />
  return (
    <Autocomplete
      multiple
      id='checkboxes-tags-demo'
      options={userData}
      disableCloseOnSelect
      getOptionLabel={(option: any) => option.title}
      onChange={(event, newValue) => setAssignees(newValue)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={params => (
        <TextField {...params} label='Assignees' placeholder='Assignees' />
      )}
    />
  )
}

export default MultipleAssignees
