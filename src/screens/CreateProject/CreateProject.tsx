import React, { useState } from 'react'
import { createProject } from 'utils/api'

const CreateProject = ({}) => {
  const [inputChange, setInputChange] = useState('')
  const handleFormInputChange = () => {}
  const handleSubmit = async () => {
    const createdProject = {
      projectOwner: '',
      title: 'inputChange',
    }
    await createProject(createdProject)
  }
  return (
    <div>
      <input
        type='text'
        placeholder='Project Name'
        value={inputChange}
        onChange={e => setInputChange(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>Create</button>
    </div>
  )
}

export default CreateProject
