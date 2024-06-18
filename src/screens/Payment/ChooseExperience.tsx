import { useNavigate } from 'react-router-dom'
import { updatePaymentExperience } from 'utils/api/payment'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectUserId,
  updateUserExperience,
  updateUserProject,
} from 'utils/redux/slices/userSlice'
import './styles/ChooseExperience.scss'
import { fetchIcon } from 'utils/components/Icons'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { buildProjectPortal } from 'utils/helpers'
import { setPortal } from 'utils/redux/slices/userInterfaceSlice'
import { fetchAndStoreUserProject } from 'utils/redux/slices/projectSlice'
import { handleJoinTeam } from 'utils/helpers/paymentHelpers'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { useState } from 'react'

export const ChooseExperience = () => {
  return (
    <div className='choose-experience'>
      <h2>Choose your account</h2>
      <p className='header-text'>Gain experience embedded on an Agile team.</p>
      <div className='cards'>
        <SandboxCard />
        <JoinTeamCard />
      </div>
    </div>
  )
}

const SandboxCard = () => {
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [sandboxIsLoading, setSandboxIsLoading] = useState<boolean>(false)

  const handleEnterSandbox = async () => {
    setSandboxIsLoading(true)
    const updatedExperience = await updatePaymentExperience(userId, {
      experience: 'sandbox',
    })

    if (updatedExperience.error) {
      dispatch(errorSnackbar('Error setting project experience.'))
      return
    }

    dispatch(fetchAndStoreUserProject('sandbox'))
    dispatch(updateUserProject('sandbox'))
    dispatch(updateUserExperience(updatedExperience))
    dispatch(setPortal(buildProjectPortal('sandbox')))
    navigate('/project/sandbox')
    setSandboxIsLoading(false)
  }

  return (
    <div className='experience-card'>
      <div className='card-header'>
        <div className='header'>
          <h3>Sandbox</h3>
          <p className='price'>Free</p>
          <p className='purpose'>Try the tools</p>
        </div>
        <p className='description'>
          Not quite ready to join a team? Try the tools provided by Bootcampr in
          the Project Portal.
        </p>
      </div>
      <div className='card-footer'>
        <div className='benefits' id='free-benefits'>
          <BenefitItem text='View the Product Details' />
          <BenefitItem text='Check out the team page' />
          <BenefitItem text='See typical meetings on the Scrum Calendar' />
          <BenefitItem text='Get comfortable using the Kanban Board' />
        </div>
        <SecondaryButton
          loading={sandboxIsLoading}
          fullWidth
          label='Enter sandbox'
          onClick={handleEnterSandbox}
        />
      </div>
    </div>
  )
}

const JoinTeamCard = () => {
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [joinTeamIsLoading, setJoinTeamIsLoading] = useState<boolean>(false)
  const handleJoinTeamBtn = async () => {
    setJoinTeamIsLoading(true)
    await handleJoinTeam(dispatch, navigate, userId)
    setJoinTeamIsLoading(false)
  }

  return (
    <div className='experience-card'>
      <div className='card-header'>
        <div className='header'>
          <h3>Join a team</h3>
          <p className='price'>$199 USD</p>
          <p className='purpose'>4 week project</p>
        </div>
        <p className='description'>
          We'll match you to an agile team based on your role and availability
          for meetings.
        </p>
        <p className='disclaimer'>
          *You must have 3 days per week with at least 1 hour per day of
          availability to meet.
        </p>
      </div>
      <div className='benefits'>
        <BenefitItem text='Gain cross-functional agile team experience' />
        <BenefitItem text='Ship a live product' />
        <BenefitItem text='Showcase your product on your portfolio' />
        <BenefitItem text='Talk about your experience in interviews' />
      </div>
      <PrimaryButton
        loading={joinTeamIsLoading}
        fullWidth
        onClick={handleJoinTeamBtn}
        label='Join a team'
      />
      <p className='refund-text'>
        *There is a 3.5% processing fee for refund requests during the matching
        process.
      </p>
    </div>
  )
}

const BenefitItem = ({ text }) => {
  return (
    <div className='benefit'>
      {fetchIcon('check', { sx: { color: '#19227e', fontSize: '27px' } })}
      <p>{text}</p>
    </div>
  )
}
