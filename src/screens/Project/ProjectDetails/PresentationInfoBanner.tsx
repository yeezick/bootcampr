import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDate,
  selectProject,
} from 'utils/redux/slices/projectSlice'
import './PresentationInfoBanner.scss'
import { formatLastCallDate, getFullUrl } from 'utils/helpers'
import { useState } from 'react'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { fetchIcon } from 'utils/components/Icons'
import { useSelector } from 'react-redux'
import { editProject } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const PresentationInfoBanner = () => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState<boolean>(false)
  const [isPresentingModalOpen, setIsPresentingModalOpen] =
    useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const presentationDate = useAppSelector(selectPresentationDate)
  const project = useSelector(selectProject)
  const projectID = project._id

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
      setIsUrlModalOpen(false)
      setIsPresentingModalOpen(false)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      dispatch(
        errorSnackbar(
          'Presentation information failed to save. Please try again.'
        )
      )
      setIsUrlModalOpen(false)
      setIsPresentingModalOpen(false)
      setIsLoading(false)
    }
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
        handlingRequest={isLoading}
        cancelButtonLabel='Cancel'
        handleCancel={handleCancel}
        confirmButtonLabel='Update'
        handleConfirm={updateCompletedInfo}
        confirmButtonDisabled={isDisabled}
        customWidth={368}
      />
    </>
  )
}
