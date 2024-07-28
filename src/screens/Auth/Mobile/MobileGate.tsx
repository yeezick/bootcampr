import { PrimaryButton } from 'components/Buttons'
import './MobileGate.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isMobileWidth } from 'utils/helpers'

export const MobileGate = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const rerouteToLanding = () => {
      if (!isMobileWidth()) {
        window.history.back()
      }
    }

    window.addEventListener('resize', rerouteToLanding)
    return () => {
      window.removeEventListener('resize', rerouteToLanding)
    }
  }, [])

  const handleRouteToLanding = () => navigate('/')

  return (
    <div className='mobile'>
      <div className='text'>
        <h2>Important!</h2>
        <h2>We're not optimized for mobile yet.</h2>
        <p>
          Please log in on a desktop or laptop to gain the experience you need
          to land the job you want.
        </p>
      </div>

      <img />
      <PrimaryButton
        label="Visit Collabify's homepage"
        onClick={handleRouteToLanding}
      />
    </div>
  )
}
