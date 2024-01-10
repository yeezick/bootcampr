import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { getOneProject, editProject } from 'utils/api'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { updateParticipatingMembers } from 'utils/redux/slices/projectSlice'
import { FiRepeat } from 'react-icons/fi'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { Stack } from '@mui/material'

export const PresentationPage = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const dispatch: AppDispatch = useDispatch()
  const [selectedRadio, setSelectedRadio] = useState('')
  const projectId = authUser.project

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = async e => {
    e.preventDefault()

    if (isValidForm()) {
      try {
        const project = await getOneProject(projectId)

        const member = {
          user: {
            _id: authUser._id,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
          },
          decision:
            selectedRadio === 'option1' ? 'Participate' : "Don't participate",
        }

        let updatedMembers = project.completedInfo.participatingMembers || []

        if (selectedRadio === 'option2') {
          const isParticipant = updatedMembers.some(
            pm => pm.user._id === authUser._id
          )

          if (isParticipant) {
            updatedMembers = updatedMembers.filter(
              pm => pm.user._id !== authUser._id
            )
          } else {
            updatedMembers.push(member)
          }
        } else if (selectedRadio === 'option1') {
          const isParticipant = updatedMembers.some(
            pm => pm.user._id === authUser._id
          )

          if (!isParticipant) {
            updatedMembers.push(member)
          }
        }

        const updatedProject = {
          completedInfo: {
            ...project.completedInfo,
            participatingMembers: updatedMembers,
          },
        }

        const response = await editProject(projectId, updatedProject)

        if (response) {
          dispatch(updateParticipatingMembers(updatedMembers))
          handlePageNavigation('next')
        }
      } catch (error) {
        console.error('An error occurred while saving the decision.', error)
      }
    } else {
      alert(
        `Please select "Participate" or select "Don't participate" before submitting.`
      )
    }
  }

  const handleRadioChange = e => {
    setSelectedRadio(e.target.value)
  }

  const handleCancel = () => {
    setSelectedRadio('')
    handlePageNavigation('previous')
  }

  const isValidForm = () => {
    return selectedRadio === 'option1' || selectedRadio === 'option2'
  }

  const getButtonClassName = () => {
    if (!selectedRadio) return 'projectcompletion__next-btn'
    return isValidForm()
      ? 'projectcompletion__next-btn-ready'
      : 'projectcompletion__next-btn'
  }

  return (
    <div className='project-completion-presentation-page'>
      <form onSubmit={handleSubmit}>
        <Stack spacing={'32px'} className='page-content'>
          <div className='details-container'>
            <h1>Project Presentation</h1>
            <Stack spacing={'8px'}>
              <div className='detail-content'>
                <CalendarTodayOutlinedIcon />
                <p>Sep 1, 2023 | 12:00pm - 2:00pm PST</p>
              </div>
              <div className='detail-content'>
                <AccessTimeOutlinedIcon />
                <p>15 min presentation</p>
              </div>
              <div className='detail-content'>
                <VideocamOutlinedIcon />
                <p>Meeting detail will be provided upon confirmation</p>
              </div>
            </Stack>
            <p className='details-brief'>
              Present your team’s work to professional Product Managers, UX
              Designers, and Software Engineers.
            </p>
          </div>

          {/* <div className='projectcompletion__pre-part-container'>
            <div>
              <h2>Why present your project?</h2>
              <ul>
                <li>
                  Hone your presentation skills in front of the Bootcampr
                  product team.
                </li>
                <li>
                  Get feedback from people with experience launching a new
                  product.
                </li>
                <li>Identify room for improvements.</li>
                <li>
                  Use the feedback you receive to present your work in
                  interviews with confidence!
                </li>
              </ul>
            </div>
            <div>
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
            </div>
            <div className='projectcompletion__pre-part-title'>
              <h2>Let us know if your team will be presenting.</h2>
            </div>
            <div className='projectcompletion__pre-part-radios'>
              <label
                className='projectcompletion__pre-part-label1'
                htmlFor='participate'
              >
                <input
                  type='radio'
                  id='participate'
                  value='option1'
                  checked={selectedRadio === 'option1'}
                  onChange={handleRadioChange}
                />
                <p>My team will participate</p>
              </label>
              <label
                className='projectcompletion__pre-part-label2'
                htmlFor='dontParticipate'
              >
                <input
                  type='radio'
                  id='dontParticipate'
                  value='option2'
                  checked={selectedRadio === 'option2'}
                  onChange={handleRadioChange}
                />
                <div>
                  <p className='projectcompletion__pre-part-para1'>
                    My team will not participate
                  </p>
                  <p className='projectcompletion__pre-part-para2'>
                    *Please let us know by xx/xx if you plan to participate. 1
                  </p>
                </div>
              </label>
            </div>
          </div>
          <div className='projectcompletion__btns'>
            <button
              className='projectcompletion__back-btn'
              onClick={handleCancel}
            >
              <FiRepeat className='projectcompletion__back-icon' /> Back
            </button>
            <button type='submit' className={getButtonClassName()}>
              Next <FiRepeat className='projectcompletion__forward-icon' />
            </button>
          </div> */}
        </Stack>
      </form>
    </div>
  )
}
