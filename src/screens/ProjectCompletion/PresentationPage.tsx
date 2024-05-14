import { useState } from 'react'
import { Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import { PresentationDetails } from 'screens/Project/ProjectDetails/PresentationDetails'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import {
  convertPresentationDateUserTZ,
  getLastCallForPresentation,
} from 'utils/helpers'
import { convertOffsetToTimezone } from 'utils/data/timeZoneConstants'
import { selectPresentationDate } from 'utils/redux/slices/projectSlice'
import { getUserTimezone } from 'utils/redux/slices/userSlice'

export const PresentationPage = ({ handlePageNavigation }) => {
  const dispatch = useAppDispatch()
  const [isDisabled, setIsDisabled] = useState(true)
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

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) {
      dispatch(
        errorSnackbar(
          'Please indicate whether or not your team will be presenting before submitting.'
        )
      )
      return
    } else {
      setIsDisabled(true)
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    }
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
    window.scrollTo(0, 0)
  }

  return (
    <div className='project-completion-presentation-page'>
      <form>
        <Stack spacing={'32px'} className='page-content'>
          <PresentationDetails />

          <ParticipationRadio
            labelText='Let us know if your team will be presenting.'
            setIsDisabled={setIsDisabled}
            helperText={presentationDateLastCall}
          />

          <Stack className='btn-container'>
            <PaginatorButton
              buttonType='secondary'
              handler={handleCancel}
              text='URL'
            />
            <PaginatorButton
              buttonType='primary'
              aria-disabled={isDisabled}
              disabled={isDisabled}
              text='Confirmation'
              type='submit'
              handler={handleSubmit}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  )
}
