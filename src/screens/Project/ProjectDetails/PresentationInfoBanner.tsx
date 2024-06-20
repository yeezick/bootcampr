import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDateWithTime,
  selectProject,
  updateDeployedUrl,
  updatePresenting,
} from 'utils/redux/slices/projectSlice'
import './PresentationInfoBanner.scss'
import { formatLastCallDate, getFullUrl } from 'utils/helpers'
import { useEffect, useRef, useState } from 'react'
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
  const presentationDate = useAppSelector(selectPresentationDateWithTime)
  const project = useSelector(selectProject)
  const projectID = project._id

  const { presenting, deployedUrl } = projectSubmissionInfo
  const [displayedUrl, setDisplayedUrl] = useState<string>(deployedUrl)
  const [displayedPresenting, setDisplayedPresenting] =
    useState<boolean>(presenting)
  const initialUrlRef = useRef(deployedUrl)
  const initialPresentingRef = useRef(presenting)

  const fullUrl = getFullUrl(deployedUrl)
  const lastCallForProjectEditsDate = formatLastCallDate(
    presentationDate.startDateEST
  )

  const [urlIsDisabled, setUrlIsDisabled] = useState<boolean>(true)
  const [presentingIsDisabled, setPresentingIsDisabled] =
    useState<boolean>(true)

  useEffect(() => {
    deployedUrl === initialUrlRef.current
      ? setUrlIsDisabled(true)
      : setUrlIsDisabled(false)
    presenting === initialPresentingRef.current
      ? setPresentingIsDisabled(true)
      : setPresentingIsDisabled(false)
  }, [deployedUrl, displayedUrl, presenting, displayedPresenting])

  const handleCancel = () => {
    setIsUrlModalOpen(false)
    setIsPresentingModalOpen(false)
    dispatch(updateDeployedUrl(initialUrlRef.current))
    dispatch(updatePresenting(initialPresentingRef.current))
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    const updatedProject = {
      completedInfo: {
        presenting: presenting,
        deployedUrl: deployedUrl,
      },
    }

    try {
      await editProject(projectID, updatedProject)
      setDisplayedUrl(deployedUrl)
      setDisplayedPresenting(presenting)
      initialUrlRef.current = deployedUrl
      initialPresentingRef.current = presenting
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

  const handlePresentingClick = () => setIsPresentingModalOpen(true)
  const handleUrlClick = () => setIsUrlModalOpen(true)

  //Modal props
  const isModalOpen = isUrlModalOpen || isPresentingModalOpen
  const modalHeading = isUrlModalOpen
    ? 'Update project URL'
    : 'Update participation status'
  const modalBody = isUrlModalOpen ? (
    <ProjectUrl
      setIsDisabled={setIsDisabled}
      labelText='This is the URL of your completed MVP.'
    />
  ) : (
    <ParticipationRadio setIsDisabled={setIsDisabled} />
  )
  const modalIsDisabled =
    (urlIsDisabled || isDisabled) && (presentingIsDisabled || isDisabled)

  return (
    <div className='presentation-info-container'>
      <div className='presentation-info-banner'>
        <div className='icon-container'>{fetchIcon('info')}</div>
        <div className='text-container'>
          <p>
            Your team will{displayedPresenting ? ' ' : ' not '}be presenting.
            You can update your participation status{' '}
            <span className='modal-trigger' onClick={handlePresentingClick}>
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
              {displayedUrl}
            </a>
            . You can update your project URL{' '}
            <span className='modal-trigger' onClick={handleUrlClick}>
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
        handleConfirm={handleUpdate}
        confirmButtonDisabled={modalIsDisabled}
        customWidth={338}
      />
    </div>
  )
}
