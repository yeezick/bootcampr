import { PrimaryButton } from 'components/Buttons/ButtonVariants'
import { useNavigate } from 'react-router-dom'
import { createCheckout, updatePaymentExperience } from 'utils/api/payment'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectUserId,
  updateUserExperience,
} from 'utils/redux/slices/userSlice'
import './styles/ChooseExperience.scss'
import { fetchIcon } from 'utils/components/Icons'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const ChooseExperience = () => {
  const handleCheckout = async () => {
    const paymentResponse = await createCheckout()
    window.location.href = paymentResponse.checkoutUrl
  }

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

  const handleEnterSandbox = async () => {
    //BC-778,780,781,782: update payment.experience to be 'sandbox' & have backend fetch/set freemium experience
    // const updatedExperience = await updatePaymentExperience(userId, 'waitlist')
    // if (updatedExperience.error) {
    //   dispatch(errorSnackbar('Error setting project experience.'))
    //   return
    // }
    // dispatch(updateUserExperience(updatedExperience))
    // navigate('/project/sandbox')
    // dispatch(setPortal(buildProjectPortal('sandbox')))
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
      <div className='benefits'>
        <BenefitItem text='View the Product Details' />
        <BenefitItem text='Check out the team page' />
        <BenefitItem text='See typical meetings on the Scrum Calendar' />
        <BenefitItem text='Get comfortable using the Kanban Board' />
      </div>
      <PrimaryButton handler={handleEnterSandbox} text='Enter sandbox' />
    </div>
  )
}

const JoinTeamCard = () => {
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleJoinTeam = async () => {
    const updatedExperience = await updatePaymentExperience(userId, {
      experience: 'waitlist',
    })
    if (updatedExperience.error) {
      dispatch(errorSnackbar('Error setting project experience.'))
      return
    }
    dispatch(updateUserExperience(updatedExperience))
    navigate(`/onboarding/${userId}`)
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
          *You must have 3 days per week with at least 1 hour of availability to
          meet. <br />
          The 1 hour can be 2 half-hour time slots.
        </p>
      </div>
      <div className='benefits'>
        <BenefitItem text='Gain cross-functional agile team experience' />
        <BenefitItem text='Ship a live product' />
        <BenefitItem text='Showcase your product on your portfolio' />
        <BenefitItem text='Talk about your experience in interviews' />
      </div>
      <PrimaryButton handler={handleJoinTeam} text='Join a team' />
    </div>
  )
}

const BenefitItem = ({ text }) => {
  return (
    <div className='benefit'>
      {fetchIcon('checkCircle', { sx: { color: '#19227e', fontSize: '27px' } })}
      <p>{text}</p>
    </div>
  )
}
