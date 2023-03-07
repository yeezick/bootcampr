import React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
function MultipleAssignees({ setAssignees }: any) {
  const top100Films = [
    { userName: 'koffi', id: 123, image: 'image' },
    { userName: 'zena', id: 234, image: 'image' },
    { userName: 'Erick', id: 345, image: 'image' },
    { userName: 'Reina', id: 456, image: 'image' },
    { userName: 'Jason', id: 567, image: 'image' },
  ]

  const getOptionLabels: any = (option: any) => {
    // return <h1>{option.userName}</h1>
    // return <>{option.userName}</>
    return `<h1>${option.userName}</h1>`
  }

  const textFieldChange: any = (params: any) => {
    return <TextField {...params} label='Assignees' placeholder='Assignees' />
  }
  const autocompleteChange: any = (newValue: any) => {
    setAssignees(newValue)
  }
  return (
    <div>
      <Autocomplete
        multiple
        limitTags={2}
        id='multiple-limit-tags'
        options={top100Films}
        onChange={(event, newValue) => {
          autocompleteChange(newValue)
        }}
        // getOptionLabel={option => option?.title}
        getOptionLabel={option => getOptionLabels(option)}
        renderInput={params => textFieldChange(params)}
        sx={{ width: '500px' }}
      />
    </div>
  )
}

export default MultipleAssignees
