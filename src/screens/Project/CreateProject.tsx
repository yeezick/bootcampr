import { useState } from 'react'
import { createProject } from 'utils/api'

export const CreateProject = () => {
  const [inputChange, setInputChange] = useState('')

  const handleInputChange = e => {
    setInputChange(e.target.value)
  }

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
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  )
}
