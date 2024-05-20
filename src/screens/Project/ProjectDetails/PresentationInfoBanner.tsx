import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDate,
} from 'utils/redux/slices/projectSlice'
import './PresentationInfoBanner.scss'
import { getUserTimezone } from 'utils/redux/slices/userSlice'
import { convertOffsetToTimezone } from 'utils/data/timeZoneConstants'
import {
  convertPresentationDateUserTZ,
  getLastCallForPresentation,
} from 'utils/helpers'
import { useState } from 'react'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'

export const PresentationInfoBanner = () => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState<boolean>(false)
  const [isPresentingModalOpen, setIsPresentingModalOpen] =
    useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const userTimezoneOffset = useAppSelector(getUserTimezone)
  const presentationDate = useAppSelector(selectPresentationDate)
  const { presenting, deployedUrl } = projectSubmissionInfo
  const userTimezoneInfo = convertOffsetToTimezone[userTimezoneOffset]
  const { startDate } = convertPresentationDateUserTZ(
    presentationDate,
    userTimezoneInfo?.timezone
  )
  const presentationDateLastCall = getLastCallForPresentation(
    startDate,
    userTimezoneInfo?.abbr
  )

  const isModalOpen = isUrlModalOpen || isPresentingModalOpen
  const modalHeading = isUrlModalOpen
    ? 'Update project URL'
    : 'Edit participation status.'
  const modalBody = isUrlModalOpen ? (
    <ProjectUrl setIsDisabled={setIsDisabled} />
  ) : (
    <ParticipationRadio setIsDisabled={setIsDisabled} />
  )
  const handleCancel = () => {
    setIsUrlModalOpen(false)
    setIsPresentingModalOpen(false)
  }
  return (
    <>
      <div className='presentation-info-banner'>
        <p>
          (i) Your team will{presenting ? ' ' : ' not '}be presenting. You can
          update your participation status{' '}
          <span
            className='modal-trigger'
            onClick={() => setIsPresentingModalOpen(true)}
          >
            here
          </span>{' '}
          until {presentationDateLastCall}.
        </p>
        <p>
          Your submitted project URL is:{' '}
          <span className='deployed-url'>{deployedUrl}</span>. You can update
          your project URL{' '}
          <span
            className='modal-trigger'
            onClick={() => setIsUrlModalOpen(true)}
          >
            here
          </span>
          .
        </p>
      </div>
      <CommonModal
        isOpen={isModalOpen}
        heading={modalHeading}
        body={modalBody}
        cancelButtonLabel='Cancel'
        handleCancel={handleCancel}
        confirmButtonLabel='Update'
        confirmButtonDisabled={isDisabled}
      />
    </>
  )
}
