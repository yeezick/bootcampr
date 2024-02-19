import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { Stack } from '@mui/material'
import { ParticipationRadio } from 'components/Inputs/ParticipationRadio'
import { useState } from 'react'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'

export const PresentationPage = ({ handlePageNavigation }) => {
  const [isDisabled, setIsDisabled] = useState(true)

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = e => {
    e.preventDefault()

    if (isDisabled) {
      alert(
        `Please indicate whether or not your team will be presenting before submitting.`
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

          <ParticipationRadio
            labelText='Let us know if your team will be presenting.'
            setIsDisabled={setIsDisabled}
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
            />
          </Stack>
        </Stack>
      </form>
    </div>
  )
}
