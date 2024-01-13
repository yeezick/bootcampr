import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectProject,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { DomainLink } from 'layout/DomainLink'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import {
  selectIsDisabled,
  selectProjectUrl,
  setIsLoadingFalse,
} from 'utils/redux/slices/projectCompletionSlice'

export const UrlPage = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const project = useSelector(selectProject)
  const isDisabled = useSelector(selectIsDisabled)
  const projectUrl = useSelector(selectProjectUrl)
  const dispatch: AppDispatch = useDispatch()
  const projectID = project._id

  useEffect(() => {
    dispatch(setIsLoadingFalse())
  }, [])

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = async e => {
    e.preventDefault()

    const normalizeUrl = url => {
      return url.replace(/^(https?:\/\/)?(www\.)?/, '')
    }

    //TODO: do we need to check that the url is unique to a user or to a project?
    // const isDuplicate = Object.entries(
    //   project.completedInfo?.deployedUrl || {}
    // ).some(([userId, url]: [string, string]) => {
    //   return userId === authUser._id && url === projectUrl
    // })

    const isDuplicate = Object.values(
      project.completedInfo?.deployedUrl || {}
    ).some((url: string) => {
      const normalizedUrl = normalizeUrl(url)
      const normalizedProjectUrl = normalizeUrl(projectUrl)

      return normalizedUrl === normalizedProjectUrl
    })

    if (isDuplicate) {
      alert('URL already exists in the list.')
      return
    } else {
      handlePageNavigation('next')
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

  return (
    <div className='project-completion-url-page' aria-labelledby='formHeading'>
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <form onSubmit={handleSubmit}>
        <Stack className='form-content' spacing={'32px'}>
          <p>First, input the URL to your website.</p>
          <ProjectUrl labelText='Project URL' />
          <Stack className='btn-container'>
            <SecondaryButton>
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
