import { useSelector } from 'react-redux'
import { selectProject } from 'utils/redux/slices/projectSlice'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { PrimaryButton } from 'components/Buttons'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { editProject } from 'utils/api'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch } from 'utils/redux/hooks'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const completedInfo = project.completedInfo
  const deployedUrl = completedInfo.deployedUrl
  const presenting = completedInfo.presenting
  const dispatch = useAppDispatch()
  const [isInvalidUrl, setIsInvalidUrl] = useState(!deployedUrl)
  const [isInvalidRadio, setIsInvalidRadio] = useState(presenting === null)
  const [isDisabled, setIsDisabled] = useState(
    isInvalidUrl || isInvalidRadio ? true : false
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsDisabled(isInvalidUrl || isInvalidRadio ? true : false)
  }, [setIsDisabled, isInvalidUrl, isInvalidRadio])

  const updateCompletedInfo = async () => {
    setIsLoading(true)

    const updatedProject = {
      completedInfo: {
        presenting: presenting,
        deployedUrl: deployedUrl,
      },
    }

    try {
      await editProject(projectID, updatedProject)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      dispatch(
        errorSnackbar(
          'Presentation information failed to save. Please try again.'
        )
      )
      setIsLoading(false)
    }
  }

  const handleNavigationButtons = async (direction: 'previous' | 'next') => {
    await updateCompletedInfo()
    handlePageNavigation(direction)
  }
  const handlePrevious = () => handleNavigationButtons('previous')
  const handleNext = () => handleNavigationButtons('next')

  return (
    <div
      className='project-completion-confirmation-page'
      aria-labelledby='formHeader'
    >
      <section className='title'>
        <h1 id='formHeader'>Great! You’re almost done!</h1>
        <p>
          Make sure to double check the information and submit your project!
        </p>
      </section>

      <section className='url-container'>
        <ProjectUrl setIsDisabled={setIsInvalidUrl} />
      </section>

      <section className='participation-container'>
        <ParticipationRadio
          labelText='Presentation'
          setIsDisabled={setIsInvalidRadio}
        />
      </section>

      <Stack className='btn-container'>
        <PaginatorButton
          buttonType='secondary'
          handler={handlePrevious}
          text='Presentation'
        />
        <PrimaryButton
          aria-disabled={isDisabled || isLoading}
          disabled={isDisabled || isLoading}
          text='Submit'
          type='submit'
          handler={handleNext}
        />
      </Stack>
    </div>
  )
}
