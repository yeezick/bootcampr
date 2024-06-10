import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormControl, MenuItem, Select } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectProjectId,
  selectProjectUiLoading,
} from 'utils/redux/slices/projectSlice'
import { setPortal } from 'utils/redux/slices/userInterfaceSlice'
import {
  selectAuthUser,
  selectIsRecurringUser,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { buildProjectPortal, storeUserProject } from 'utils/helpers'
import './SelectProject.scss'

export const SelectProject = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openSelect, setOpenSelect] = useState(false)
  const isRecurringUser = useAppSelector(selectIsRecurringUser)
  const isProjectLoading = useAppSelector(selectProjectUiLoading)
  const currentProjectId = useAppSelector(selectProjectId)
  const { projects } = useAppSelector(selectAuthUser)
  const projectsWithSandbox = isRecurringUser
    ? [...projects.projects, 'waitlist']
    : projects.projects
  console.log(projectsWithSandbox)
  const projectsList = projectsWithSandbox.reduce(
    (projects, projectId, index) => {
      projects.push({ label: `Project ${index + 1}`, projectValue: projectId })
      return projects
    },
    []
  )
  const isSelectOpen =
    (openSelect || isProjectLoading) && Boolean(currentProjectId)

  const handleToggleSelect = () => {
    if (!isProjectLoading) {
      setOpenSelect(!openSelect)
    }
  }

  const handleProjectChange = async event => {
    const selectedProject = event.target.value
    const userActiveProject =
      selectedProject === 'waitlist' ? null : selectedProject
    setOpenSelect(true)
    dispatch(setPortal(buildProjectPortal(selectedProject)))
    await storeUserProject(dispatch, selectedProject)
    dispatch(
      updateAuthUser({
        projects: {
          activeProject: userActiveProject,
          projects: projects.projects,
        },
      })
    )
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
              key={project.projectValue}
              value={project.projectValue}
              className={
                currentProjectId === project.projectValue
                  ? 'selected-project'
                  : ''
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
