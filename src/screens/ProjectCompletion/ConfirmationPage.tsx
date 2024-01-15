import { useSelector } from 'react-redux'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  //TODO: None of this logic should be needed if we end up slimming completedInfo down as discussed. Leaving it for review/confirmation
  // const latestMemberIndex = completedInfo.participatingMembers.length - 1
  // const latestMember = completedInfo.participatingMembers[latestMemberIndex]
  // const latestDecision =
  //   latestMember?.decision === 'Participate'
  //     ? 'Participate'
  //     : 'Not Participating'
  // const shouldDisplayMember = latestMember?.decision === 'Participate'
  // const participatingMembers = completedInfo.participatingMembers.filter(
  //   member => member.decision === 'Participate'
  // )
  // const deployedUrls = completedInfo.deployedUrl
  // const latestUrlEntryIndex = Object.keys(deployedUrls).length - 1
  // const latestUrl = deployedUrls[Object.keys(deployedUrls)[latestUrlEntryIndex]]
  // ---------------------------------------------------------------
  const completedInfo = useSelector(selectCompletedInfo)
  const deployedUrl = completedInfo.deployedUrl
  const participation = completedInfo.presenting
  const [isInvalidUrl, setIsInvalidUrl] = useState(!deployedUrl)
  const [isInvalidRadio, setIsInvalidRadio] = useState(participation === null)
  const [isDisabled, setIsDisabled] = useState(
    isInvalidUrl || isInvalidRadio ? true : false
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  useEffect(() => {
    setIsDisabled(isInvalidUrl || isInvalidRadio ? true : false)
  }, [setIsDisabled, isInvalidUrl, isInvalidRadio])

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) return
    handlePageNavigation('next')
    window.scrollTo(0, 0)
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
    window.scrollTo(0, 0)
  }

  return (
    <div
      className='project-completion-confirmation-page'
      aria-labelledby='formHeader'
    >
      <form onSubmit={handleSubmit}>
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
          <SecondaryButton
            handler={handleCancel}
            text='Presentation'
            paginatorBtn
          />
          <PrimaryButton
            aria-disabled={isDisabled || isLoading}
            isDisabled={isDisabled || isLoading}
            text='Submit'
            type='submit'
          />
        </Stack>
      </form>
    </div>
  )
}
