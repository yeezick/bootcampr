import { useSelector } from 'react-redux'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'
import { getGroupClassName, getRowBreak } from 'utils/functions/paginatorLogic'
import { FiRepeat } from 'react-icons/fi'
import { useState } from 'react'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  const completedInfo = useSelector(selectCompletedInfo)
  const latestMemberIndex = completedInfo.participatingMembers.length - 1
  const latestMember = completedInfo.participatingMembers[latestMemberIndex]
  const latestDecision =
    latestMember?.decision === 'Participate'
      ? 'Participate'
      : 'Not Participating'
  const shouldDisplayMember = latestMember?.decision === 'Participate'
  const participatingMembers = completedInfo.participatingMembers.filter(
    member => member.decision === 'Participate'
  )
  const deployedUrls = completedInfo.deployedUrl
  const latestUrlEntryIndex = Object.keys(deployedUrls).length - 1
  const latestUrl = deployedUrls[Object.keys(deployedUrls)[latestUrlEntryIndex]]

  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    handlePageNavigation('next')
  }

  const handleGoToSelectedPage = id => {
    return () => {
      handlePageNavigation('specific', id)
    }
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
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
          <ProjectUrl setIsDisabled={setIsDisabled} />
        </section>

        <section className='participation-container'>
          <ParticipationRadio
            labelText='Presentation'
            setIsDisabled={setIsDisabled}
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
