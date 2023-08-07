import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { getOneProject, editProject } from 'utils/api'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { updateParticipatingMembers } from 'utils/redux/slices/projectSlice'
import { FiRepeat } from 'react-icons/fi'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

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
    <div className='projectcompletion__pag-presentation'>
      <form
        className='projectcompletion__presentation-form'
        onSubmit={handleSubmit}
      >
        <div className='projectcompletion__pre-contents'>
          <div className='projectcompletion__pre-details'>
            <h1>Project Presentation</h1>
            <div className='projectcompletion__pre-icons-containter'>
              <div className='projectcompletion__pre-icon-content'>
                <CalendarMonthOutlinedIcon className='projectcompletion__pre-icon' />
                <p>Sep 1, 2023 | 12:00pm - 2:00pm PST</p>
              </div>
              <div className='projectcompletion__pre-icon-content'>
                <AccessTimeOutlinedIcon className='projectcompletion__pre-icon' />
                <p>15 min presentation</p>
              </div>
              <div className='projectcompletion__pre-icon-content'>
                <VideocamOutlinedIcon className='projectcompletion__pre-icon' />
                <p>Meeting detail will be provided upon confirmation</p>
              </div>
            </div>
            <div className='projectcompletion__pre-para-content'>
              <p>
                Now that your team has deployed the project, take this
                opportunity to present in front of designers and developers and
                get feedback on your work!
              </p>
            </div>
          </div>
          <div className='projectcompletion__pre-part-container'>
            <div className='projectcompletion__pre-part-title'>
              <h3>Let us know if you’d like to participate!</h3>
            </div>
            <div className='projectcompletion__pre-part-radios'>
              <label className='projectcompletion__pre-part-label1' htmlFor=''>
                <input
                  type='radio'
                  value='option1'
                  checked={selectedRadio === 'option1'}
                  onChange={handleRadioChange}
                />
                <p>Participate</p>
              </label>
              <label className='projectcompletion__pre-part-label2' htmlFor=''>
                <input
                  type='radio'
                  value='option2'
                  checked={selectedRadio === 'option2'}
                  onChange={handleRadioChange}
                />
                <div>
                  <p className='projectcompletion__pre-part-para1'>
                    Don't participate
                  </p>
                  <p className='projectcompletion__pre-part-para2'>
                    * your team can still decide to participate x day before Sep
                    1
                  </p>
                </div>
              </label>
            </div>
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
        </div>
      </form>
    </div>
  )
}
