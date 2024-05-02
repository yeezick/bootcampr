import { useSelector } from 'react-redux'
import { selectProject } from 'utils/redux/slices/projectSlice'
import { useEffect, useState } from 'react'
import { ProjectUrl } from 'components/Inputs/ProjectUrl'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { editProject } from 'utils/api'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { BackButton, PrimaryButton } from 'components/Buttons'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  const project = useSelector(selectProject)
  const projectID = project._id
  const completedInfo = project.completedInfo
  const deployedUrl = completedInfo.deployedUrl
  const presenting = completedInfo.presenting
  const [isInvalidUrl, setIsInvalidUrl] = useState(!deployedUrl)
  const [isInvalidRadio, setIsInvalidRadio] = useState(presenting === null)
  const [isDisabled, setIsDisabled] = useState(
    isInvalidUrl || isInvalidRadio ? true : false
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  //TODO: convert alerts to MUI toast to match Figma designs

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  useEffect(() => {
    setIsDisabled(isInvalidUrl || isInvalidRadio ? true : false)
  }, [setIsDisabled, isInvalidUrl, isInvalidRadio])

  const handleSubmit = async e => {
    e.preventDefault()

    const updatedProject = {
      completedInfo: {
        deployedUrl: deployedUrl,
        presenting: presenting,
      },
    }

    if (isDisabled) {
      alert(
        `Please enter a valid URL and indicate whether or not your team is presenting`
      )
      return
    } else {
      try {
        setIsLoading(true)
        const response = await editProject(projectID, updatedProject)

        if (response) {
          handlePageNavigation('next')
          window.scrollTo(0, 0)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(
          `An error occurred while saving presentation details.`,
          error
        )
        setIsLoading(false)
      }
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
      <form>
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

        <ButtonContainer gap={16}>
          <BackButton onClick={handleCancel} label='Presentation' />
          <PrimaryButton
            loading={isLoading}
            disabled={isDisabled}
            label='Submit'
            type='submit'
            onClick={handleSubmit}
          />
        </ButtonContainer>
      </form>
    </div>
  )
}
