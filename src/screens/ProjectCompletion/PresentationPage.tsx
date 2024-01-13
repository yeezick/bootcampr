import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectParticipation } from 'utils/redux/slices/projectCompletionSlice'

export const PresentationPage = ({ handlePageNavigation }) => {
  const participation = useSelector(selectParticipation)
  const [isDisabled, setIsDisabled] = useState(
    participation === null ? true : false
  )

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) {
      alert(
        `Please select "Participate" or select "Don't participate" before submitting.`
      )
      return
    } else {
      handlePageNavigation('next')
      window.scrollTo(0, 0)
    }
    // if (!isDisabled) {
    //   try {
    //     setIsLoading(true)
    //     const project = await getOneProject(projectId)

    //     const member = {
    //       user: {
    //         _id: authUser._id,
    //         firstName: authUser.firstName,
    //         lastName: authUser.lastName,
    //       },
    //       decision:
    //         selectedRadio === 'option1' ? 'Participate' : "Don't participate",
    //     }

    //     let updatedMembers = project.completedInfo.participatingMembers || []

    //     if (selectedRadio === 'option2') {
    //       const isParticipant = updatedMembers.some(
    //         pm => pm.user._id === authUser._id
    //       )

    //       if (isParticipant) {
    //         updatedMembers = updatedMembers.filter(
    //           pm => pm.user._id !== authUser._id
    //         )
    //       } else {
    //         updatedMembers.push(member)
    //       }
    //     } else if (selectedRadio === 'option1') {
    //       const isParticipant = updatedMembers.some(
    //         pm => pm.user._id === authUser._id
    //       )

    //       if (!isParticipant) {
    //         updatedMembers.push(member)
    //       }
    //     }

    //     const updatedProject = {
    //       completedInfo: {
    //         ...project.completedInfo,
    //         participatingMembers: updatedMembers,
    //       },
    //     }

    //     const response = await editProject(projectId, updatedProject)

    //     if (response) {
    //       dispatch(updateParticipatingMembers(updatedMembers))
    //       handlePageNavigation('next')
    //       setIsLoading(false)
    //     }
    //   } catch (error) {
    //     console.error('An error occurred while saving the decision.', error)
    //     setIsLoading(false)
    //   }
    // } else {
    //   alert(
    //     `Please select "Participate" or select "Don't participate" before submitting.`
    //   )
    // }
  }

  // const handleRadioChange = e => {
  //   setSelectedRadio(e.target.value)
  //   setIsDisabled(false)
  // }

  const handleCancel = () => {
    handlePageNavigation('previous')
    window.scrollTo(0, 0)
  }

  return (
    <div className='project-completion-presentation-page'>
      <form onSubmit={handleSubmit}>
        <Stack spacing={'32px'} className='page-content'>
          <section aria-labelledby='formHeading' className='details-container'>
            <h1 id='formHeading'>Project Presentation</h1>
            <Stack spacing={'8px'} className='details-content'>
              <div className='detail'>
                <CalendarTodayOutlinedIcon aria-label='Calendar Icon' />
                {/* //TODO: refactor this to display dynamic info */}
                <p>Sep 1, 2023 | 12:00pm - 2:00pm PST</p>
              </div>
              <div className='detail'>
                <AccessTimeOutlinedIcon aria-label='Clock Icon' />
                <p>15 min presentation</p>
              </div>
              <div className='detail'>
                <VideocamOutlinedIcon aria-label='Camera Icon' />
                <p>Meeting detail will be provided upon confirmation</p>
              </div>
            </Stack>
            <p className='details-brief'>
              Present your team’s work to professional Product Managers, UX
              Designers, and Software Engineers.
            </p>
          </section>

          <section className='faq-container'>
            <h2>Why present your project?</h2>
            <ul>
              <li>
                Hone your presentation skills in front of the Bootcampr product
                team.
              </li>
              <li>
                Get feedback from people with experience launching a new
                product.
              </li>
              <li>Identify room for improvements.</li>
              <li>
                Use the feedback you receive to present your work in interviews
                with confidence!
              </li>
            </ul>
          </section>
          <section className='faq-container'>
            <h2>Who is presenting your project?</h2>
            <ul>
              <li>
                At least one person must participate to present team’s work.
              </li>
              <li>
                Participation by all team members is not required but
                encouraged.
              </li>
            </ul>
          </section>

          <section className='participation-container'>
            <ParticipationRadio
              labelText='Let us know if your team will be presenting'
              setIsDisabled={setIsDisabled}
            />
            {/* <h2>Let us know if your team will be presenting.</h2>
            <div className='radio-btn-container'>
              <div className='radio-btn'>
                <input
                  type='radio'
                  id='participate'
                  value='option1'
                  checked={selectedRadio === 'option1'}
                  onChange={handleRadioChange}
                />
                <label htmlFor='participate'>
                  <p>My team will participate</p>
                </label>
              </div>
              <div className='radio-btn'>
                <input
                  type='radio'
                  id='dontParticipate'
                  value='option2'
                  checked={selectedRadio === 'option2'}
                  onChange={handleRadioChange}
                />
                <label htmlFor='dontParticipate'>
                  <p>My team will not participate</p>
                </label>
              </div>
            </div>
            <p className='helper-text'>
              *Please let us know by xx/xx if you plan to participate.
            </p> */}
          </section>

          <Stack className='btn-container'>
            <SecondaryButton handler={handleCancel} text='URL' paginatorBtn />
            <PrimaryButton
              aria-disabled={isDisabled}
              isDisabled={isDisabled}
              paginatorBtn
              text='Confirmation'
              type='submit'
            />
          </Stack>
        </Stack>
      </form>
    </div>
  )
}
