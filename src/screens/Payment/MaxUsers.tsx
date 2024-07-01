import { useNavigate } from 'react-router-dom'
import maxUsersPng from '../../assets/Images/max-users.png'
import './styles/MaxUsers.scss'
import { PrimaryButton } from 'components/Buttons'

export const MaxUsers = () => {
  const navigate = useNavigate()
  const handleEnterSandbox = () => {
    navigate('/project/sandbox')
  }

  return (
    <div className='max-users'>
      <div className='content'>
        <h2>We're sorry!</h2>
        <p className='header-text'>
          We've reached the maximum number of participants for this cohort.
        </p>
        <p className='header-text'>
          We'll send an email when the next cohort opens.
        </p>
        <img src={maxUsersPng} alt='Max users image' />
        <p className='meantime'>
          In the meantime, you can enter the Bootcampr sandbox and try the
          tools.
        </p>
        <PrimaryButton
          label='Enter Bootcampr Sandbox'
          onClick={handleEnterSandbox}
        />
      </div>
    </div>
  )
}

// random
