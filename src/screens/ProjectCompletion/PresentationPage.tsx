import { Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { PresentationDetails } from 'screens/Project/ProjectDetails/PresentationDetails'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import {
  convertPresentationDateUserTZ,
  getLastCallForPresentation,
} from 'utils/helpers'
import { convertOffsetToTimezone } from 'utils/data/timeZoneConstants'
import {
  selectPresentationDate,
  selectProject,
} from 'utils/redux/slices/projectSlice'
import { getUserTimezone } from 'utils/redux/slices/userSlice'
import { useState } from 'react'
import { BackButton, ForwardButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { useSelector } from 'react-redux'
import { editProject } from 'utils/api'

export const PresentationPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const completedInfo = project.completedInfo
  const presenting = completedInfo.presenting
  const dispatch = useAppDispatch()
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const userTimezoneOffset = useAppSelector(getUserTimezone)
  const presentationDate = useAppSelector(selectPresentationDate)
  const userTimezoneInfo = convertOffsetToTimezone[userTimezoneOffset]
  const { startDate } = convertPresentationDateUserTZ(
    presentationDate,
    userTimezoneInfo?.timezone
  )
  const presentationDateLastCall = getLastCallForPresentation(
    startDate,
    userTimezoneInfo?.abbr
  )

  const updatePresenting = async () => {
    setIsLoading(true)

    const updatedProject = {
      completedInfo: {
        presenting: presenting,
        ...completedInfo,
      },
    }

    try {
      await editProject(projectID, updatedProject)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      dispatch(errorSnackbar('Participation failed to save. Please try again.'))
      setIsLoading(false)
    }
  }

  const handleNavigationButtons = async (direction: 'previous' | 'next') => {
    await updatePresenting()
    handlePageNavigation(direction)
  }
  const handlePrevious = () => handleNavigationButtons('previous')
  const handleNext = () => handleNavigationButtons('next')

  return (
    <div className='project-completion-presentation-page'>
      <Stack spacing={'32px'} className='page-content'>
        <PresentationDetails />

        <ParticipationRadio
          labelText='Let us know if your team will be presenting.'
          setIsDisabled={setIsDisabled}
          helperText={presentationDateLastCall}
        />

        <ButtonContainer gap={16}>
          <BackButton onClick={handlePrevious} label='URL' />
          <ForwardButton
            disabled={isDisabled}
            label='Confirmation'
            onClick={handleNext}
          />
        </ButtonContainer>
      </Stack>
    </div>
  )
}
