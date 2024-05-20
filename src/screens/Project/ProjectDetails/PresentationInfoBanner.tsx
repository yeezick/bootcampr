import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDate,
} from 'utils/redux/slices/projectSlice'
import './PresentationInfoBanner.scss'
import { formatLastCallDate, getFullUrl } from 'utils/helpers'
import { useState } from 'react'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { fetchIcon } from 'utils/components/Icons'

export const PresentationInfoBanner = () => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState<boolean>(false)
  const [isPresentingModalOpen, setIsPresentingModalOpen] =
    useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const presentationDate = useAppSelector(selectPresentationDate)
  const { presenting, deployedUrl } = projectSubmissionInfo
  const lastCallForProjectEditsDate = formatLastCallDate(
    presentationDate.startDateEST
  )
  const fullUrl = getFullUrl(deployedUrl)

  const isModalOpen = isUrlModalOpen || isPresentingModalOpen
  const modalHeading = isUrlModalOpen
    ? 'Update project URL'
    : 'Update participation status.'
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
        <div className='icon-container'>{fetchIcon('info')}</div>
        <div className='text-container'>
          <p>
            Your team will{presenting ? ' ' : ' not '}be presenting. You can
            update your participation status{' '}
            <span
              className='modal-trigger'
              onClick={() => setIsPresentingModalOpen(true)}
            >
              here
            </span>{' '}
            until {lastCallForProjectEditsDate}.
          </p>
          <p>
            Your submitted project URL is:{' '}
            <a
              href={fullUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='deployed-url'
            >
              {deployedUrl}
            </a>
            . You can update your project URL{' '}
            <span
              className='modal-trigger'
              onClick={() => setIsUrlModalOpen(true)}
            >
              here
            </span>
            .
          </p>
        </div>
      </div>
      <CommonModal
        isOpen={isModalOpen}
        heading={modalHeading}
        body={modalBody}
        cancelButtonLabel='Cancel'
        handleCancel={handleCancel}
        confirmButtonLabel='Update'
        confirmButtonDisabled={isDisabled}
        customWidth={368}
      />
    </>
  )
}
