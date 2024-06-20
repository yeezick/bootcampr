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
  selectPresentationDateWithTime,
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
  const [isForwardLoading, setIsForwardLoading] = useState<boolean>(false)
  const [isBackLoading, setIsBackLoading] = useState<boolean>(false)
  const userTimezoneOffset = useAppSelector(getUserTimezone)
  const presentationDate = useAppSelector(selectPresentationDateWithTime)
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
    const updatedProject = {
      completedInfo: {
        presenting: presenting,
        ...completedInfo,
      },
    }

    try {
      await editProject(projectID, updatedProject)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error(error)
      dispatch(errorSnackbar('Participation failed to save. Please try again.'))
    }
  }

  const handleNavigationButtons = async (direction: 'previous' | 'next') => {
    const setLoading =
      direction === 'next' ? setIsForwardLoading : setIsBackLoading

    setLoading(true)
    try {
      await updatePresenting()
      handlePageNavigation(direction)
    } finally {
      setLoading(false)
    }
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
          <BackButton
            onClick={handlePrevious}
            label='URL'
            loading={isBackLoading}
          />
          <ForwardButton
            onClick={handleNext}
            label='Confirmation'
            disabled={isDisabled}
            loading={isForwardLoading}
          />
        </ButtonContainer>
      </Stack>
    </div>
  )
}
