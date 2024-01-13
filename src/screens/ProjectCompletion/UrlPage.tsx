import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { selectProject } from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { DomainLink } from 'layout/DomainLink'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import {
  selectProjectUrl,
  updateParticipation,
  updateProjectUrl,
} from 'utils/redux/slices/projectCompletionSlice'
import { useState } from 'react'

export const UrlPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectUrl = useSelector(selectProjectUrl)
  const [isDisabled, setIsDisabled] = useState(projectUrl ? false : true)
  const dispatch: AppDispatch = useDispatch()
  const projectID = project._id

  //TODO: convert alerts to MUI toast to match Figma designs

  //TODO: In theory we don't need any uniqueness validation as there should only be one url per project and this can be stripped down to just navigation, leaving it for now.
  const handleSubmit = e => {
    e.preventDefault()
    if (isDisabled) {
      alert('Please enter a valid URL')
      return
    }

    const normalizeUrl = url => {
      return url.replace(/^(https?:\/\/)?(www\.)?/, '')
    }

    const isDuplicate = Object.values(
      project.completedInfo?.deployedUrl || {}
    ).some(url => {
      const existingUrl = normalizeUrl(url)
      const submittedUrl = normalizeUrl(projectUrl)

      return existingUrl === submittedUrl
    })

    if (isDuplicate) {
      alert('URL already exists in the list.')
    } else {
      setIsDisabled(true)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    }

    // const updatedProject = {
    //   completedInfo: {
    //     ...project.completedInfo,
    //     deployedUrl: {
    //       ...project.completedInfo?.deployedUrl,
    //       [authUser._id]: projectUrl,
    //     },
    //   },
    // }

    // try {
    //   setIsLoading(true)
    //   const response = await editProject(projectID, updatedProject)

    //   if (response) {
    //     dispatch(updateDeployedUrl(updatedProject.completedInfo.deployedUrl))
    //     handlePageNavigation('next')
    //     setIsLoading(false)
    //   }
    // } catch (error) {
    //   console.error('An error occurred while saving the URL.', error)
    //   setIsLoading(false)
    // }
  }

  const handleCancel = () => {
    dispatch(updateProjectUrl(''))
    dispatch(updateParticipation(null))
  }

  return (
    <div className='project-completion-url-page' aria-labelledby='formHeading'>
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <form onSubmit={handleSubmit}>
        <Stack className='form-content' spacing={'32px'}>
          <p>First, input the URL to your website.</p>
          <ProjectUrl setIsDisabled={setIsDisabled} />
          <Stack className='btn-container'>
            <SecondaryButton handler={handleCancel}>
              <DomainLink
                className='cancel-btn'
                route={`/project/${projectID}`}
                domain={'project'}
              >
                Cancel
              </DomainLink>
            </SecondaryButton>
            <PrimaryButton
              isDisabled={isDisabled}
              paginatorBtn
              text='Presentation'
              type='submit'
              aria-disabled={isDisabled}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  )
}
