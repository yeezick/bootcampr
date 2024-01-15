import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import {
  selectProject,
  updateDeployedUrl,
  updatePresenting,
} from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { DomainLink } from 'layout/DomainLink'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { useState } from 'react'

export const UrlPage = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const project = useSelector(selectProject)
  const projectID = project._id
  const userID = authUser._id
  const currentUrl =
    Object.keys(project.completedInfo?.deployedUrl || {}).length > 0
      ? project.completedInfo?.deployedUrl[userID] || ''
      : ''

  const [isDisabled, setIsDisabled] = useState(currentUrl ? false : true)
  const dispatch: AppDispatch = useDispatch()

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) {
      alert('Please enter a valid URL')
      return
    }

    //TODO: In theory we don't need any uniqueness validation as there should only be one url per project and this can be stripped down to redux update and navigation.
    // const normalizeUrl = url => {
    //   return url.replace(/^(https?:\/\/)?(www\.)?/, '')
    // }

    // const isDuplicate = Object.values(
    //   project.completedInfo?.deployedUrl || {}
    // ).some(url => {
    //   const existingUrl = normalizeUrl(url)
    //   const submittedUrl = normalizeUrl(projectUrl)

    //   return existingUrl === submittedUrl
    // })

    // if (isDuplicate) {
    //   alert('URL already exists in the list.')
    // }
    else {
      setIsDisabled(true)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    }

    //TODO: I changed the logic to rely on updating the redux through the main flow and only submitting the db update on the final submit
    // try {
    //   setIsLoading(true)
    //   const response = await editProject(projectID, updatedProject)

    //   if (response) {
    // dispatch(updateDeployedUrl(updatedProject.completedInfo.deployedUrl))
    //     handlePageNavigation('next')
    //     setIsLoading(false)
    //   }
    // } catch (error) {
    //   console.error('An error occurred while saving the URL.', error)
    //   setIsLoading(false)
    // }
  }

  const handleCancel = () => {
    dispatch(updateDeployedUrl({}))
    dispatch(updatePresenting(null))
  }

  return (
    <div className='project-completion-url-page' aria-labelledby='formHeading'>
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <form onSubmit={handleSubmit}>
        <Stack className='form-content' spacing={'32px'}>
          <p>First, input the URL to your website.</p>
          <ProjectUrl
            setIsDisabled={setIsDisabled}
            userID={userID}
            currentUrl={currentUrl}
          />
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
