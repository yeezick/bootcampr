import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import {
  selectProject,
  updateDeployedUrl,
  updatePresenting,
} from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { SecondaryButton } from 'components/Buttons'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import { editProject } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const UrlPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const completedInfo = project.completedInfo
  const deployedUrl = completedInfo.deployedUrl
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    const updatedProject = {
      completedInfo: {
        ...completedInfo,
        deployedUrl: deployedUrl,
      },
    }

    try {
      await editProject(projectID, updatedProject)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      dispatch(errorSnackbar('Url failed to save. Please try again.'))
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    setIsLoading(true)

    const updatedProject = {
      completedInfo: {
        deployedUrl: '',
        presenting: null,
      },
    }

    try {
      await editProject(projectID, updatedProject)
      navigate(`/project/${projectID}`)
      dispatch(updateDeployedUrl(''))
      dispatch(updatePresenting(null))
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      dispatch(errorSnackbar('Url failed to save. Please try again.'))
      setIsLoading(false)
    }
  }

  return (
    <div className='project-completion-url-page' aria-labelledby='formHeading'>
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <Stack className='form-content' spacing={'32px'}>
        <p>First, input the URL to your website.</p>
        <ProjectUrl setIsDisabled={setIsDisabled} />
        <Stack className='btn-container'>
          <SecondaryButton
            className='cancel-btn'
            handler={handleCancel}
            text='Cancel'
          />
          <PaginatorButton
            buttonType='primary'
            disabled={isDisabled}
            text='Presentation'
            type='submit'
            aria-disabled={isDisabled}
            handler={handleSubmit}
          />
        </Stack>
      </Stack>
    </div>
  )
}
