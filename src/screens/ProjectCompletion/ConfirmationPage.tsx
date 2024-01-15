import { useSelector } from 'react-redux'
import {
  selectCompletedInfo,
  selectProject,
} from 'utils/redux/slices/projectSlice'
import { getGroupClassName, getRowBreak } from 'utils/functions/paginatorLogic'
import { FiRepeat } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import {
  selectParticipation,
  selectProjectUrl,
} from 'utils/redux/slices/projectCompletionSlice'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  const completedInfo = useSelector(selectCompletedInfo)
  console.log({ completedInfo })
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
  // const projectUrl = useSelector(selectProjectUrl)
  const participation = useSelector(selectParticipation)
  const deployedUrl = completedInfo.deployedUrl
  const [projectUrl, setProjectUrl] = useState(deployedUrl)
  const [invalidUrl, setInvalidUrl] = useState(projectUrl ? false : true)
  const [invalidRadio, setInvalidRadio] = useState(participation ? false : true)
  const [isDisabled, setIsDisabled] = useState(
    invalidUrl || invalidRadio ? true : false
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  useEffect(() => {
    setIsDisabled(invalidUrl || invalidRadio ? true : false)
  }, [setIsDisabled, invalidUrl, invalidRadio])

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) return
    handlePageNavigation('next')
    window.scrollTo(0, 0)
  }

  const handleGoToSelectedPage = id => {
    return () => {
      handlePageNavigation('specific', id)
    }
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
          {/* <ProjectUrl setIsDisabled={setInvalidUrl} projectUrl={projectUrl} /> */}
        </section>

        <section className='participation-container'>
          {/* <ParticipationRadio
            labelText='Presentation'
            setIsDisabled={setInvalidRadio}
          /> */}
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
