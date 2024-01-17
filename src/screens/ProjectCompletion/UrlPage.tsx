import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import {
  selectProject,
  updateDeployedUrl,
  updatePresenting,
} from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { DomainLink } from 'layout/DomainLink'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { useState } from 'react'

export const UrlPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch: AppDispatch = useDispatch()

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) {
      alert('Please enter a valid URL')
      return
    } else {
      setIsDisabled(true)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    }
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
