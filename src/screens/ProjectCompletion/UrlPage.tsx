import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import {
  selectProject,
  updateDeployedUrl,
  updatePresenting,
} from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { ForwardButton, SecondaryButton } from 'components/Buttons'

export const UrlPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = e => {
    e.preventDefault()

    try {
      setIsDisabled(true)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    navigate(`/project/${projectID}`)
    dispatch(updateDeployedUrl(''))
    dispatch(updatePresenting(null))
  }

  return (
    <div className='project-completion-url-page' aria-labelledby='formHeading'>
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <form>
        <Stack className='form-content' spacing={'32px'}>
          <p>First, input the URL to your website.</p>
          <ProjectUrl setIsDisabled={setIsDisabled} />
          <ButtonContainer gap={16}>
            <SecondaryButton onClick={handleCancel} label='Cancel' />
            <ForwardButton
              disabled={isDisabled}
              label='Presentation'
              onClick={handleSubmit}
            />
          </ButtonContainer>
        </Stack>
      </form>
    </div>
  )
}
