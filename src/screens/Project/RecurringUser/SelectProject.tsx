import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormControl, MenuItem, Select } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  fetchAndStoreUserProject,
  selectProjectId,
  selectProjectUiLoading,
} from 'utils/redux/slices/projectSlice'
import { setPortal } from 'utils/redux/slices/userInterfaceSlice'
import { selectUserProjectList } from 'utils/redux/slices/userSlice'
import { buildProjectPortal } from 'utils/helpers'
import './SelectProject.scss'

export const SelectProject = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openSelect, setOpenSelect] = useState(false)
  const isProjectLoading = useAppSelector(selectProjectUiLoading)
  const currentProjectId = useAppSelector(selectProjectId)
  const projectsList = useAppSelector(selectUserProjectList)

  const isSelectOpen =
    (openSelect || isProjectLoading) && Boolean(currentProjectId)

  const handleToggleSelect = () => {
    if (!isProjectLoading) {
      setOpenSelect(!openSelect)
    }
  }

  const handleProjectChange = async event => {
    const selectedProject = event.target.value
    setOpenSelect(true)
    dispatch(setPortal(buildProjectPortal(selectedProject)))
    await dispatch(fetchAndStoreUserProject(selectedProject))
    navigate(`/project/${selectedProject}`)
    setOpenSelect(false)
  }

  return (
    <div className='select-project'>
      <FormControl fullWidth>
        <Select
          labelId='select-project-label'
          id='select-project'
          value={currentProjectId || 'waitlist'}
          onChange={handleProjectChange}
          onClick={handleToggleSelect}
          open={isSelectOpen}
          MenuProps={{ sx: { marginTop: '3px' } }}
        >
          {projectsList.map(project => (
            <MenuItem
              key={project.projectId}
              value={project.projectId}
              className={
                currentProjectId === project.projectId ? 'selected-project' : ''
              }
            >
              {project.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
